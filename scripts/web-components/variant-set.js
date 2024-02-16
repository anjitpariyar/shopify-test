import { select } from "../helpers/_dom";
import { formatMoney } from "../helpers/_money";

export default class VariantSet extends HTMLElement {
  constructor() {
    super();
    this.QuantityChange = select("[data-quantity-input]", this);
    this.addEventListener("change", this.onVariantChange);
    priceUpdate();
  }
  onVariantChange() {
    priceUpdate();

    this.QuantityChange.forEach((el) => {
      if (el.value == 0) {
        el.parentNode.parentNode.classList.add("c-quantityDropDown__disabled");
      } else {
        el.parentNode.parentNode.classList.remove(
          "c-quantityDropDown__disabled"
        );
      }
    });
  }
}

function priceUpdate() {
  const pairAddtoCartWrap = select("[data-set-add-to-cart]");
  const pairAddtoCart = select("[data-set-submit]");
  const pairTotalPriceMobile = select("[data-set-total-price-mobile]");
  const pairTotalPriceDesktop = select("[data-set-total-price-desktop]");
  const allQtyInputsDesktop = select("[data-quantity-input-desktop]", this);
  const allQtyInputsMobile = select("[data-quantity-input-mobile]", this);
  let totalQtyDesktop = 0;
  let totalQtyMobile = 0;
  let totalPriceDesktop = 0;
  let totalPriceMobile = 0;

  allQtyInputsDesktop.forEach((allQtyInput) => {
    const inputValue = allQtyInput.value;
    const inputPrice = parseInt(allQtyInput.getAttribute("data-price-desktop"));

    totalQtyDesktop = totalQtyDesktop + inputValue;
    totalPriceDesktop = totalPriceDesktop + inputPrice * inputValue;
  });

  allQtyInputsMobile.forEach((allQtyInput) => {
    const inputValue = allQtyInput.value;
    const inputPrice = parseInt(allQtyInput.getAttribute("data-price-mobile"));

    totalQtyMobile = totalQtyMobile + inputValue;
    totalPriceMobile = totalPriceMobile + inputPrice * inputValue;
  });

  if (totalQtyDesktop > 0 || totalQtyMobile > 0) {
    pairAddtoCart.removeAttribute("disabled");
  } else {
    pairAddtoCart.setAttribute("disabled", "");
  }

  if (totalPriceDesktop) {
    pairTotalPriceDesktop.innerText = formatMoney(totalPriceDesktop);
  }
  if (totalPriceMobile) {
    pairTotalPriceMobile.innerText = formatMoney(totalPriceMobile);
  }
}
