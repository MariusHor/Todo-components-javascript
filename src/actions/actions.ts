import { type GlobalState } from 'stores';

export const ADD_TODO = 'addTodo';
export const EDIT_TODO_START = 'editTodoStart';
export const DELETE_TODO = 'deleteTodo';
export const TOGGLE_TODO = 'toggleTodo';
export const UPDATE_FILTER = 'updateFilter';

export const addTodo = (todoTitle: string) => (state: GlobalState) => ({
  ...state,
  nextId: state.nextId + 1,
  todos: [
    ...state.todos,
    {
      title: todoTitle,
      completed: false,
      id: state.nextId,
    },
  ],
});

export const editTodoStart = (id: number) => (state: GlobalState) => ({
  ...state,
  form: {
    isEditing: true,
    value: state.todos.find((todo) => todo.id === id)?.title ?? '',
  },
});

export const deleteTodo = (id: number) => (state: GlobalState) => ({
  ...state,
  todos: state.todos.filter((todo) => todo.id !== id),
});

export const toggleTodo = (id: number) => (state: GlobalState) => ({
  ...state,
  todos: state.todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  ),
});

export const updateFilter = (filter: string) => (state: GlobalState) => ({
  ...state,
  activeFilter: filter,
});
