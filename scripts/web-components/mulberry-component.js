import { select } from "../helpers/_dom";

export default class Mulberry extends HTMLElement {
  constructor() {
    super();

    this.mulberryComponent = select("[data-mulberry-component]", this);

    this.warrantyId = document.querySelector("[name=warranty_id]");

    this.productData = null;
    this.warranty = null;
    this.warrantyVariantId = null;

    this.form = document.querySelector(".form");
    this.form.querySelector("[name=warranty_id]").disabled = false;
    this.form.addEventListener("submit", this.onSubmitHandler.bind(this));
    this.submitButton = document.querySelector('[type="submit"]');

    document.addEventListener("mulberry-shopify:loaded", () => {
      this.init();
    });
  }

  async onSubmitHandler(evt) {
    if (this.warrantyId && this.warrantyId.value != "") {
      await mulberryShop.addWarrantyToCart(
        this.warrantyVariantId,
        this.productData,
        this.warranty
      );
    }
  }

  async init() {
    let response = await mulberryShop.getProductData(
      mulberryShop.getProductUrl()
    );
    this.productData = response.product;

    const offer = await mulberry.core.getWarrantyOffer({
      id: this.productData.id,
      title: this.productData.title,
      price: this.productData.variants[0].price,
      detail: this.productData,
    });

    if (offer && offer.length > 0) {
      mulberry.inline.init({
        offers: offer,
        settings: mulberry.core.settings,
        layout: {
          input: "checkbox",
        },
        selector: ".mulberry-inline-container",
        onWarrantyToggle: async (warranty) => {
          this.warranty = warranty;
          const result = await mulberryShop.getWarrantyVariant(warranty.offer);

          if (result) {
            this.warrantyVariantId = result.shopify_variant_id;
          }

          if (this.warrantyId && result) {
            this.warrantyId.value = result.shopify_variant_id;
            this.warrantyId.disabled = false;
          }

          if (warranty.isSelected == false) {
            this.warrantyId.value = "";
            this.warrantyId.disabled = true;
          }
        },
      });
    } else {
      this.mulberryComponent.modifyClass("add", "c-hideMulberry");
    }
  }
}
