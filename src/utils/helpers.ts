import { type Filter, type Todo } from 'types';

export const getUncompletedTodos = (todos: Todo[]) =>
  todos.reduce((total, current) => {
    return (total = !current.completed ? total + 1 : total);
  }, 0);

export const getCompletedTodos = (todos: Todo[]) =>
  todos.reduce((total, current) => {
    return (total = current.completed ? total + 1 : total);
  }, 0);

export const filterTodos = (todos: Todo[], filter: Filter) => {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};
