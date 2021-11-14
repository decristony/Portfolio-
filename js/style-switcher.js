/*------------ toggle style switcher------------*/

const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", () => {
  document.querySelector(".style-swithcer").classList.toggle("open")

})

//esconde style-switcher se ouver scroll de mouse
window.addEventListener("scroll", () => {
  if (document.querySelector(".style-swithcer").classList.contains("open")) {
    document.querySelector(".style-swithcer").classList.remove("open")
  }
})

/*-----------------------------theme colors-----------------------------*/
const alternateStyles = document.querySelectorAll(".alternate-style")

console.log(alternateStyles)
function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", true)
    }
  })
}

/*------------------------theme light and dark mode-------------------*/
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
  dayNight.querySelector("i").classList.toggle("fa-sun");
  dayNight.querySelector("i").classList.toggle("fa-moon");
  document.body.classList.toggle("dark");

})

window.addEventListener("load", () => {
  if (document.body.classList.contains("dark")) {
    dayNight.querySelector("i").classList.add("fa-sun");
  } else {
    dayNight.querySelector("i").classList.add("fa-moon");
  }
})