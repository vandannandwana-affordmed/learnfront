const darkButton = document.getElementById("dark_button")
const lightButton = document.getElementById("light_button")
const systemButton = document.getElementById("system_button")
const items = document.getElementsByClassName("sections")
const texts = document.getElementsByClassName("texts")
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const themes = Object.freeze({
    LIGHT: 'LIGHT',
    DARK: 'DARK',
    SYSTEM: 'SYSTEM'
})

console.log(header, footer)

changeButtonColor(lightButton, [darkButton, systemButton])
changeBackgroundTheme(themes.LIGHT)

function changeBackgroundTheme(theme) {
    switch(theme) {
        case themes.LIGHT: {
            for (const item of items) {
                item.style.backgroundColor = "rgb(187, 194, 197)";
            }
            
            for(const text of texts) {
                text.style.color = "black";
            }

            header.style.borderBottom = "1px solid black"
            footer.style.borderTop = "1px solid black"
            break;
        }
        case themes.DARK: {
            for (const item of items) {
                item.style.backgroundColor = "black";
            }

            for(const text of texts) {
                text.style.color = "rgb(187, 194, 197)";
            }

            header.style.borderBottom = "1px solid rgb(187, 194, 197)"
            footer.style.borderTop = "1px solid rgb(187, 194, 197)"
            break;
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
