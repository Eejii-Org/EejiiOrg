export const toDateString = (d: string | Date) => {
  const date = new Date(d);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year} оны ${month} сарын ${day}`;
};
export const toShortDate = (d: string | Date) => {
  const date = new Date(d);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} сарын`;
};
