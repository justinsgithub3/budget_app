const header = document.querySelector(".header");
// create element to add current user's name
const nameEle = document.createElement("p");
//get name from session storage
const name = sessionStorage.getItem('name')
nameEle.textContent = name;

header.appendChild(nameEle);