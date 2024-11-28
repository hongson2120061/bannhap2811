export const formatCurrency = (amount) => {
  const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${formattedAmount} VND`
}
