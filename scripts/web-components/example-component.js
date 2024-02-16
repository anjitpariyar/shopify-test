import { select } from '../helpers/_dom';

export default class ExampleComponent extends HTMLElement {
  constructor() {
    super();
    this.buttons = select('[data-button]', this);

    this.buttons.listen('click', ({ $node }) => {
      this.buttons.modifyClass('remove', 'active');
      $node.modifyClass('add', 'active');
    });
  }
}
