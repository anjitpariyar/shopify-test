import { select } from '../helpers/_dom';

export default class SetAddToCart extends HTMLElement {
  constructor() {
    super();

    this.submitButton = select('[data-set-submit]',this);
    this.submitButton.listen('click', this.onSubmitHandler.bind(this));
    this.inputs = select('[name="quantity"]');
    this.cart = select('[data-cart-drawer]');
  }

  onSubmitHandler(evt) {
    if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
    this.submitButton.setAttribute('aria-disabled', true);
    this.submitButton.classList.add('loading');

    let items = [];
    this.inputs.forEach((el) => {
      if(el.value > 0){
        let item = {
          id: el.dataset.id,
          quantity : el.value
        }
        items.push(item);
      }
    })
    let res;
    if (items.length > 0){
      const data = {
        items,
        sections: ['cart-drawer', 'cart-icon-bubble'],
      };
      res = fetch('/cart/add.js', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((response) => {
        this.submitButton.classList.remove('loading');
        this.submitButton.removeAttribute('aria-disabled');            
        if (this.cart) {
          this.cart.modifyClass('remove', 'is-empty');
          this.cart.modifyClass('add', 'animate');
          this.cart.modifyClass('add', 'active');
          this.cart.renderContents(response);
          setTimeout(function() {
            document.body.classList.remove('overflow-hidden');
        }, 1000);
        }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    }
    return res;
  }
}