import { $$Components, Build } from '../lib/core';
import FilterItem from './FilterItem';

const Filters = ({ initialState, props }) =>
  Build({
    initialState,
    props: {
      ...props,
      elementType: 'ul',
      classes: 'filters',
      attributes: {
        'data-root': props.name,
      },
    },
    components: ({ root }) => [
      $$Components({
        component: FilterItem,
        itemsList: (state) => state.filtersProps,
        state: initialState,
        props: () => ({
          targetSelector: root,
        }),
      }),
    ],
  });

export default Filters;
