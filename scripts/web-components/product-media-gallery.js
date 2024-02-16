import { select } from "../helpers/_dom";

export default class ProductMediaGallery extends HTMLElement {
  constructor() {
    super();

    let hiddenMedia = select("[data-hidden-media]", this);

    let showMoreBtn = select("[data-show-hidden-media-btn]", this);
    showMoreBtn.listen("click", showMore.bind(this));

    let showLessBtn = select("[data-hide-shown-media-btn]", this);
    showLessBtn.listen("click", showLess.bind(this));

    let variantTitle = document.querySelectorAll("[data-variant-title]", this);
    let productMedia = select("[data-product-media]", this);
    let emptyVariantTitleFlag = true;
    let imgAlt = "";
    let currentVariant = null;
    let selectedVariant = "";
    let sanitizedSelectedVariant = "";
    let thumbnailSelector = "";

    let prodDataEle = select("[data-prod-json-data]", this);

    if (prodDataEle) {
      currentVariant = JSON.parse(prodDataEle.innerHTML);
    }

    if (currentVariant != null && currentVariant.featured_media) {
      imgAlt = currentVariant.featured_media.alt;
    }

    if (productMedia && productMedia.dataset) {
      let title = productMedia.dataset.variantTitle;

      if (!title) {
        emptyVariantTitleFlag = false;
      }
    } else {
      productMedia.forEach(function (element) {
        let title = element.dataset.variantTitle;

        if (!title) {
          emptyVariantTitleFlag = false;
        }
      });
    }

    if (imgAlt != "" && emptyVariantTitleFlag) {
      selectedVariant = imgAlt.split("| ")[1];

      sanitizedSelectedVariant = selectedVariant
        .trim()
        .replace(/ /g, "_")
        .replace(/&quot;/g, "")
        .replace('"', "")
        .replace('"', "")
        .replace(/\//g, "");

      thumbnailSelector = '[data-variant="' + sanitizedSelectedVariant + '"]';

      let mediaPrintCount = 0;
      document.querySelectorAll(thumbnailSelector).forEach(function (element) {
        if (sanitizedSelectedVariant == element.dataset.variant) {
          if (mediaPrintCount <= 5) {
            element.modifyClass("remove", "c-hiddenMedia");
            element.dataset.position = mediaPrintCount;
            mediaPrintCount++;
          } else {
            element.dataset.position = mediaPrintCount;
            mediaPrintCount++;
          }
        }
      });
      if (productMedia.length > 6) {
        showMoreBtn.modifyClass("remove", "c-showMoreBtn");
      }
    } else {
      if (productMedia && productMedia.dataset) {
        productMedia.modifyClass("remove", "c-hiddenMedia");
      } else {
        productMedia.forEach(function (element, index) {
          if (index < 6) {
            element.modifyClass("remove", "c-hiddenMedia");
          }
        });
        if (productMedia.length > 6) {
          showMoreBtn.modifyClass("remove", "c-showMoreBtn");
        }
      }
    }

    function getSelectedVariant() {
      let emptyVariantTitleFlag = true;
      let imgAlt = "";
      let currentVariant = null;
      let selectedVariant = "";
      let sanitizedSelectedVariant = "";
      let prodDataEle = select("[data-prod-json-data]", this);
      let productMedia = select("[data-product-media]", this);

      if (prodDataEle) {
        currentVariant = JSON.parse(prodDataEle.innerHTML);
      }

      if (productMedia && productMedia.dataset) {
        let title = productMedia.dataset.variantTitle;

        if (!title) {
          emptyVariantTitleFlag = false;
        }
      } else {
        productMedia.forEach(function (element) {
          let title = element.dataset.variantTitle;

          if (!title) {
            emptyVariantTitleFlag = false;
          }
        });
      }

      if (currentVariant != null && currentVariant.featured_media) {
        imgAlt = currentVariant.featured_media.alt;
      }

      if (imgAlt != "" && emptyVariantTitleFlag) {
        selectedVariant = imgAlt.split("| ")[1];

        sanitizedSelectedVariant = selectedVariant
          .trim()
          .replace(/ /g, "_")
          .replace(/&quot;/g, "")
          .replace('"', "")
          .replace('"', "")
          .replace(/\//g, "");
      }

      return sanitizedSelectedVariant;
    }

    function showMore() {
      let updatedSelectedVariant = getSelectedVariant();

      productMedia.forEach(function (element) {
        if (updatedSelectedVariant != "") {
          if (updatedSelectedVariant == element.dataset.variantTitle) {
            element.modifyClass("remove", "c-hiddenMedia");
          }
        } else {
          element.modifyClass("remove", "c-hiddenMedia");
        }
      });
      showMoreBtn.modifyClass("add", "c-showMoreBtn");
      showLessBtn.modifyClass("remove", "c-showLessBtn");
    }

    function showLess() {
      let updatedSelectedVariant = getSelectedVariant();
      let mediaPrintCount = 1;
      productMedia.forEach(function (element) {
        if (updatedSelectedVariant != "") {
          if (updatedSelectedVariant == element.dataset.variantTitle) {
            if (mediaPrintCount <= 6) {
              mediaPrintCount++;
            } else {
              element.modifyClass("add", "c-hiddenMedia");
            }
          }
        } else {
          if (mediaPrintCount <= 6) {
            mediaPrintCount++;
          } else {
            element.modifyClass("add", "c-hiddenMedia");
          }
        }
      });
      showMoreBtn.modifyClass("remove", "c-showMoreBtn");
      showLessBtn.modifyClass("add", "c-showLessBtn");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}
