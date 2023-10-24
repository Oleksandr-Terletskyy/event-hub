export function convertDate(value) {
  if (value.length === 1) {
    return converter(value[0]);
  } else {
    return `${converter(value[0])} - ${converter(value[1])}`;
  }
}

function converter(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (+day < 10) day = '0' + day;
  if (+month < 10) month = '0' + month;

  const formattedDate = day + '/' + month + '/' + year;
  return formattedDate;
}
