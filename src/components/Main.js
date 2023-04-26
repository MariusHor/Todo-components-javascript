import { Build } from '../lib/core';
import TodoList from './TodoList';

const Main = ({ initialState, props }) =>
  Build({
    initialState,
    props: {
      ...props,
      elementType: 'div',
      classes: 'main',
      attributes: {
        'data-root': props.name,
      },
      childrenElements: [
        {
          elementType: 'input',
          classes: 'toggle-all',
          attributes: {
            id: 'toggle-all',
            type: 'checkbox',
          },
        },
        {
          elementType: 'label',
          textContent: 'Mark all as complete',
          attributes: {
            for: 'toggle-all',
          },
        },
      ],
    },
    components: ({ root }) => [
      TodoList({
        initialState,
        props: {
          targetSelector: root,
          name: 'todo-list',
        },
      }),
    ],
  });

export default Main;
