let expensesCont = document.querySelector('#expenses-container');

// returns an object of expenses
async function expenses() {
    const res = await fetch('/exp/expenses');
    const data = await res.json();
    const expenses = data.expenses;
    return expenses;
}

async function displayExpenses(expenses) {
    // clear any pre-existing data
    expensesCont.innerHTML = '';

    expenses.forEach(e => {
        const id = e.expense_id;
        const description = e.description_exp;
        const amount = e.amount;
        const date = e.date_exp;

        const expenseEl = document.createElement('div');
        expenseEl.setAttribute("id", id);
        expensesCont.appendChild(expenseEl);
        
        // description
        const descriptionSpan = document.createElement('span');
        descriptionSpan.innerText = description;
        expenseEl.appendChild(descriptionSpan);
        // amount
        const amountSpan = document.createElement('span');
        amountSpan.innerText = amount;
        expenseEl.appendChild(amountSpan);
        // date
        const dateSpan = document.createElement('span');
        
        dateSpan.innerText = date.split("T")[0];
        expenseEl.appendChild(dateSpan);

        // create delete button
        const deleteEl = document.createElement('button');
        deleteEl.textContent = 'x';
        deleteEl.classList.add('delete');
        //deleteEl.addEventListener('click', deletePost); // event listener attached to every delete button
        expenseEl.appendChild(deleteEl);

        // create edit button
        const editEl = document.createElement('button');
        editEl.textContent = 'edit';
        editEl.classList.add('edit')
        //editEl.addEventListener('click', editPost); // event listener attached to every edit button
        expenseEl.appendChild(editEl);


    })
}

document.addEventListener("DOMContentLoaded", async () => {
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


    const expensesToDisplay = await expenses();
    await displayExpenses(expensesToDisplay);
})

