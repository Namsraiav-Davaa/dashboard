const calculateRange = (rowsPerPage) => {
  const range = [];
  const num = rowsPerPage;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export { calculateRange, sliceData };
