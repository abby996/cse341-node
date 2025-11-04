const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  if (!process.env.MONGODB_URI) {
    const error = new Error('MONGODB_URI is not defined in environment variables');
    console.error('❌', error.message);
    return callback(error);
  }

  console.log('🔗 Connecting to MongoDB Atlas...');
  
  // SUPPRIMER les options dépréciées
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      console.log(' Successfully connected to MongoDB Atlas');
      console.log(' Database:', client.db().databaseName);
      callback(null, _db);
    })
    .catch((err) => {
      console.error('❌ Failed to connect to MongoDB Atlas:', err.message);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized. Please call initDb first.');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};