'use strict';

const expenses = [];

const expensesAmount = [];

const now = new Date();
const addButtonExpense = document.querySelector('.btn_add');
const containerExpenses = document.querySelector('.monthnameamount_container');
const month = document.querySelector('.month_label');
const year = document.querySelector('.year_label');
const yearmonth = ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];
const monthNumber = now.getMonth();
const monthIncome = document.querySelector('.incomebalance_text');
const monthDepositedInBank = document.querySelector('.incomedeposit_text')
const totalIncome = document.querySelector('.incometotal__text')
const savingsBalance = document.querySelector('.savingsbalance_text')
const savingsDeposit = document.querySelector('.savingsdeposit_text')
const savingsTotal = document.querySelector('.savingstotal__text');
const incomeSummary = document.querySelector('.summmaryincome_text'); 
const savingsSummary = document.querySelector('.summmarysavings_text'); 
const expensesSummary = document.querySelector('.summmaryexpenses_text'); 
const totalSummary = document.querySelector('.summmarytotal__text'); 
const expenseAmount = document.querySelectorAll('.monthlyexpense_amount');
const expenseName = document.querySelector('.monthlyexpenses_name');
const currency = document.querySelector('.currencyselector');
 




//getting year and month
month.textContent = `${yearmonth[monthNumber]}`;
year.textContent = `${now.getFullYear()}`


// checking the input is string

const isAlphabetic = function (str) {
  return /^[a-zA-Z]+$/.test(str);
}


//NOTEONTHIS //LESSON 

//next is i need to change already the number from desired format
let currencyFormatValue;
const options = { style: 'currency' };

// Format of money
const currencyFormatters = [
  { code: 'USD', locale: 'en-US', ...options },
  { code: 'EUR', locale: 'de-DE', ...options },
  { code: 'JPY', locale: 'ja-JP', ...options },
  { code: 'GBP', locale: 'en-GB', ...options },
  { code: 'PHP', locale: 'en-PH', ...options }
];

  
const currencyFormat = function (money){
  currencyFormatValue = currency.value;
  let formattedMoney;

  currencyFormatters.forEach(currency => { 
     if(currency.code === currencyFormatValue) { 

  formattedMoney = new Intl.NumberFormat(currency.locale,{ style: options.style , currency: currency.code } )
    .format(money);
    };
  })

  return formattedMoney;
};


const updateTotalAll = function(){ 


  
   const monthIncome_Deposited = Number(monthIncome.value) + Number(monthDepositedInBank.value); 
   const monthSavings_Deposited = Number(savingsBalance.value + savingsDeposit.value);
   const totalIncome_Savings = Number(monthIncome_Deposited + monthSavings_Deposited);

    

  
    totalIncome.textContent = currencyFormat(monthIncome_Deposited);
    savingsTotal.textContent = currencyFormat(monthSavings_Deposited) ;  
    incomeSummary.textContent  = currencyFormat(totalIncome_Savings);
    savingsSummary.textContent = currencyFormat(totalIncome_Savings - Number(expensesSummary.textContent)) ;
    totalSummary.textContent = currencyFormat(totalIncome_Savings + Number(expensesSummary.textContent)) ;


   console.log(currencyFormat(monthIncome_Deposited));
}



monthIncome.addEventListener('input', updateTotalAll);
monthDepositedInBank.addEventListener('input', updateTotalAll);
savingsBalance.addEventListener('input', updateTotalAll);
savingsDeposit.addEventListener('input', updateTotalAll);



const montlyExpensestoSummary = function(e){
   e.preventDefault();

  const expensename = prompt('Name');
  const amount = Number(prompt('Amount'));


  if (isAlphabetic(expensename) === true  && isNaN(amount) === false  ) 
    {

      const html =  `<div class="monthlyexpensesname_row">
                    <div class="monthlyexpenses_name">${expensename}</div>
                    <div class="monthlyexpense_amount">${Number(amount)}</div>
                 </div>`

      expensesAmount.push(amount);
      expenses.push(expensename);

    
      const addExpenses = expensesAmount.reduce( (acc,value) => acc + value, 0);
      
      savingsSummary.textContent = currencyFormat( Number(monthIncome.value) + Number(monthDepositedInBank.value) - addExpenses);
      expensesSummary.textContent = currencyFormat( addExpenses);
      totalSummary.textContent = currencyFormat( Number(monthIncome.value) + Number(monthDepositedInBank.value) + addExpenses);


      containerExpenses.insertAdjacentHTML('beforeend', html);
     
  }else{

    alert('Invalid Input');

}}


addButtonExpense.addEventListener('click',montlyExpensestoSummary)









