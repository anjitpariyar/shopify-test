import { select } from '../helpers/_dom';

export default class ToggleNotify extends HTMLElement {
  constructor() {
    super();
    this.buttons = select('[data-notify-form]', this);
    this.notifyForm = select('[data-notify]', this);
    this.closeBtn = select('[data-notify-close]', this);

    this.buttons.listen('click', ({ $node }) => {
      $node.modifyClass('add', 'c-outOfStock__notify--active');
      this.notifyForm.modifyClass('add', 'c-notify--active');
    });

    this.closeBtn.listen('click', () => {
      this.buttons.modifyClass('remove', 'c-outOfStock__notify--active');
      this.notifyForm.modifyClass('remove', 'c-notify--active');
    });
  }
}