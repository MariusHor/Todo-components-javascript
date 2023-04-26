import { Build } from '../lib/core';

const FilterItem = ({ initialState, props, item: { title, href, name } }) =>
  Build({
    initialState,
    props: {
      ...props,
      elementType: 'li',
      classes: 'filter',
      name,
      attributes: {
        'data-root': name,
      },
      childrenElements: [
        {
          elementType: 'a',
          classes: `${initialState.activeNotesFilter === name ? 'selected' : ''}`,
          textContent: title,
          attributes: {
            href,
          },
        },
      ],
    },
    components: () => [],
  });

export default FilterItem;
