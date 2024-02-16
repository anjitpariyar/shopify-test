import { select } from "../helpers/_dom";

export default class CollapsibleTextSec extends HTMLElement {
  constructor() {
    super();
    this.buttons = select("[data-collapsible-section-header]", this);

    this.buttons.listen("click", ({ $node }) => {
      $node.modifyClass("toggle", "c-collapsibleTextBlock__header--active");
    });
  }
}
