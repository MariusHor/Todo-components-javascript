import { Build } from '../lib/core';
import { withStoreHOF } from '../store';

const Header =
  (store) =>
  ({ initialState, props }) =>
    Build({
      initialState,
      props: {
        ...props,
        elementType: 'header',
        classes: 'header',
        attributes: {
          'data-root': props.name,
        },
        childrenElements: [
          {
            elementType: 'h1',
            textContent: 'todos',
          },
          {
            elementType: 'form',
            attributes: {
              'data-el': 'form',
            },
            childrenElements: [
              {
                elementType: 'input',
                classes: 'new-todo',
                attributes: {
                  placeholder: 'What needs to be done?',
                  autofocus: '',
                  ['data-state-prop']: 'form-input',
                },
              },
            ],
          },
        ],
      },
      bindings: [
        {
          type: 'input',
          selector: ['[data-state-prop="form-input"]'],
          path: 'form.input.value',
        },
      ],
      listeners: () => [
        {
          target: '[data-el="form"]',
          type: 'submit',
          callback: (event) => {
            event.preventDefault();
            let input = document.querySelector('[data-state-prop="form-input"]');
            store.dispatch([
              () => todoActionAdd({ title: input.value, completed: false }),
              () => formActionSetInput({ value: '' }),
            ]);
          },
        },
      ],
    });

export default withStoreHOF(Header);

const todoActionAdd = (payload) => ({
  type: 'todos/add',
  payload,
});

const formActionSetInput = (payload) => ({
  type: 'form/setInput',
  payload,
});
