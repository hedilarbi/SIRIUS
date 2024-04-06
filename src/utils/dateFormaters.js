const yyyymmddFormat = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (rawDate) => {
  let date = new Date(rawDate);

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${day} / ${month} / ${year}`;
};

const convertDateFromSlashtoDash = (slashFormat) => {
  var dateComponents = slashFormat.split(" / ");

  var inputDateObj = new Date(
    dateComponents[2],
    dateComponents[1] - 1,
    dateComponents[0]
  );
  inputDateObj.setDate(inputDateObj.getDate() + 1);

  var dashFormat = inputDateObj.toISOString().split("T")[0];
  return dashFormat;
};

export { yyyymmddFormat, formatDate, convertDateFromSlashtoDash };
