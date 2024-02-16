export function formatMoney(cents, currency = 'USD') {
  const dollars = cents / 100;
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(dollars);
}
