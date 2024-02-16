import Swiper, { Navigation, Controller, Thumbs, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/controller";
import { select } from "../helpers/_dom";

export default class ProductModalGallery extends HTMLElement {
  constructor() {
    super();

    Swiper.use([Navigation, Controller, Thumbs, Pagination]);

    const $sliderImg = select("[data-prod-gallery-img]", this);
    const $sliderThumbs = select("[data-prod-gallery-thumb]", this);

    let slider = new Swiper($sliderImg, {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      loopedSlides: 8,
      navigation: {
        nextEl: "[data-swiper-next]",
        prevEl: "[data-swiper-prev]",
      },
      pagination: {
        el: "[data-swiper-pagination]",
        type: "fraction",
      },
    });
    let thumbs = new Swiper($sliderThumbs, {
      slidesPerView: 8,
      loopedSlides: 8,
      spaceBetween: 5,
      centeredSlides: true,
      loop: true,
      slideToClickedSlide: true,
    });

    slider.controller.control = thumbs;
    thumbs.controller.control = slider;
  }
}
