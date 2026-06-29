export const searchValueInObject = <T extends Record<string, unknown>>(searchValue: string, item: T): boolean => {
  return Object.values(item).some((property) => property?.toLocaleString().toLocaleLowerCase().includes(searchValue));
};

export const capitalize = (value: string): string => {
  if (!value || value.length === 0) {
    return '';
  }
  const lower = value.toLowerCase();
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length);
};
