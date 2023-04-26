import { Build } from '../lib/core';

const Header = ({ initialState, props }) =>
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
          elementType: 'input',
          classes: 'new-todo',
          attributes: {
            placeholder: 'What needs to be done?',
            autofocus: '',
          },
        },
      ],
    },
  });

export default Header;
