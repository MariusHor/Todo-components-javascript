import { Build } from '../lib/core';
import { withStoreHOF } from '../store';

const ListItem =
  (store) =>
  ({ initialState, props, item: { id, title, completed } }) =>
    Build({
      initialState,
      props: {
        ...props,
        name: `note-${id}`,
        elementType: 'li',
        classes: `${completed ? 'completed' : ''}`,
        attributes: {
          'data-root': `note-${id}`,
        },
        childrenElements: [
          {
            elementType: 'div',
            classes: 'view',

            childrenElements: [
              {
                elementType: 'input',
                classes: 'toggle',
                attributes: {
                  ['data-el']: `toggle-note-${id}`,
                  id: 'note-title',
                  type: 'checkbox',
                },
              },
              {
                elementType: 'label',
                textContent: title,
              },
            ],
          },
          {
            elementType: 'input',
            classes: 'edit',
            attributes: {
              value: 'Create a TodoMVC template',
            },
          },
        ],
      },
      bindings: [
        {
          type: 'classes',
          selector: `[data-root="note-${id}"]`,
          path: `notes[${id}].completed`,
          action: ({ elem, stateValue }) =>
            stateValue ? elem.classList.add('completed') : elem.classList.remove('completed'),
        },
        {
          type: 'input',
          selector: `[data-el="toggle-note-${id}"]`,
          path: `notes[${id}].completed`,
          action: ({ elem, stateValue }) => {
            stateValue ? (elem.checked = true) : (elem.checked = false);
          },
        },
      ],
      listeners: () => [
        {
          target: `[data-el="toggle-note-${id}"]`,
          type: 'click',
          callback: () => store.dispatch([() => todoActionCheck({ id })]),
        },
      ],
    });

export default withStoreHOF(ListItem);

const todoActionCheck = (payload) => ({
  type: 'todos/check',
  payload,
});
