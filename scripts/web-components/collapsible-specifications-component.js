import { select } from "../helpers/_dom";

export default class CollapsibleSpecs extends HTMLElement {
  constructor() {
    super();
    this.buttons = select(
      "[data-collapsible-specifications-section-header]",
      this
    );

    this.buttons.listen("click", ({ $node }) => {
      $node.modifyClass("toggle", "c-collapsibleSpecs__header--active");
    });
  }
}
