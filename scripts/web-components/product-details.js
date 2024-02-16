import { select } from "../helpers/_dom";

export default class ProductDetails extends HTMLElement {
  constructor() {
    super();

    const PDPStickyElement = select("[data-pdp-sticky-scroll]", this);
    let stickyOffset = PDPStickyElement.offsetTop;

    const productOverviewMenuItem = select("[data-product-overview]", this);
    const specsMenuItem = select("[data-specifications]", this);
    const detailsMenuItem = select("[data-details]", this);
    const reviewsMenuItem = select("[data-reviews-questions]", this);

    const productOverviewEle = document.querySelector("#ProductOverview");
    const specsEle = document.querySelector("#Specifications");
    const detailsEle = document.querySelector("#Details");
    const reviewsEle = document.querySelector("#ReviewsQuestions");

    window.addEventListener("scroll", function () {
      if (window.scrollY >= productOverviewEle.offsetTop - 250) {
        PDPStickyElement.modifyClass("add", "c-pdpStickyEle--sticky");
        PDPStickyElement.setAttribute("style", "display:flex;");
      } else {
        PDPStickyElement.modifyClass("remove", "c-pdpStickyEle--sticky");
        PDPStickyElement.setAttribute("style", "display:none;");
      }

      if (
        productOverviewEle != null &&
        window.scrollY >= productOverviewEle.offsetTop - 200
      ) {
        productOverviewMenuItem.modifyClass("add", "c-pdpNav__link--active");

        if (specsEle != null) {
          specsMenuItem.modifyClass("remove", "c-pdpNav__link--active");
        }
        if (detailsEle != null) {
          detailsMenuItem.modifyClass("remove", "c-pdpNav__link--active");
        }
        if (reviewsEle != null) {
          reviewsMenuItem.modifyClass("remove", "c-pdpNav__link--active");
        }
      }

      if (specsEle != null && window.scrollY >= specsEle.offsetTop - 200) {
        specsMenuItem.modifyClass("add", "c-pdpNav__link--active");

        if (productOverviewEle != null) {
          productOverviewMenuItem.modifyClass(
            "remove",
            "c-pdpNav__link--active"
          );
        }
        if (detailsEle != null) {
          detailsMenuItem.modifyClass("remove", "c-pdpNav__link--active");
        }
        if (reviewsEle != null) {
          reviewsMenuItem.modifyClass("remove", "c-pdpNav__link--active");
        }
      }

      if (detailsEle != null && window.scrollY >= detailsEle.offsetTop - 200) {
        detailsMenuItem.modifyClass("add", "c-pdpNav__link--active");

        if (specsEle != null) {
          specsMenuItem.modifyClass("remove", "c-pdpNav__link--active");
        }
        if (productOverviewEle != null) {
          productOverviewMenuItem.modifyClass(
            "remove",
            "c-pdpNav__link--active"
          );
        }
        if (reviewsEle != null) {
          reviewsMenuItem.modifyClass("remove", "c-pdpNav__link--active");
        }
      }

      if (reviewsEle != null && window.scrollY >= reviewsEle.offsetTop - 200) {
        reviewsMenuItem.modifyClass("add", "c-pdpNav__link--active");

        if (specsEle != null) {
          specsMenuItem.modifyClass("remove", "c-pdpNav__link--active");
        }
        if (detailsEle != null) {
          detailsMenuItem.modifyClass("remove", "c-pdpNav__link--active");
        }
        if (productOverviewEle != null) {
          productOverviewMenuItem.modifyClass(
            "remove",
            "c-pdpNav__link--active"
          );
        }
      }
    });

    select('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        if (this.getAttribute("href") != "#") {
          const targetElement = document.querySelector(
            this.getAttribute("href")
          );
          if (targetElement) {
            const offset =
              targetElement.getBoundingClientRect().top + window.scrollY - 160;

            window.scrollTo({
              top: offset,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }
}
