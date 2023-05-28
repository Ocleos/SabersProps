import { indexOf, some } from 'lodash';

export const addOrRemove = <T>(list: T[], item: T): T[] => {
  const indexType = indexOf(list, item);

  if (indexType === -1) {
    list.push(item);
  } else {
    list.splice(indexType, 1);
  }

  return list;
};

export const searchValueInObject = (searchValue: string, item: Object): boolean => {
  return some(Object.values(item), (property) => property?.toLocaleString().toLocaleLowerCase().includes(searchValue));
};
