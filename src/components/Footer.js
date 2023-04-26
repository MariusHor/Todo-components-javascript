import { $Component, Build } from '../lib/core';
import Button from './Button';
import Filters from './Filters';

const Footer = ({ initialState, props }) =>
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
            { elementType: 'strong', textContent: `${Object.keys(initialState.notes).length}`, position: 'prepend' },
          ],
        },
      ],
    },
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
        }),
      }),
    ],
  });

export default Footer;
