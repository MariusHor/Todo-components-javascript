import { type FiltersContext, type FormContext, type TodosContext } from 'providers';
import { type Todo, type Filter } from 'types';

export const ADD_TODO = 'addTodo';
export const START_TODO_EDIT = 'startTodoEdit';
export const SAVE_TODO_EDIT = 'saveTodoEdit';
export const DELETE_TODO = 'deleteTodo';
export const TOGGLE_TODO = 'toggleTodo';
export const UPDATE_FILTER = 'updateFilter';

export const addTodo = (todoTitle: string) => (state: TodosContext) => ({
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

export const startTodoEdit = (id: number, value: string) => (state: FormContext) => ({
  ...state,
  isEditing: true,
  value,
  todoToEditId: id,
});

export const saveTodoEdit = (title: string, id: number) => (state: TodosContext) => ({
  ...state,
  todos: state.todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
});

export const resetForm = () => () => ({
  isEditing: false,
  value: '',
  todoToEditId: null,
});

export const deleteTodo = (id: number) => (state: TodosContext) => ({
  ...state,
  todos: state.todos.filter((todo: Todo) => todo.id !== id),
});

export const toggleTodo = (id: number) => (state: TodosContext) => ({
  ...state,
  todos: state.todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  ),
});

export const clearCompleted = () => (state: TodosContext) => ({
  ...state,
  todos: state.todos.filter((todo) => !todo.completed),
});

export const toggleCompleted = () => (state: TodosContext) => ({
  ...state,
  todos: state.todos.map((todo) => ({
    ...todo,
    completed: state.todos.every((todo) => todo.completed) ? false : true,
  })),
});

export const getCompleted = () => (state: TodosContext) => ({
  ...state,
  todos: state.todos.filter((todo) => todo.completed),
});

export const getAll = () => (state: TodosContext) => ({
  ...state,
  todos: state.todos,
});

export const updateFilter = (filter: Filter) => (state: FiltersContext) => ({
  ...state,
  activeFilter: filter,
});
