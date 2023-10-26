export const getTransactions = () => {
  return JSON.parse(localStorage.getItem('transactions')) ?? []
}

export const addTransaction = transaction => {
  const transactions = getTransactions()
  transactions.push(transaction)
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

export const updateTransaction = (index, transaction) => {
  const transactions = getTransactions()
  transactions[index] = transaction
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

export const deleteTransaction = index => {
  const transactions = getTransactions()
  transactions.splice(index, 1)
  localStorage.setItem('transactions', JSON.stringify(transactions))
}
