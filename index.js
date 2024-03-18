// index.js

const fs = require('fs');

class BudgetTracker {
  constructor() {
    this.transactions = [];
  }

  loadTransactions() {
    try {
      const data = fs.readFileSync('transactions.json', 'utf8');
      this.transactions = JSON.parse(data);
      console.log('Transactions loaded successfully.');
    } catch (err) {
      console.error('Error loading transactions:', err);
    }
  }

  saveTransactions() {
    try {
      const data = JSON.stringify(this.transactions, null, 2);
      fs.writeFileSync('transactions.json', data);
      console.log('Transactions saved successfully.');
    } catch (err) {
      console.error('Error saving transactions:', err);
    }
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    this.saveTransactions();
  }

  getTotalBalance() {
    let totalBalance = 0;
    this.transactions.forEach(transaction => {
      totalBalance += transaction.amount;
    });
    return totalBalance;
  }

  displayTransactions() {
    console.log('Transactions:');
    this.transactions.forEach((transaction, index) => {
      console.log(`${index + 1}. ${transaction.date} - ${transaction.description}: $${transaction.amount}`);
      console.log('-------------------------------------');
    });
  }
}

const budgetTracker = new BudgetTracker();
budgetTracker.loadTransactions();
budgetTracker.displayTransactions();

// Example: Add a new transaction
const newTransaction = {
  date: '2024-03-10',
  description: 'Grocery shopping',
  amount: -50 // negative for expenses, positive for income
};
budgetTracker.addTransaction(newTransaction);

console.log('Total balance:', budgetTracker.getTotalBalance());
