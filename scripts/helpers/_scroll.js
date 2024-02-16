export function windowScroll(
  downCallback,
  upCallback,
  threshold = 0,
  continuous = true
) {
  let lastScrollTop = 0;

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const pastThreshold = scrollTop > threshold;
    const warrantsTrigger = continuous
      ? scrollTop > lastScrollTop && pastThreshold
      : pastThreshold;

    if (warrantsTrigger) {
      downCallback();
    } else {
      upCallback();
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener('load', handleScroll, false);
  window.addEventListener('scroll', handleScroll, false);
}
