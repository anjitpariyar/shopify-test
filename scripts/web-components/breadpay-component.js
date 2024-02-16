import { select } from "../helpers/_dom";

export default class BreadPay extends HTMLElement {
  constructor() {
    super();
    document.addEventListener("DOMContentLoaded", removeElement);

    function isDesktopView() {
      return window.innerWidth > 768;
    }

    function removeElement() {
      const breadPay = select("[data-breadpay-mobile]");
      const breadPayMobile = select("[data-breadpay-mobile-ele]");

      if (breadPay && breadPayMobile && isDesktopView()) {
        if (breadPayMobile.parentNode) {
          breadPayMobile.parentNode.removeChild(breadPayMobile);
        }
      }
    }
  }
}
