require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: "Premium Laptop",
    description: "High-performance laptop with 16GB RAM and 512GB SSD",
    price: 1299.99,
    category: "Electronics"
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with 30-hour battery life",
    price: 199.99,
    category: "Electronics"
  },
  {
    name: "Smart Watch",
    description: "Fitness tracker and smartwatch with heart rate monitor",
    price: 249.99,
    category: "Electronics"
  },
  {
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe",
    price: 89.99,
    category: "Home"
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat with carrying strap",
    price: 29.99,
    category: "Fitness"
  },
  {
    name: "Blender",
    description: "High-speed blender for smoothies and food processing",
    price: 79.99,
    category: "Home"
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned soles",
    price: 119.99,
    category: "Fitness"
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    price: 39.99,
    category: "Home"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const products = await Product.insertMany(sampleProducts);
    console.log('Added sample products:', products.length);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 