export const addOrRemove = <T>(list: T[], item: T): T[] => {
  const indexType = list.indexOf(item);

  if (indexType === -1) {
    list.push(item);
  } else {
    list.splice(indexType, 1);
  }

  return list;
};

export const searchValueInObject = <T extends Record<string, unknown>>(searchValue: string, item: T): boolean => {
  return Object.values(item).some((property) => property?.toLocaleString().toLocaleLowerCase().includes(searchValue));
};
