const products = [
  { id: 1, name: "T-Shirt", price: 499, image: "images/tshirt.jpg" },
  { id: 2, name: "Mug", price: 299, image: "images/mug.jpg" },
  { id: 3, name: "Hoodie", price: 999, image: "images/hoodie.jpg" },
  { id: 4, name: "Cap", price: 199, image: "images/cap.jpg" },
  { id: 5, name: "Bag", price: 799, image: "images/bag.jpg" },
  { id: 6, name: "Water Bottle", price: 249, image: "images/bottle.jpg" },
  { id: 7, name: "Notebook", price: 149, image: "images/notebook.jpg" },
  { id: 8, name: "Phone Cover", price: 399, image: "images/phonecover.jpg" },
  { id: 9, name: "Sunglasses", price: 699, image: "images/sunglasses.jpg" },
  { id: 10, name: "Watch", price: 1299, image: "images/watch.jpg" },
  { id: 11, name: "Keychain", price: 99, image: "images/keychain.jpg" },
  { id: 12, name: "Sticker Pack", price: 59, image: "images/stickers.jpg" },
  { id: 13, name: "Mouse Pad", price: 199, image: "images/mousepad.jpg" },
  { id: 14, name: "Pen Set", price: 129, image: "images/penset.jpg" },
  { id: 15, name: "Desk Lamp", price: 899, image: "images/desklamp.jpg" },
  { id: 16, name: "Phone Stand", price: 349, image: "images/phonestand.jpg" },
  { id: 17, name: "Tote Bag", price: 449, image: "images/totebag.jpg" },
  { id: 18, name: "Earphones", price: 1499, image: "images/earphones.jpg" },
  { id: 19, name: "Charging Cable", price: 199, image: "images/cable.jpg" },
  { id: 20, name: "Laptop Sleeve", price: 999, image: "images/sleeve.jpg" }
];

// Update cart count in navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function loadProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
    `;

    // Create styled "Add to Cart" button
    const button = document.createElement('button');
    button.classList.add('add-to-cart-btn');  // use colorful style
    button.textContent = '🛒 Add to Cart';
    button.addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`${product.name} added to cart!`);
    });

    div.appendChild(button);
    productList.appendChild(div);
  });
}

loadProducts();
updateCartCount();
