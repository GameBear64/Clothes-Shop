export const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'short',
});

export const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeStyle: "short"
});

export const timeAndDateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'short',
  timeStyle: "short"
});

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  roundingIncrement: 1,
});