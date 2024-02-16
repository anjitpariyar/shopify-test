import { select } from "../helpers/_dom";

export default class TestimonialsItem extends HTMLElement {
  constructor() {
    super();
    this.testimonials = select('[data-testimonials-item]', this);
    this.buttons = select('[data-testimonials-btn]', this);
    this.buttons.listen('click', ({ $node, index }) => {
      this.testimonials.modifyClass('add', 'c-testimonials__item--hidden');
      this.testimonials[index].modifyClass('remove', 'c-testimonials__item--hidden');
      this.buttons.modifyClass('remove', 'c-testimonials__logoBtn--active');
      this.buttons.setAttributes('aria-current', false);
      $node.setAttribute('aria-current', true);
      $node.modifyClass('add', 'c-testimonials__logoBtn--active');
    });
  }
}