import { select } from "../helpers/_dom";

export default class CollapsibleItem extends HTMLElement {
  constructor() {
    super();
    this.buttons = select("[data-collapsible-item]", this);

    this.buttons.listen("click", ({ $node }) => {
      $node.modifyClass("toggle", "c-footer__menuTitle--active");
    });

    window.addEventListener("klaviyoForms", function (e) {
      if (e.detail.type == "submit") {
        gtag("event", "form_submit", {
          form: "Klaviyo form",
          form_id: e.detail.formId,
        });
      }
    });
  }
}
