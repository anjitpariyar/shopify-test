import Swiper, { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { select } from '../helpers/_dom';
export default class AnnouncementBar extends HTMLElement {
  constructor() {
    super();

    const $slider = select('[data-announcement-slider]', this);
    const swiper = new Swiper($slider, {
      modules: [Navigation, Autoplay],
      slidesPerView: "auto",
      loop: true,
      speed: 800,
      autoplay: { 
        delay: 4000,
      },  
      navigation: {
        nextEl: '[data-btn-next]',
        prevEl: '[data-btn-prev]',
      },
    });
  }
}