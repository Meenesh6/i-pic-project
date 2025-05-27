fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('product-list');

    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button>Add to Cart</button>
      `;
      
      // Add to Cart functionality
      const button = div.querySelector('button');
      button.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
      });

      container.appendChild(div);
    });
  })
  .catch(err => console.error('Failed to fetch products:', err));
