let expensesCont = document.querySelector('#expenses-container');
let addExpenseButton = document.querySelector('#add-expense');

const logoutAnch = document.querySelector("#logout-anchor");

// returns an object of expenses
async function expenses() {
    const res = await fetch('/exp');
    const data = await res.json();
    const expenses = data.expenses;
    return expenses;
}

async function sumOfExpenses() {
    const res = await fetch('/exp/total');
    const data = await res.json();
    const total = data.total;
    return total
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

        /* 
        // trying to format the date
        const dateObj = new Date(date);

        const formatted = dateObj.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        });
        */

        const dateSpan = document.createElement('span');
        console.log(date)
        dateSpan.innerText = date.split("T")[0];
        expenseEl.appendChild(dateSpan);

        // create delete button
        const deleteEl = document.createElement('button');
        deleteEl.textContent = 'x';
        deleteEl.classList.add('delete');
        deleteEl.addEventListener('click', deletePost); // event listener attached to every delete button
        expenseEl.appendChild(deleteEl);

        // create edit button
        const editEl = document.createElement('button');
        editEl.textContent = 'edit';
        editEl.classList.add('edit')
        editEl.addEventListener('click', editPost); // event listener attached to every edit button
        expenseEl.appendChild(editEl);
    })
}

async function deletePost(e) {
    console.log('deleting...')
    const id = e.srcElement.parentNode.id;
    console.log(id)

    try {
        const res = await fetch('/exp', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                'id': id
            }
            )
        });
        const response = await res.json();
        const status = response.status;
        console.log(status)

        if (!res.ok) {
            throw new Error("Failed to fetch desired post");
        }
    } catch (e) {
        res.json({'error': e})
    }
    // redisplay everything
    // display of totals
    const totalExp = await sumOfExpenses();
    await updateTotal(totalExp);
    
    const expensesToDisplay = await expenses();
    await displayExpenses(expensesToDisplay);

}


async function editPost(e) {
    e.preventDefault();
    // get element id of parent element of event element which is delete button
    const id = e.srcElement.parentNode.id;
    // parent node
    const parentEl = e.srcElement.parentNode;

    // convert span element to input element
    const spanEl = e.srcElement.parentNode.firstChild;
    const spanText = spanEl.innerText;


    // get list of children
    let list = parentEl.children;
  
    
    // convert description to input element
    // get element
    const descriptionSpan = list[0];
    // get text
    const descriptionText = descriptionSpan.innerText;

    const descriptionInput = document.createElement('input');

    descriptionInput.classList.add('new-description')
    descriptionInput.classList.add(`editing-${id}`);
    descriptionInput.value = descriptionText;

    // add input El as first in div
    parentEl.insertBefore(descriptionInput, list[0]);
    
    // remove the span
    descriptionSpan.remove();

    // append as second to last child in container
    //header.insertBefore(nameEle, list[list.length-1]);

    // convert amount to input element
    // get element
    const amountSpan = list[1];
    // get text
    const amountText = amountSpan.innerText;

    const amountInput = document.createElement('input');

    amountInput.classList.add('new-amount')
    amountInput.classList.add(`editing-${id}`);
    amountInput.value = amountText;

    // add input El as first in div
    parentEl.insertBefore(amountInput, list[1]);
    
    // remove the span
    amountSpan.remove();


    // convert date to input element
    // get element
    const dateSpan = list[2];
    // get text
    const dateText = dateSpan.innerText;

    const dateInput = document.createElement('input');

    dateInput.classList.add('new-date')
    dateInput.classList.add(`editing-${id}`);
    dateInput.value = dateText;

    // add input El as first in div
    parentEl.insertBefore(dateInput, list[2]);
    
    // remove the span
    dateSpan.remove();

    // change 'edit' button to 'save' button
    const editButton = document.getElementById(id).getElementsByClassName('edit')[0];
    editButton.textContent = 'save';
    editButton.classList.add('save');
    editButton.classList.remove('edit');

    // make the button listen for a 'save' click.
    editButton.removeEventListener('click', editPost);
    editButton.addEventListener('click', saveEdit);
}

async function getDescription(id) {
    // only one item in array
    const newDescriptionEle = document.getElementsByClassName(`editing-${id} new-description`)[0]; // get element based off of 2 class names
    const newDescriptionText = newDescriptionEle.value;

    return newDescriptionText;
}
async function getAmount(id) {
    // only one item in array
    const newAmountEle = document.getElementsByClassName(`editing-${id} new-amount`)[0]; // get element based off of 2 class names
    const newAmountText = newAmountEle.value;

    return newAmountText;
}

async function getDate(id) {
    // only one item in array
    const newDateEle = document.getElementsByClassName(`editing-${id} new-date`)[0]; // get element based off of 2 class names
    const newDateText = newDateEle.value;

    return newDateText;
}


async function saveEdit(e) {
    const id = e.srcElement.parentNode.id;
    // get new inputs
    const newDescription = await getDescription(id) // get element based off of 2 class names
    const newAmount = await getAmount(id);
    const newDate = await getDate(id);

    console.log(newDescription, newAmount, newDate)
    try {
        const res = await fetch('/exp', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                'id': id, 
                'new_description': newDescription,
                'new_amount': newAmount,
                'new_date': newDate
            }
            )
        });
        const response = await res.json();
        const status = response.status;
        console.log(status)

        if (!res.ok) {
            throw new Error("Failed to fetch desired post");
        }
    } catch (e) {
        res.json({'error': e})
    }
    // redisplay everything

    // display of totals
    const totalExp = await sumOfExpenses();
    await updateTotal(totalExp);

    const expensesToDisplay = await expenses();
    await displayExpenses(expensesToDisplay);
}

async function addExpenseDisplay(e) {
    // only allows for one expense to be created at a time
    const checkForNew = document.querySelectorAll(".adding-new-expense");
    if (checkForNew.length >= 1 ) {
        console.log('already creating a new one...')
    } else {
        const newDiv = document.createElement("div");
        newDiv.classList.add('adding-new-expense')
        const descriptionSpan = document.createElement("span");
        const descriptionInput = document.createElement("input");
        descriptionInput.id = 'new-description';
        const amountSpan = document.createElement("span");
        const amountInput = document.createElement("input");
        amountInput.id = 'new-amount';
        const dateSpan = document.createElement("span");
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0];

        //const today = new Date().toISOString().split('T')[0]; 
        dateInput.value = today;
        dateInput.id = 'new-date';

        expensesCont.appendChild(newDiv);

        newDiv.appendChild(descriptionSpan);
        newDiv.appendChild(descriptionInput);
        newDiv.appendChild(amountSpan);
        newDiv.appendChild(amountInput);
        newDiv.appendChild(dateSpan);
        newDiv.appendChild(dateInput);

        descriptionSpan.textContent = 'description:';
        amountSpan.textContent = 'amount:';
        dateSpan.textContent = 'date:'

        const cancelButton = document.createElement("button");
        cancelButton.classList.add('cancel-button')
        cancelButton.textContent = 'cancel';
        const saveButton = document.createElement("button")
        saveButton.classList.add('save-button');
        saveButton.textContent = 'save';

        newDiv.appendChild(cancelButton);
        newDiv.appendChild(saveButton);

        cancelButton.addEventListener('click', cancelNewExpense);
        saveButton.addEventListener('click', saveNewExpense);
    }
}

async function cancelNewExpense(e) {
    console.log('cancelling...');
    const newExpenseDivs = document.querySelectorAll(".adding-new-expense");
    
    newExpenseDivs.forEach(div => {
        div.remove();
    })
}

async function saveNewExpense(e) {
    // get data from existing div
    const newDescription = document.querySelector("#new-description").value;
    const newAmount = document.querySelector("#new-amount").value;
    

    let newDate = document.querySelector("#new-date").value;
    newDate += `T00:00:00.000Z`;
    console.log(newDate)
    try {
        const res = await fetch('/exp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(
            {
                'new_description' : newDescription,
                'new_amount' : newAmount,
                'new_date' : newDate
            })
        })

        if (!res.ok) {
            throw new Error('Failed to add post')
        }
    } catch (e) {
        console.log('error adding new expense')
    }


    // redisplay everything
    // display of totals
    const totalExp = await sumOfExpenses();
    await updateTotal(totalExp);

    const expensesToDisplay = await expenses();
    await displayExpenses(expensesToDisplay);
}

async function updateTotal(total) {
    const totalDiv = document.querySelector("#total-div");
    totalDiv.innerHTML = '';

    // create label
    const label = document.createElement('span');
    label.textContent = "total:";

    const totalSpan = document.createElement('span');
    totalSpan.textContent = total;

    totalDiv.appendChild(label);
    totalDiv.appendChild(totalSpan);
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

    // add event listener to 'add new' button
    addExpenseButton.addEventListener('click', addExpenseDisplay);

    // handle logout
    logoutAnch.addEventListener("click", async (e) => {
        sessionStorage.clear();
    });

    // display of totals
    const totalExp = await sumOfExpenses();
    await updateTotal(totalExp);

    // display of all other items
    const expensesToDisplay = await expenses();
    await displayExpenses(expensesToDisplay);
})

