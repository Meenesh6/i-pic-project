const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // To serve product images

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Mongoose Order model
const Order = require('./models/Order');

// 🛍 Product data
const products = [
  { id: 1, name: "iPic T-Shirt", price: 499, image: "images/tshirt.jpg" },
  { id: 2, name: "iPic Mug", price: 299, image: "images/mug.jpg" },
  { id: 3, name: "iPic Hoodie", price: 999, image: "images/hoodie.jpg" },
  { id: 4, name: "iPic Cap", price: 199, image: "images/cap.jpg" },
  { id: 5, name: "iPic Bag", price: 799, image: "images/bag.jpg" },
  { id: 6, name: "iPic Water Bottle", price: 249, image: "images/bottle.jpg" },
  { id: 7, name: "iPic Notebook", price: 149, image: "images/notebook.jpg" },
  { id: 8, name: "iPic Phone Cover", price: 399, image: "images/phonecover.jpg" },
  { id: 9, name: "iPic Sunglasses", price: 699, image: "images/sunglasses.jpg" },
  { id: 10, name: "iPic Watch", price: 1299, image: "images/watch.jpg" },
  { id: 11, name: "iPic Keychain", price: 99, image: "images/keychain.jpg" },
  { id: 12, name: "iPic Sticker Pack", price: 59, image: "images/stickers.jpg" },
  { id: 13, name: "iPic Mouse Pad", price: 199, image: "images/mousepad.jpg" },
  { id: 14, name: "iPic Pen Set", price: 129, image: "images/penset.jpg" },
  { id: 15, name: "iPic Desk Lamp", price: 899, image: "images/desklamp.jpg" },
  { id: 16, name: "iPic Phone Stand", price: 349, image: "images/phonestand.jpg" },
  { id: 17, name: "iPic Tote Bag", price: 449, image: "images/totebag.jpg" },
  { id: 18, name: "iPic Earphones", price: 1499, image: "images/earphones.jpg" },
  { id: 19, name: "iPic Charging Cable", price: 199, image: "images/cable.jpg" },
  { id: 20, name: "iPic Laptop Sleeve", price: 999, image: "images/sleeve.jpg" }
];

// GET: All products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// POST: Save new order in MongoDB
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      placedAt: new Date()
    });
    await newOrder.save();
    res.json({ success: true, message: '✅ Order saved to MongoDB!' });
  } catch (err) {
    console.error("❌ Failed to save order:", err);
    res.status(500).json({ success: false, message: '❌ Failed to save order' });
  }
});

// GET: All orders from MongoDB
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ placedAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    res.status(500).json({ message: '❌ Could not retrieve orders' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
