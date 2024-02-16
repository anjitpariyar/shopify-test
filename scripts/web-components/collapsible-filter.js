import { select } from '../helpers/_dom';

export default class CollapsibleFilter extends HTMLElement {
  constructor() {
    super();
    this.buttons = select('[data-collapisble-heading]', this);

    this.buttons.listen('click', ({ $node }) => {
      $node.modifyClass('toggle', 'c-facets__heading--active');
    });
  }
}