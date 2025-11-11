const header = document.querySelector(".header");
// create element to add current user's name
const nameEle = document.createElement("p");
//get name from session storage
const name = sessionStorage.getItem('name')
nameEle.textContent = name;

// get list of children
let list = header.children;
// append as second to last child in container
header.insertBefore(nameEle, list[list.length-1]);


const logoutAnch = document.querySelector("#logout-anchor");
// handle logout
logoutAnch.addEventListener("click", async (e) => {
    sessionStorage.clear();
})