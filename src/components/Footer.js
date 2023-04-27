import { todoClearCompleted } from '../actions';
import { $Component, Build } from '../lib/core';
import { withStoreHOF } from '../store';
import Button from './Button';
import Filters from './Filters';

const Footer =
  (store) =>
  ({ initialState, props }) =>
    Build({
      initialState,
      props: {
        ...props,
        elementType: 'footer',
        classes: 'footer',
        attributes: {
          'data-root': props.name,
        },
        childrenElements: [
          {
            elementType: 'span',
            classes: 'todo-count',
            textContent: `${Object.keys(initialState.notes).length === 1 ? ' item' : ' items'} left`,
            childrenElements: [
              {
                elementType: 'strong',
                textContent: `${Object.values(initialState.notes).filter((note) => !note.completed).length}`,
                position: 'prepend',
                attributes: {
                  'data-el': 'notes-count',
                },
              },
            ],
          },
        ],
      },
      bindings: [
        {
          type: 'text',
          selector: ['[data-el="notes-count"]'],
          path: 'notes',
          action: ({ elem, stateValue }) =>
            (elem.textContent = `${Object.values(stateValue).filter((note) => !note.completed).length}`),
        },
      ],
      components: ({ root }) => [
        Filters({
          initialState,
          props: {
            targetSelector: root,
            name: 'filters',
          },
        }),
        $Component({
          condition: (state) => Object.values(state.notes).some((note) => note.completed),
          component: Button,
          state: initialState,
          props: () => ({
            name: 'clear-completed',
            targetSelector: root,
            classes: 'clear-completed',
            title: 'Clear completed',
            event: {
              type: 'click',
              callback: () => store.dispatch([() => todoClearCompleted()]),
            },
          }),
        }),
      ],
    });

export default withStoreHOF(Footer);
