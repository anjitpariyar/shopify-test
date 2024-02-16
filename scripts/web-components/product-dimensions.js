import { select } from '../helpers/_dom';

export default class ProductDimensions extends HTMLElement {
  constructor() {
    super();
    const heightButtons = select('[data-height]');
    const depthtButtons = select('[data-depth]');

    function onProductChange() {
      let selectedHeight = select('[data-current-height]').getAttribute('data-height');
      let selectedDepth = select('[data-current-depth]').getAttribute('data-depth');
      let selectedDimension = `${selectedHeight}-${selectedDepth}`;  
      let currentDimension = select(`[data-dimension="${selectedDimension}"]`);
      if(currentDimension !== null) {
        let currentUrl =  currentDimension.getAttribute('href');
        let selectedOptionsList = select('[data-variants]');
        function getVariantValueFromURL() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const variantValue = urlParams.get('variant');
            if (variantValue && variantValue.trim() !== '') {
                return variantValue.trim();
            } else {
                return null;
            }
        }
        const variantValue = getVariantValueFromURL();
        fetch(currentUrl)
        .then((response) => response.text())
        .then((responseText) => {
          window.history.replaceState(null, null, currentUrl);
          const responseHTML = new DOMParser().parseFromString(responseText, 'text/html');
          const mainProduct = document.querySelector('[data-product-details]');
          mainProduct.innerHTML = responseHTML.querySelector('[data-product-details]').innerHTML;
          if (variantValue !== null) {    
            const { selectedOption1, selectedOption2, selectedOption3 } = selectedOptionsList.querySelector(`option[value='${variantValue}']`).dataset;
            let dataoption1 = select('[data-option1]');
            let dataoption2 = select('[data-option2]');
            let dataoption3 = select('[data-option3]');
            dataoption1.querySelector(`input[value="${selectedOption1}"]`).click();
            dataoption2.querySelector(`input[value="${selectedOption2}"]`).click();
            dataoption3.querySelector(`input[value="${selectedOption3}"]`).click();
          }

        })
        .finally(() => {
          
        });
      }      
    }

    heightButtons.listen('click',({$node}) =>{
      heightButtons.modifyClass('remove','c-radioInputLabel--dimension-selected');
      heightButtons.execute($button => $button.removeAttribute('data-current-height'));
      $node.modifyClass('add','c-radioInputLabel--dimension-selected');
      $node.setAttribute('data-current-height', true);
      onProductChange();
    });

    depthtButtons.listen('click',({$node}) =>{
      depthtButtons.modifyClass('remove','c-radioInputLabel--dimension-selected');
      depthtButtons.execute($button => $button.removeAttribute('data-current-depth'));
      $node.modifyClass('add','c-radioInputLabel--dimension-selected');
      $node.setAttribute('data-current-depth', true);
      onProductChange();
    });

  }
}