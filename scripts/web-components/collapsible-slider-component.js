import Swiper, { Navigation, Scrollbar, Controller } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/controller";
import { select } from "../helpers/_dom";

export default class CollapsibleItemWithSlider extends HTMLElement {
  constructor() {
    super();

    Swiper.use([Navigation, Controller, Scrollbar]);

    this.buttons = select("[data-collapsible-slider-section-header]", this);

    this.buttons.listen("click", ({ $node }) => {
      $node.modifyClass("toggle", "c-collapsibleSlider__header--active");
    });

    const $sliderText = select("[data-collapsible-slider-text]", this);
    const $sliderImg = select("[data-collapsible-slider-image]", this);
    let textSwiper = null;
    let imageSwiper = null;

    textSwiper = new Swiper($sliderText, {
      slidesPerView: "auto",
      speed: 800,
      navigation: {
        nextEl: "[data-swiper-controls-next]",
        prevEl: "[data-swiper-controls-prev]",
      },
      scrollbar: {
        el: "[data-swiper-scrollbar]",
        draggable: true,
        dragSize: 200,
      },
      breakpoints: {
        375: {
          spaceBetween: 16,
        },
      },
    });

    imageSwiper = new Swiper($sliderImg, {
      modules: [Navigation, Scrollbar],
      speed: 800,
      spaceBetween: 16,
      thumbs: {
        swiper: textSwiper,
      },
      breakpoints: {
        1440: {
          spaceBetween: 24,
          slidesPerView: "1.5",
        },
        375: {
          spaceBetween: 16,
          slidesPerView: "auto",
        },
      },
    });

    imageSwiper.controller.control = textSwiper;
    textSwiper.controller.control = imageSwiper;
  }
}
