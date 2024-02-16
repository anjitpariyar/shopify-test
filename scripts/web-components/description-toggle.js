import { select } from '../helpers/_dom';

export default class DescriptionToggle extends HTMLElement {
  constructor() {
    super();
    const button = select('[data-description-toggle]');
    const wrapper = select('[data-mobile-collection-wrapper]');
    button.listen('click', ({$node}) => {
      wrapper.modifyClass('remove', 'c-collectionHero__description--toggle');
      $node.modifyClass('add','u-hide');
    });
  }
}