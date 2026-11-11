const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  {
    name: 'T-shirt with Tape Details',
    sku: 'SHOPCO-NEW-001',
    category: 'T-shirts',
    stock: 24,
    price: 120,
    status: 'Active',
    img: '/products/img-1.png',
    oldPrice: 150,
    discount: '-20%',
    rating: 'New',
    homepageSection: 'new-arrival',
    color: 'black',
    style: 'Casual'
  },
  {
    name: 'Skinny Fit Jeans',
    sku: 'SHOPCO-NEW-002',
    category: 'Jeans',
    stock: 18,
    price: 240,
    status: 'Active',
    img: '/products/img-2.png',
    oldPrice: 260,
    discount: '-8%',
    rating: 'New',
    homepageSection: 'new-arrival',
    color: 'blue',
    style: 'Casual'
  },
  {
    name: 'Checkered Shirt',
    sku: 'SHOPCO-NEW-003',
    category: 'Shirts',
    stock: 16,
    price: 180,
    status: 'Active',
    img: '/products/img-3.png',
    rating: 'New',
    homepageSection: 'new-arrival',
    color: 'green',
    style: 'Casual'
  },
  {
    name: 'Sleeve Striped T-shirt',
    sku: 'SHOPCO-NEW-004',
    category: 'T-shirts',
    stock: 22,
    price: 130,
    status: 'Active',
    img: '/products/img-4.png',
    oldPrice: 160,
    discount: '-19%',
    rating: 'New',
    homepageSection: 'new-arrival',
    color: 'orange',
    style: 'Casual'
  },
  {
    name: 'Vertical Striped Shirt',
    sku: 'SHOPCO-TOP-001',
    category: 'Shirts',
    stock: 30,
    price: 212,
    status: 'Active',
    img: '/products/img-27.png',
    oldPrice: 232,
    discount: '-9%',
    rating: 'New',
    homepageSection: 'top-selling',
    color: 'green',
    style: 'Party'
  },
  {
    name: 'Courage Graphic T-shirt',
    sku: 'SHOPCO-TOP-002',
    category: 'T-shirts',
    stock: 27,
    price: 145,
    status: 'Active',
    img: '/products/img-28.png',
    rating: 'New',
    homepageSection: 'top-selling',
    color: 'orange',
    style: 'Casual'
  },
  {
    name: 'Loose Fit Bermuda Shorts',
    sku: 'SHOPCO-TOP-003',
    category: 'Shorts',
    stock: 20,
    price: 80,
    status: 'Active',
    img: '/products/img-29.png',
    rating: 'New',
    homepageSection: 'top-selling',
    color: 'blue',
    style: 'Casual'
  },
  {
    name: 'Faded Skinny Jeans',
    sku: 'SHOPCO-TOP-004',
    category: 'Jeans',
    stock: 14,
    price: 210,
    status: 'Active',
    img: '/products/img-32.png',
    rating: 'New',
    homepageSection: 'top-selling',
    color: 'blue',
    style: 'Casual'
  }
];

async function seedProducts() {
  try {
    await connectDB();
    const result = await Product.bulkWrite(products.map((product) => ({
      updateOne: {
        filter: { sku: product.sku },
        update: { $setOnInsert: { ...product, image: product.img } },
        upsert: true
      }
    })));
    const ratingsUpdated = await Product.updateMany({
      sku: { $in: products.map((product) => product.sku) },
      rating: { $in: ['4.5/5', '4.0/5', '5.0/5'] },
      'reviews.0': { $exists: false }
    }, { $set: { rating: 'New' } });

    console.log(`Catalog ready: ${result.upsertedCount} products added, ${ratingsUpdated.modifiedCount} placeholder ratings cleared.`);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts().catch((error) => {
  console.error(`Unable to seed starter products: ${error.message}`);
  process.exitCode = 1;
});
