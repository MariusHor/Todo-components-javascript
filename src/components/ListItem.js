import { todoActionCheck, todoActionClear, todoActionEditRequest } from '../actions';
import { Build } from '../lib/core';
import { withStoreHOF } from '../store';
import Button from './Button';

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
            attributes: {
              'data-el': `note-${id}-view`,
            },
            childrenElements: [
              {
                elementType: 'input',
                classes: 'toggle',
                attributes: {
                  id: 'note-title',
                  type: 'checkbox',
                  ['data-el']: `toggle-note-${id}`,
                },
              },
              {
                elementType: 'label',
                textContent: title,
                attributes: {
                  ['data-el']: `label-note-${id}`,
                },
              },
            ],
          },
        ],
      },
      components: ({ root }) => [
        Button({
          initialState,
          props: {
            targetSelector: root,
            name: `delete-note-${id}`,
            classes: 'destroy',
            event: {
              callback: () => store.dispatch([() => todoActionClear({ id })]),
            },
          },
        }),
      ],
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
        {
          type: 'text',
          selector: [`[data-el="label-note-${id}"]`],
          path: `notes[${id}].title`,
        },
      ],
      listeners: () => [
        {
          target: `[data-el="toggle-note-${id}"]`,
          callback: () => store.dispatch([() => todoActionCheck({ id })]),
        },
        {
          target: `[data-el="label-note-${id}"]`,
          type: 'dblclick',
          callback: () => store.dispatch([() => todoActionEditRequest({ id })]),
        },
      ],
    });

export default withStoreHOF(ListItem);
