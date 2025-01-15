const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Shared configuration for migrations and seeds
const sharedConfig = {
  migrations: {
    directory: path.join(__dirname, './data/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, './data/seeds'),
  },
};

module.exports = {
  // Development configuration (SQLite3)
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3', // Path to SQLite3 database file
    },
    ...sharedConfig,
    useNullAsDefault: true,
  },
  // Production configuration (PostgreSQL)
  production: {
    client: 'pg', // PostgreSQL client
    connection: {
      connectionString: process.env.DATABASE_URL, // Use DATABASE_URL
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Enable SSL for Heroku
    },
    ...sharedConfig,
  },
};







