import type { TodoAccessories } from '../../types/todoAccessories.type';
import { TodoType, todoTypes } from '../../types/todoType.type';

type PendingTodos = {
  props: number;
  total: number;
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
