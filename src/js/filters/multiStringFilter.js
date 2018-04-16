export function multiStringFilter(rows, column, filterValue) {
  let filtered;

  if (filterValue.includes(";")) {
    const values = filterValue.split(";");

    filtered = rows.filter((item) => {
      const cellValue = item[column].toLowerCase();

      if (values.indexOf(cellValue) !== -1) {
        return item;
      }
    });
  } else {
    if (filterValue === "-empty cells-") {
      filtered = rows.filter((item) => !item[column]);
    } else {
      filtered = rows.filter((item) => item[column]
        .toLowerCase()
        .includes(filterValue));
    }
  }

  return filtered;
}