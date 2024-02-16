import { getData, postData } from './_api';

function informCartUpdated() {
  const event = new CustomEvent('cartUpdated');
  document.dispatchEvent(event);
}

export async function getCart() {
  const response = await getData('/cart.js');
  return response;
}

export async function addToCart(id, quantity) {
  const response = await postData('/cart/add.js', {
    items: [
      {
        id,
        quantity,
      },
    ],
  });
  informCartUpdated();
  return response;
}

export async function clearCart() {
  const response = await postData('/cart/clear.js');
  informCartUpdated();
  return response;
}
