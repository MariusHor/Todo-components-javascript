import { $$Components, Build } from '../lib/core';
import ListItem from './ListItem';

const TodoList = ({ initialState, props }) =>
  Build({
    initialState,
    props: {
      ...props,
      elementType: 'ul',
      classes: 'todo-list',
      attributes: {
        'data-root': props.name,
      },
    },
    components: ({ root }) => {
      return [
        $$Components({
          itemsList: (state) => Object.values(state.notes),
          component: ListItem,
          state: initialState,
          props: () => ({
            targetSelector: root,
          }),
          filter: (state) => ({
            check: state.activeNotesFilter,
            cases: [
              {
                value: 'all',
                callback: (note) => note,
              },
              {
                value: 'active',
                callback: (note) => !note.completed,
              },
              {
                value: 'completed',
                callback: (note) => note.completed,
              },
            ],
          }),
        }),
      ];
    },
  });

export default TodoList;
