import "@styles/elva.scss";
import ExampleComponent from "./web-components/example-component";
import ExampleExtended from "./web-components/example-extended";
import AnnouncementBar from "./web-components/announcement-component";
import MainHeader from "./web-components/main-header";
import CollapsibleItem from "./web-components/collapsible-component";
import TestimonialsItem from "./web-components/testimonials-component";
import CollapsibleTextSec from "./web-components/collapsible-text-block-component";
import ToggleVideo from "./web-components/toggle-play-pause";
import CollectionsCarousel from "./web-components/collections-carousel";
import FrequentQuestions from "./web-components/frequent-questions";
import ProductsCarousel from "./web-components/products-carousel";
import ArticlesCarousel from "./web-components/articles-carousel";
import ToggleSearch from "./web-components/toggle-search";
import CollapsibleSpecs from "./web-components/collapsible-specifications-component";
import CollapsibleItemWithSlider from "./web-components/collapsible-slider-component";
import VariantSet from "./web-components/variant-set";
import SetAddToCart from "./web-components/set-add-to-cart";
import ToggleNotify from "./web-components/toggle-notify";
import QuantityDropDown from "./web-components/quantitiy-dropdown";
import ProductMediaSlider from "./web-components/product-media-slider";
import ProductMediaGallery from "./web-components/product-media-gallery";
import CollapsibleFilter from "./web-components/collapsible-filter";
import StickyElement from "./web-components/sticky-element";
import ProductDetails from "./web-components/product-details";
import CollapsibleReviews from "./web-components/collapsible-reviews-component";
import ProductModalGallery from "./web-components/product-modal-gallery";
import DescriptionToggle from "./web-components/description-toggle";
import BreadPay from "./web-components/breadpay-component";
import ProductDemensions from "./web-components/product-dimensions";
import ModalComponent from "./web-components/modal-component";
import Mulberry from "./web-components/mulberry-component";

(async () => {
  customElements.define("example-component", ExampleComponent);
  customElements.define("example-extended", ExampleExtended);
  customElements.define("announcement-component", AnnouncementBar);
  customElements.define("main-header", MainHeader);
  customElements.define("collapsible-component", CollapsibleItem);
  customElements.define("testimonials-component", TestimonialsItem);
  customElements.define("collapsible-text-block-component", CollapsibleTextSec);
  customElements.define("collections-carousel", CollectionsCarousel);
  customElements.define("toggle-video", ToggleVideo);
  customElements.define("frequent-questions", FrequentQuestions);
  customElements.define("products-carousel", ProductsCarousel);
  customElements.define("articles-carousel", ArticlesCarousel);
  customElements.define("toggle-search", ToggleSearch);
  customElements.define("variant-set", VariantSet);
  customElements.define("set-add-to-cart", SetAddToCart);
  customElements.define("toggle-notify", ToggleNotify);
  customElements.define("quantity-dropdown", QuantityDropDown);
  customElements.define(
    "collapsible-specifications-component",
    CollapsibleSpecs
  );
  customElements.define(
    "collapsible-slider-component",
    CollapsibleItemWithSlider
  );
  customElements.define("media-slider-component", ProductMediaSlider);
  customElements.define("media-gallery-component", ProductMediaGallery);
  customElements.define("collapsible-filter", CollapsibleFilter);
  customElements.define("sticky-element", StickyElement);
  customElements.define("product-details-component", ProductDetails);
  customElements.define("collapsible-reviews-component", CollapsibleReviews);
  customElements.define("product-modal-gallery", ProductModalGallery);
  customElements.define("description-toggle", DescriptionToggle);
  customElements.define("breadpay-snippet", BreadPay);
  customElements.define("product-dimensions", ProductDemensions);
  customElements.define("modal-component", ModalComponent);
  customElements.define("mulberry-snippet", Mulberry);
})();
