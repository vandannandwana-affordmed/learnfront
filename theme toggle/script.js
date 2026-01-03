const darkButton = document.getElementById("dark_button")
const lightButton = document.getElementById("light_button")
const systemButton = document.getElementById("system_button")
const background = document.body
const mainText = document.getElementById("main_text")
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const themes = Object.freeze({
    LIGHT: 'LIGHT',
    DARK: 'DARK',
    SYSTEM: 'SYSTEM'
})

console.log(prefersDarkScheme)

function changeBackgroundTheme(theme) {
    switch(theme) {
        case themes.LIGHT: {
            background.style.backgroundColor = "rgb(222, 232, 236)"
            mainText.style.color = "black"
            break;
        }
        case themes.DARK: {
            background.style.backgroundColor = "black"
            mainText.style.color = "rgb(187, 194, 197)"
        }
    }
}

function changeButtonColor(toBeChange, others) {
    toBeChange.style.backgroundColor = "rgb(162, 172, 176)";

    for (const other of others) {
        other.style.backgroundColor = "rgb(187, 194, 197)";
    }
}

darkButton.addEventListener("click",()=>{ 
    changeButtonColor(darkButton, [lightButton, systemButton])
    changeBackgroundTheme(themes.DARK)
})

lightButton.addEventListener("click",()=>{ 
    changeButtonColor(lightButton, [darkButton, systemButton])
    changeBackgroundTheme(themes.LIGHT)
})

systemButton.addEventListener("click",()=>{ 
    changeButtonColor(systemButton, [lightButton, darkButton])
    if (prefersDarkScheme) {
        changeBackgroundTheme(themes.DARK)
    }else {
        changeBackgroundTheme(themes.LIGHT)
    }
})
