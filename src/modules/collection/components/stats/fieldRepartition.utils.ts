export type FieldRepartition = {
  value: string;
  count: number;
  percentage: number;
};

export const calculateFieldRepartition = (data: string[]): FieldRepartition[] => {
  const total = data.length;

  const counts = data.reduce<Record<string, number>>((accumulator, value) => {
    accumulator[value] = (accumulator[value] ?? 0) + 1;

    return accumulator;
  }, {});

  return Object.entries(counts)
    .map(([value, count]) => ({
      count,
      percentage: total === 0 ? 0 : Math.round((count / total) * 100),
      value,
    }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
};
