import { select } from "../helpers/_dom";
import Swiper, { Navigation, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default class ProductsCarousel extends HTMLElement {
  constructor() {
    super();

    const $productsSlider = select("[data-products-carousel-slider]", this);
    const $prodCard = select("[data-pro-card]", this);

    $prodCard.listen("mouseover", ({ $node }) => {
      $node.modifyClass("add", "c-proCard--hover");
    });
    $prodCard.listen("mouseout", ({ $node }) => {
      $node.modifyClass("remove", "c-proCard--hover");
    });

    const swiper = new Swiper($productsSlider, {
      modules: [Navigation, Scrollbar],
      spaceBetween: 8,
      slidesPerView: "auto",
      loop: false,
      grabCursor: true,
      navigation: {
        nextEl: "[data-swiper-controls-next]",
        prevEl: "[data-swiper-controls-prev]",
      },
      scrollbar: {
        el: "[data-swiper-scrollbar]",
        draggable: true,
        dragSize: 100,
      },
      breakpoints: {
        1292: {
          spaceBetween: 24,
          slidesPerView: 4,
          scrollbar: {
            dragSize: 303,
          },
        },
        1024: {
          spaceBetween: 18,
          slidesPerView: "auto",
          scrollbar: {
            dragSize: 202,
          },
        },
        768: {
          spaceBetween: 12,
          slidesPerView: "auto",
          scrollbar: {
            dragSize: 150,
          },
        },
      },
    });
  }
}
