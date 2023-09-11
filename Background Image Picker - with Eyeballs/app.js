import { imageData } from "./data.js"
const data = imageData

const subContainer = document.querySelector(".sub-container")
const mainApp = document.getElementById("main")
const appMainSection = document.querySelector(".app-main")


/* Burger Menu */
const menuBtn = document.getElementById("burger-menu")
const mobileNavbar = document.getElementById("mobile-navbar")
menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("open")
    if (menuBtn.classList.contains("open")) {
        mobileNavbar.style.transform = "translateX(0)"
    } else {
        mobileNavbar.style.transform = "translateX(100%)"
    }
})
/* Burger Menu */


/* Eye follow cursor */
const body = document.querySelector("body")
body.addEventListener("mousemove", (e) => eyeBall(e))

function eyeBall(e) {
    const eyes = document.querySelectorAll(".eye")

    eyes.forEach(eye => {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2)
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2)

        let radian = Math.atan2(e.pageX - x, e.pageY - y)
        let rotation = (radian * (180 / Math.PI) * -1) + 270

        eye.style.transform = `rotate(${rotation}deg)`

    })
}
/* Eye follow cursor */


/* Main App js */
function getArray(categories) {
    const categoryArray = []
    for (let category of categories) {
        categoryArray.push(category.category)
    }

    return categoryArray
}

function renderRadios(categories) {
    let radioInputs = ``
    const categoryArray = getArray(categories)

    for (let category of categoryArray) {
        radioInputs += `
                    <div class="radio-container flex">
                        <label for=${category}>${category}</label>
                        <input 
                            class="radio-input" 
                            type="radio" 
                            name="category" 
                            id=${category}
                            value=${category}>
                    </div> 
        `
    }

    subContainer.innerHTML += `
        ${radioInputs}
        <button class="btn" id="generate">Generate</button>   
    `
}

renderRadios(data)

function getMatchingImagesArray() {

    if (document.querySelector("input[type='radio']:checked")) {

        const selectedCategory = document.querySelector("input[type='radio']:checked").value

        const matchingImageArray = data.filter(object => {
            return object.category === selectedCategory
        })[0].images

        return matchingImageArray
    }
}

subContainer.addEventListener("change", (event) => {

    const radioClicked = document.getElementById(event.target.id)
    const radioClickedParents = document.getElementsByClassName("radio-container")

    for (let radio of radioClickedParents) {
        radio.classList.remove("hover")
    }

    radioClicked.parentElement.classList.add("hover")
})

const generateButton = document.getElementById("generate")

generateButton.addEventListener("click", function() {

    const imageArray = getMatchingImagesArray()
    if (imageArray) {
        const randomeIndex = Math.floor(Math.random() * imageArray.length)
        const randomeImage = imageArray[randomeIndex]

        mainApp.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),
        url(/images/${randomeImage})
        `
        appMainSection.style.opacity = "0.4"
    }  
})