import { ContextProvider } from 'lib';
import { type Todo } from 'types';

export type TodosContext = {
  nextId: number;
  todos: Todo[];
};

export const TodosProvider = new ContextProvider<TodosContext>({
  state: {
    nextId: 0,
    todos: [],
  },
});
