const form = document.getElementById("contact_form")
const resetButton = document.getElementById("reset_button")
const gender_type = new Set(["male", "female", "other"])
const progressLoader = document.getElementById("loader")


function validateInputTextFields() {
    const firstNameValue = document.querySelector('[name="first_name"]').value.trim()
    const lastNameValue = document.querySelector('[name="last_name"]').value.trim()
    const gender = document.querySelector('[name="gender_type"]:checked')
    const dateOfBirthValue = document.querySelector('[name="date_of_birth"]').value

    if (firstNameValue.length < 3) {
        const requiredFieldWarning = document.getElementById("first_name_field").querySelector(".required_field_text")
        requiredFieldWarning.textContent = "First name should be at least 3 characters"
        requiredFieldWarning.style.display = "block"
        return false
    } else if (lastNameValue.length < 3) {
        const requiredFieldWarning = document.getElementById("last_name_field").querySelector(".required_field_text")
        requiredFieldWarning.textContent = "Last name should be at least 3 characters"
        requiredFieldWarning.style.display = "block"
        return false
    }

    if ((gender === null) || (!gender_type.has(gender.value))) {
        const requiredFieldWarning = document.getElementById("gender_section").querySelector(".required_field_text")
        requiredFieldWarning.style.display = "block"
        return false
    }

    const currDate = new Date()
    const years_ago = currDate.getFullYear() - 18
    const validDate = new Date(years_ago, 0, 1).toISOString().slice(0, 10)

    if (dateOfBirthValue > validDate) {
        const requiredFieldWarning = document.getElementById("age_section").querySelector(".required_field_text")
        requiredFieldWarning.style.display = "block"
        return false
    }

    return true
}

function resetAllWarnings() {
    requiredFieldWarning = document.querySelectorAll(".required_field_text")
    for (let i = 0; i < requiredFieldWarning.length; i++) {
        requiredFieldWarning[i].style.display = "none"
    }
}

async function register(e) {
    e.preventDefault();

    resetAllWarnings()

    if (!validateInputTextFields()) {
        console.log("form is not valid")
        return
    }

    // making API call
    const response = await registerUser();

    serverResponse = document.getElementById("server_response")

    serverResponse.textContent = response
    serverResponse.style.display = "block"
}

async function registerUser() {
    progressLoader.style.display = "block"
    const firstName = document.querySelector('[name="first_name"]').value.trim()
    const lastName = document.querySelector('[name="last_name"]').value.trim()
    const email = document.querySelector('[name="email"]').value.trim()
    const gender = document.querySelector('[name="gender_type"]:checked').value
    const dateOfBirth = document.querySelector('[name="date_of_birth"]').value

    const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        dateOfBirth: dateOfBirth,
    }

     try {
        const resp = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!resp.ok) {
            return "User registration failed";
        }

        return "User registered successfully";

    } catch (error) {
        return "Server error. Please try again later.";
    } finally {
        progressLoader.style.display = "none"
    }
}

form.addEventListener("submit", register);

resetButton.addEventListener("click", () => {
    form.reset();
})

