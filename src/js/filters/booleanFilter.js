export function booleanFilter(rows, column, filterValue) {
  let filtered;

  if (filterValue) {

    filtered = rows.filter((item) => {
      const cellValue = item[column];
      const isTrue = filterValue === cellValue.toString();

      if (isTrue) {
        return item;
      }
    });

  } else {
      filtered = rows;
  }

  return filtered;
}