export const toDateString = (d: string | Date) => {
  const date = new Date(d);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year} оны ${month} сарын ${day}`;
};
export const toShortDate = (d: string | Date) => {
  const date = new Date(d);
  var formattedDate =
    date.getFullYear() +
    "." +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + date.getDate()).slice(-2);
  return formattedDate;
};
