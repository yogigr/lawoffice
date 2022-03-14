

const getPageNumber = (url) => {
  return parseFloat(
    new URLSearchParams(url.substr(url.indexOf("?page"))).get("page")
  );
};

const toCurrency = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
};

const getStatusColor = (statusId) => {
  if (statusId === 1) {
    return "yellow";
  } else if (statusId === 2) {
    return "gray";
  } else if (statusId === 3) {
    return "red";
  }
  return "green";
};

export { getPageNumber, toCurrency, getStatusColor };