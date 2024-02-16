import { select } from "../helpers/_dom";
import Swiper, { Navigation, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export default class CollectionsCarousel extends HTMLElement {
  constructor() {
    super();

    const $collectionSlider = select('[data-collections-carousel-slider]', this);
    const swiper = new Swiper($collectionSlider, {
      modules: [Navigation, Scrollbar],
      spaceBetween: 8,
      slidesPerView: "auto",
      loop: false,
      grabCursor: true,
      navigation: {
        nextEl: '[data-swiper-controls-next]',
        prevEl: '[data-swiper-controls-prev]',
      },
      scrollbar: {
        el: '[data-swiper-scrollbar]',
        draggable: true,
        dragSize: 100
      },
      breakpoints: {
        1292: {
          spaceBetween: 24,
          slidesPerView: 4,
          scrollbar: {
            dragSize: 303
          }
        },
        1024: {
          spaceBetween: 18,
          slidesPerView: "auto",
          scrollbar: {
            dragSize: 202
          }
        },
        768: {
          spaceBetween: 12,
          slidesPerView: "auto",
          scrollbar: {
            dragSize: 150
          }
        }
      }
    });
  }
}