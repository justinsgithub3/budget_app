const header = document.querySelector(".header");
// create element to add current user's name
const nameEle = document.createElement("p");

//get name from session storage
const userName = sessionStorage.getItem('name');

// if there is no name, assign 'hello, friend'
if (!userName) {
    nameEle.textContent = 'hello, friend!';
} else {
    nameEle.textContent = `hello, ${userName}!`;
}


// get list of children
let list = header.children;
// append as second to last child in container
header.insertBefore(nameEle, list[list.length-1]);


const logoutAnch = document.querySelector("#logout-anchor");
// handle logout
logoutAnch.addEventListener("click", async (e) => {
    sessionStorage.clear();
})