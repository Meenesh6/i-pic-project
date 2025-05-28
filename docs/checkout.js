document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total-checkout').textContent = `Total: ₹${total}`;


  document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect user input
    const name = document.querySelector('input[name="name"]').value.trim();
    const address = document.querySelector('textarea[name="address"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();

    // Build order object
    const order = {
      name,
      address,
      email,
      cart,
      total
    };

    // Send order to backend
    fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const successMsg = document.getElementById('success-msg');
successMsg.style.display = 'block';

setTimeout(() => {
  successMsg.style.display = 'none';
}, 10000); // hide after 10 seconds


        localStorage.removeItem('cart');
        document.getElementById('checkout-form').reset();
        document.getElementById('total-checkout').textContent = 'Total: ₹0';

      } else {
        alert('Order failed. Please try again.');
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Server error. Please try again later.');
    });
  });
});
