import { select } from "../helpers/_dom";

export default class StickyElement extends HTMLElement {
  constructor() {
    super();
    const stickyElement = select("[data-sticky-scroll]", this);
    const collectionHero = select("[data-grid-header]");
    const totalScrollValue = ( collectionHero.offsetHeight + 53 + 80 + 45 ) - 100;
    const tabsWrapper = select("[data-factes-nav]");
    
    window.addEventListener("scroll", function () {
      if (window.scrollY > totalScrollValue) {
        stickyElement.modifyClass("add", "c-facets__aside--sticky");
        document.body.classList.add('sticky-element-active');
      } else {
        stickyElement.modifyClass("remove", "c-facets__aside--sticky");
        document.body.classList.remove('sticky-element-active');
      }
    });

    window.addEventListener('resize', ()=> {
      checkOverflow();
    });

    checkOverflow();

    tabsWrapper.addEventListener('scroll',()=>{
      if (tabsWrapper.scrollLeft >= (tabsWrapper.scrollWidth - tabsWrapper.clientWidth)) {
        tabsWrapper.modifyClass('add', 'c-collectionNav__has-scroll--end');
      }else {
        tabsWrapper.modifyClass('remove', 'c-collectionNav__has-scroll--end');
      }
    });

    function checkOverflow() {
      if(tabsWrapper.scrollWidth > tabsWrapper.clientWidth) {
        tabsWrapper.modifyClass('add', 'c-collectionNav__has-scroll');
      }else {
        tabsWrapper.modifyClass('remove', 'c-collectionNav__has-scroll');
      }
    }
  }
}
