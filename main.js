document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('text').addEventListener('keydown', function(e) {
   if (e.key === "Enter") {
      addTodo();
   }

});
function addTodo() {
  const todoInput = document.getElementById('text');
   const todoText = todoInput.value.trim();
 
   if (todoText !== "") {
   
   const li = document.createElement('li');
   const span = document.createElement('span');
   span.textContent = todoText;

   const deleteBtn = document.createElement('button');
   deleteBtn.textContent = 'delete';
   deleteBtn.addEventListener('click', deleteTodo);
   console.log('li');

   li.appendChild(span);
   li.appendChild(deleteBtn);
   
   }
}
 

function deleteTodo(event)  {
   const li = event.target.parentElement;
   const todoList = li.parentElement;
   todoList.removeChild(li);
}

const Balance = document.getElementById('Balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const cup = document.getElementById('cup');
const text = document.getElementById('text');
const cup_thee = document.getElementById('cup_thee');
const amount = document.getElementById('amount');
 
const localStorageTransaction = JSON.parse(
   localStorage.getItem('transactions')
);

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

console.log(transactions);

function addTransaction(e) {
   e.preventDefault();

   if (text.value.trim()  === ''  || amount.value.trim()  ===  '')  {
      alert('please add a task and amount');
   } else {
      const transaction = {
         id: generateID(),
         text: text.value,
         amount: +amount.value
      };

      transactions.push(transaction);

      addTransactionDOM(transaction);
      

      updateValues();

      updateLocalStorage();

      text.value = '';
      amount.value = '';
   }
}
 console.log(transactions);
function generateID() {
   return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
   // Get sign
   const sign = transaction.amount < 0 ? '-$' : '+$';

   const item = document.createElement('li');

   // Add class based on value
   item.classList.add(transaction.name < 0 ? 'minus' : 'plus');

   item.innerHTML = `
   ${transaction.text} <span>${sign}${Math.abs(transaction.amount
   )}</span> <button class="btn" onclick="removeTransaction( ${transaction.id
})">x</button> 
   `;

   list.appendChild(item);
}

function updateValues() {
   const amounts = transactions.map(transaction => transaction.amount);

   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

   const income = amounts
   .filter(item => item > 0)
   .reduce((acc, item) => (acc += item), 0)
   .toFixed(2);

   const expense = (
      amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
   ).toFixed(2);

   Balance.innerText = `$${total}`;
   money_plus.innerText = `$${income}`;
   money_minus.innerText = `$${expense}`;
}

function removeTransaction(id) {
   transactions = transactions.filter(transaction => transaction.id !== id);

   updateLocalStorage();

   init();
}

function updateLocalStorage() {
   localStorage.setItem('transactions', JSON.stringify(transactions));

}

function init() {
   list.innerHTML = '';
    
   transactions.forEach(addTransactionDOM);
   updateValues();
}

init();

cup.addEventListener('submit', addTransaction);
