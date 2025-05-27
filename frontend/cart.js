// iPic/frontend/cart.js

const cartContainer = document.getElementById('cart-items');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total').textContent = `Total: ₹${total}`;
}

function renderCart() {
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('total').textContent = 'Total: ₹0';
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <button data-index="${index}">Remove</button>
    `;

    const button = div.querySelector('button');
    button.addEventListener('click', () => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });

    cartContainer.appendChild(div);
  });

  updateTotal();
}

renderCart();

// Clear Cart button functionality
const clearCartBtn = document.getElementById('clear-cart');
if (clearCartBtn) {
  clearCartBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the cart?')) {
      localStorage.removeItem('cart');
      cart = [];
      renderCart();
    }
  });
}
