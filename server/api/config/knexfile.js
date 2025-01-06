
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

const path = require('path');

const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, '../data/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, '../data/seeds'),
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    },
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: path.join(__dirname, '../data/friends.db3') },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: path.join(__dirname, '../data/testing.db3') },
  },
  production: {
    ...sharedConfig,
    connection: { filename: path.join(__dirname, '../data/friends.db3') },
  },
};
