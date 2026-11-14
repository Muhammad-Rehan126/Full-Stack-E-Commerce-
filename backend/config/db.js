const mongoose = require('mongoose');

let connectionPromise;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGO_URI
    || process.env.MONGODB_URI
    || process.env.MONGO_URL
    || process.env.MONGODB_URL
    || process.env.DATABASE_URL;

  if (!uri) {
    throw new Error('Set MONGO_URI or MONGODB_URI in the backend environment.');
  }

  connectionPromise = mongoose.connect(uri, {
    dbName: process.env.MONGO_DB_NAME || 'berry-store',
    serverSelectionTimeoutMS: 8000
  })
    .then(() => mongoose.connection)
    .catch((error) => {
      connectionPromise = undefined;
      throw error;
    });

  return connectionPromise;
}

module.exports = connectDB;
