import { Build } from '../lib/core';

const ListItem = ({ initialState, props, item: { title, completed } }) =>
  Build({
    initialState,
    props: {
      ...props,
      elementType: 'li',
      classes: `${completed ? 'completed' : ''}`,
      attributes: {
        'data-root': props.name,
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
    components: () => [],
  });

export default ListItem;
