
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

const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
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
    connection: { filename: './data/friends.db3' }, // SQLite for local dev
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/testing.db3' }, // SQLite for testing
  },
  production: {
    ...sharedConfig,
    client: 'pg', // Use PostgreSQL in production (Heroku)
    connection: process.env.DATABASE_URL || { // Use the DATABASE_URL set by Heroku
      host: 'localhost',
      user: 'your_user',
      password: 'your_password',
      database: 'your_database',
    },
  },
};

