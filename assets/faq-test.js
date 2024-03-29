
document.addEventListener('DOMContentLoaded', function () {
    // Code to be executed when the DOM is loaded
    const faqHeaders = document.querySelectorAll('[data-accordion-item-header]');
    faqHeaders.forEach(function (faqHeader) {
        faqHeader.addEventListener('click', function (event) {
            event.currentTarget.classList.toggle('c-faqsAccordion__header--active');
        });
    });
  
});