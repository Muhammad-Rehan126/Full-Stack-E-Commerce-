const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI
    || process.env.MONGODB_URI
    || process.env.MONGO_URL
    || process.env.MONGODB_URL
    || process.env.DATABASE_URL;

  if (!uri) {
    throw new Error('Set MONGO_URI (or MONGODB_URI) in the backend environment.');
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGO_DB_NAME || 'berry-store'
  });
  console.log('Connected to MongoDB');
}

module.exports = connectDB;
