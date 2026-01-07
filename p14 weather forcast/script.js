const cityName = document.querySelector("#city_date h2");
const currentDate = document.querySelector("#city_date p");
const currentTemp = document.querySelector("#temperature");
const currentTemperatureIcon = document.querySelector("#temp_degree img");
const currentUV = document.querySelector("#weather_info li:nth-child(1)");
const currentHumidity = document.querySelector("#weather_info li:nth-child(2)");
const currentPrecipitation = document.querySelector("#weather_info li:nth-child(3)");
const currentWind = document.querySelector("#weather_info li:nth-child(4)");
const daylist = document.querySelector("#days_list");
const searchBox = document.querySelector("#search_box");
const searchForm = document.querySelector("#search_form");
const ownLocationButton = document.querySelector("#own_location_button");
const loader = document.querySelector("#loader");

init()

searchForm.addEventListener("submit", async (e)=> {
    e.preventDefault();
    const query = searchBox.value;
    getWeatherData(query);
})

ownLocationButton.addEventListener("click", async ()=>{
    try {
        loader.style.display = "block";
        const geoLocation = await getOwnLocation();
        getWeatherData(geoLocation);
        loader.style.display = "none";
    }catch (error) {
        console.log("failed to get location data.", error);
    }
})

function init() {
    // getting saved location
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
        getWeatherData(savedLocation);
        return;
    }

    getWeatherData("udaipur");
}

async function getWeatherData(query) {
    const fetch_url = `${CONFIG.BASE_URL}?key=${CONFIG.API_KEY}&q=${query}&days=7`;

    try {
        loader.style.display = "block";
        const response = await fetch(fetch_url);
        const data = await response.json();
        localStorage.setItem("location", query);
        const responseData = {
            cityName: data.location.name,
            countryName: data.location.country,
            statename: data.location.region,
            localtime: data.location.localtime,
            temprature: data.current.temp_c,
            windSpeed: data.current.wind_mph,
            humidity: data.current.humidity,
            icon: data.current.condition.icon,
            uvIndex: data.current.uv,
            precipitation: data.current.precip_mm,
        }

        cityName.innerText = `${responseData.cityName}, ${responseData.statename}, ${responseData.countryName}`;
        currentDate.innerText = responseData.localtime;
        currentTemp.innerText = responseData.temprature;
        currentTemperatureIcon.src = responseData.icon;
        currentUV.innerText = "UV: " + responseData.uvIndex;
        currentHumidity.innerText = "Humidity: " + responseData.humidity + "%";
        currentPrecipitation.innerText = "Precipitation: " + responseData.precipitation + "%";
        currentWind.innerText = "Wind: " + responseData.windSpeed + " mph";


        const forcastDays = []

        data.forecast.forecastday.forEach(item => {
            forcastDays.push({
                day: "monday",
                date: item.date,
                max: item.day.maxtemp_c,
                min: item.day.mintemp_c,
                icon: item.day.condition.icon,
            })
        })

        // clearing the list
        daylist.innerHTML = "";

        forcastDays.forEach(day => {
            const li = document.createElement("li");
            li.className = "day_item"

            li.innerHTML = `<div class="day_date">
                            <p class="day">${day.date}</p>
                            </div>
                        <img class="day_weather_icon" src="${day.icon}" width="36px" alt="weather icon">
                        <div class="day_temp">
                            <p class="max_temp">${day.max}°C</p>
                            <p class="min_temp">${day.min}°C</p>
                        </div>
    `

            daylist.appendChild(li);
        })
    } catch (error) {
        console.log("failed to get weather data.", error);
    } finally {
        loader.style.display = "none";
    }
}

function getOwnLocation() {
    return new Promise((resolve, reject)=>{
        if (!("geolocation" in navigator)) {
            reject("Geolocation is not supported by your browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                resolve(`${latitude},${longitude}`);
            },
            (error) => {
                reject(error.message);
            }
        );
    })

}





