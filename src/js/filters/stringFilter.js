export function stringFilter(rows, column, filterValue) {
  let filtered;

  const regex = /^(\*?)([^*]+)(\*?)/g;
  const match = regex.exec(filterValue);

  if (match) {
    const jokerStrings = Array.from(match);
    jokerStrings.splice(0, 1);
    const findJokerChar = jokerStrings.find(str => str === "*");

    if (findJokerChar) {
      const startJoker = jokerStrings[0];
      const searchString = jokerStrings[1];
      const endJoker = jokerStrings[jokerStrings.length - 1];

      if (startJoker && !endJoker) {
        filtered = rows.filter((item) => item[column]
          .toLowerCase()
          .endsWith(searchString));
      } else if (startJoker && endJoker) {
        filtered = rows.filter((item) => item[column]
          .toLowerCase()
          .includes(searchString));
      } else {
        filtered = rows.filter((item) => item[column]
          .toLowerCase()
          .startsWith(searchString));
      }
    } else {

      if (filterValue === "-empty cells-") {
        filtered = rows.filter((item) => !item[column]);
      } else {
        filtered = rows.filter((item) => item[column]
          .toLowerCase()
          .includes(filterValue));
      }

    }

  } else {
    filtered = rows.filter((item) => item[column]
        .toLowerCase()
        .includes(filterValue));
  }

  return filtered;
}