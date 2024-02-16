import { select } from '../helpers/_dom';

export default class FrequentQuestions extends HTMLElement {
  constructor() {
    super();

    this.faqHeaders = select('[data-accordion-item-header]', this);
    this.faqHeaders.listen('click', ({ $node }) => {
      $node.modifyClass('toggle', 'c-faqsAccordion__header--active');
    });
  }
}