import Swiper, {
  Navigation,
  Controller,
  Thumbs,
  Pagination,
  Scrollbar,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/controller";
import "swiper/css/scrollbar";
import { select } from "../helpers/_dom";

export default class ProductMediaSlider extends HTMLElement {
  constructor() {
    super();

    Swiper.use([Scrollbar, Navigation, Controller, Thumbs, Pagination]);

    let selectedVariant = getSelectedVariant();

    let productMediaGallery = select("[data-product-media-gallery-mobile]");
    let mediaPrintCount = 0;

    if (selectedVariant && productMediaGallery) {
      productMediaGallery.forEach(function (element) {
        if (element.dataset.variantMobile != selectedVariant) {
          element.classList.remove("swiper-slide");
        } else {
          element.classList.add("swiper-slide");
          element.dataset.position = mediaPrintCount;
          mediaPrintCount++;
        }
      });
    }

    initializeSwiper();

    function initializeSwiper() {
      let productImageSlider = select("[data-product-media-slider]", this);
      let imageSwiper = new Swiper(productImageSlider, {
        slidesPerView: 1,
        speed: 800,
        scrollbar: {
          el: "[data-swiper-scrollbar]",
          draggable: true,
          dragSize: 100,
        },
      });

      window.mobileMediaSlider = imageSwiper;
    }

    function getSelectedVariant() {
      let emptyVariantTitleFlag = true;
      let imgAlt = "";
      let currentVariant = null;
      let selectedVariant = "";
      let sanitizedSelectedVariant = "";
      let prodDataEle = select("[data-prod-json-data]", this);
      let productMediaGalleryMobile = select(
        "[data-product-media-gallery-mobile]",
        this
      );

      if (prodDataEle) {
        currentVariant = JSON.parse(prodDataEle.innerHTML);
      }
      if (currentVariant != null && currentVariant.featured_media) {
        imgAlt = currentVariant.featured_media.alt;
      }

      if (productMediaGalleryMobile && productMediaGalleryMobile.dataset) {
        let title = productMediaGalleryMobile.dataset.variantMobile;

        if (!title) {
          emptyVariantTitleFlag = false;
        }
      } else {
        productMediaGalleryMobile.forEach(function (element) {
          let title = element.dataset.variantMobile;

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
      }

      return sanitizedSelectedVariant;
    }
  }
}
