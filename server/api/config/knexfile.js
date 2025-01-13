
// const sharedConfig = {
//   client: 'sqlite3',
//   useNullAsDefault: true,
//   migrations: {
//     directory: './data/migrations',
//   },
//   seeds: {
//     directory: './data/seeds',
//   },
  
//   pool: {
//     afterCreate: (conn, done) => {
//       conn.run('PRAGMA foreign_keys = ON', done)
//     },
//   },
// }

// module.exports = {
//   development: {
//     ...sharedConfig,
//     connection: { filename: './data/friends.db3' },
//   },
//   testing: {
//     ...sharedConfig,
//     connection: { filename: './data/testing.db3' },
//   },
// }

// const path = require('path');

// const sharedConfig = {
//   client: 'sqlite3',
//   useNullAsDefault: true,
//   migrations: {
//     directory: path.join(__dirname, '../../data/migrations'), // Corrected path for migrations
//   },
//   seeds: {
//     directory: path.join(__dirname, '../../data/seeds'), // Corrected path for seeds
//   },
//   pool: {
//     afterCreate: (conn, done) => {
//       conn.run('PRAGMA foreign_keys = ON', done);
//     },
//   },
// };

// module.exports = {
//   development: {
//     ...sharedConfig,
//     connection: { filename: path.join(__dirname, '../../data/friends.db3') }, // Corrected path for DB
//   },
//   testing: {
//     ...sharedConfig,
//     connection: { filename: path.join(__dirname, '../../data/testing.db3') }, // Corrected path for testing DB
//   },
// };


const path = require('path');

const sharedConfig = {
  client: process.env.NODE_ENV === 'production' ? 'pg' : 'sqlite3',  // Switch client based on environment
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, '../../data/migrations'), // Corrected path for migrations
  },
  seeds: {
    directory: path.join(__dirname, '../../data/seeds'), // Corrected path for seeds
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done); // This only works with SQLite
    },
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: path.join(__dirname, '../../data/friends.db3') }, // SQLite path for local dev
  },
  testing: {
    ...sharedConfig,
    connection: { filename: path.join(__dirname, '../../data/testing.db3') }, // SQLite path for testing
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL, // Use Heroku's DATABASE_URL environment variable for PostgreSQL
  },
};
