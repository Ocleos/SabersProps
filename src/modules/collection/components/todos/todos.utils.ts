import type { TodoAccessories } from '../../types/todoAccessories.type';
import { TodoType, todoTypes } from '../../types/todoType.type';

type PendingTodos = {
  props: number;
  total: number;
};

export type TodoTypeProgress = {
  completed: number;
  percentage: number;
  total: number;
  type: TodoType;
};

export type TodosProgress = {
  overall: Omit<TodoTypeProgress, 'type'>;
  types: TodoTypeProgress[];
};

export const countPending = (todos: TodoAccessories[], propertyName: keyof TodoAccessories): number => {
  return todos.reduce((count, item) => {
    return item[propertyName] ? count : count + 1;
  }, 0);
};

export const countPendingTodos = (todos: TodoAccessories[]): PendingTodos => {
  const props = countPending(todos, todoTypes[TodoType.PROP].propertyName);
  const bags = countPending(todos, todoTypes[TodoType.BAG].propertyName);
  const keyrings = countPending(todos, todoTypes[TodoType.KEYRING].propertyName);
  const displayPlaques = countPending(todos, todoTypes[TodoType.DISPLAY_PLAQUE].propertyName);

  const total = props + bags + keyrings + displayPlaques;

  return { props, total };
};

const computePercentage = (completed: number, total: number): number => {
  return total === 0 ? 0 : Math.round((completed / total) * 100);
};

export const computeTodosProgress = (todos: TodoAccessories[]): TodosProgress => {
  const total = todos.length;

  const types = [TodoType.PROP, TodoType.BAG, TodoType.KEYRING, TodoType.DISPLAY_PLAQUE].map((type) => {
    const completed = total - countPending(todos, todoTypes[type].propertyName);
    const percentage = computePercentage(completed, total);

    return { completed, percentage, total, type };
  });

  const overallCompleted = types.reduce((sum, type) => sum + type.completed, 0);
  const overallTotal = total * types.length;

  return {
    overall: {
      completed: overallCompleted,
      percentage: computePercentage(overallCompleted, overallTotal),
      total: overallTotal,
    },
    types,
  };
};
