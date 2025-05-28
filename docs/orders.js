fetch('https://i-pic-backend.onrender.com/api/products')
  .then(res => res.json())
  .then(orders => {
    const ordersList = document.getElementById('orders-list');
    if (orders.length === 0) {
      ordersList.innerHTML = '<p>No orders found.</p>';
      return;
    }

    orders.forEach(order => {
      const div = document.createElement('div');
      div.classList.add('order');

      div.innerHTML = `
        <h3>Order by: ${order.name}</h3>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Total:</strong> ₹${order.total}</p>
        <p><strong>Date:</strong> ${new Date(order.placedAt).toLocaleString()}</p>
        <ul>
          ${order.cart.map(item => `<li>${item.name} - ₹${item.price}</li>`).join('')}
        </ul>
        <hr/>
      `;
      ordersList.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Error loading orders:', err);
    document.getElementById('orders-list').innerHTML = '<p>Error loading orders.</p>';
  });
