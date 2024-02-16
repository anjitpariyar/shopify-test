import Swiper, {
  Navigation,
  Controller,
  Thumbs,
  Pagination,
  Scrollbar,
  Zoom,
  Keyboard,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/controller";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import { select } from "../helpers/_dom";

export default class ModalComponent extends HTMLElement {
  constructor() {
    super();

    Swiper.use([
      Scrollbar,
      Navigation,
      Controller,
      Thumbs,
      Pagination,
      Zoom,
      Keyboard,
    ]);

    let modal = select("[data-modal-slider]", this);
    let modalBtn = document.querySelectorAll(".c-modalSlider-btn");
    let closeBtn = select("[data-modal-close-btn", this);

    modalBtn.forEach(function (e) {
      e.addEventListener("click", openModal);
    });

    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", outsideClick);

    function openModal(e) {
      let selectedVariant = getSelectedVariant();
      let slidePosition = e.currentTarget.dataset.position;

      let productMediaGallery = select("[data-modal-product-media-gallery]");
      let productMediaThumbs = select("[data-modal-product-media-thumbs]");

      if (selectedVariant && productMediaGallery && productMediaThumbs) {
        productMediaGallery.forEach(function (element) {
          if (element.dataset.variantTitle != selectedVariant) {
            element.classList.remove("swiper-slide");
          } else {
            element.classList.add("swiper-slide");
          }
        });

        productMediaThumbs.forEach(function (element) {
          if (element.dataset.variantTitle != selectedVariant) {
            element.classList.remove("swiper-slide");
          } else {
            element.classList.add("swiper-slide");
          }
        });
      }

      initializeSwiper(slidePosition);

      modal.style.display = "block";
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function outsideClick(e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    }

    function initializeSwiper(slidePosition = 0) {
      let sliderImg = select("[data-prod-gallery-img]", this);
      let sliderThumbs = select("[data-prod-gallery-thumb]", this);

      let thumbs = new Swiper(sliderThumbs, {
        slidesPerView: 10,
        loopedSlides: 8,
        centeredSlides: true,
        slideToClickedSlide: true,
        observer: true,
        init: false,
      });

      let slider = new Swiper(sliderImg, {
        zoom: true,
        slidesPerView: 1,
        centeredSlides: true,
        loopedSlides: 8,
        navigation: {
          nextEl: "[data-swiper-next]",
          prevEl: "[data-swiper-prev]",
        },
        pagination: {
          el: "[data-swiper-pagination]",
          type: "fraction",
        },
        keyboard: {
          enabled: true,
        },
        observer: true,
        thumbs: {
          swiper: thumbs,
        },
        init: false,
      });

      thumbs.on("init", function () {
        thumbs.slideTo(slidePosition, 0, false);
      });

      slider.on("init", function () {
        slider.slideTo(slidePosition, 0, false);
        slider.controller.control = thumbs;
      });

      thumbs.init();
      slider.init();

      window.modalSliderThumbs = thumbs;
      window.modalSlider = slider;
    }

    function getSelectedVariant() {
      let emptyVariantTitleFlag = true;
      let imgAlt = "";
      let currentVariant = null;
      let selectedVariant = "";
      let sanitizedSelectedVariant = "";
      let prodDataEle = select("[data-prod-json-data]", this);
      let productMediaGallery = select(
        "[data-modal-product-media-gallery]",
        this
      );

      if (prodDataEle) {
        currentVariant = JSON.parse(prodDataEle.innerHTML);
      }
      if (currentVariant != null && currentVariant.featured_media) {
        imgAlt = currentVariant.featured_media.alt;
      }

      if (productMediaGallery && productMediaGallery.dataset) {
        let title = productMediaGallery.dataset.variantTitle;

        if (!title) {
          emptyVariantTitleFlag = false;
        }
      } else {
        productMediaGallery.forEach(function (element) {
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
      }

      return sanitizedSelectedVariant;
    }

    function updateSwiper() {
      window.modalSlider.update();
      window.modalSliderThumbs.update();
    }
  }
}
