// const express = require('express')
// const serverless = require('serverless-http');
// const app = express()
// const cors = require('cors')
// app.use(express.json())
// const userRouter = require('../server/api/users/user-router')
// const petRouter = require('../server/api/pets/pets-router')

// app.use(cors())

// app.use('/api' , userRouter)
// app.use('/api', petRouter)


// app.listen(9000 , () => {
//     console.log("server started on port 9000")
// })

// module.exports.handler = serverless(app)

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// Import your routers
const userRouter = require('./users/user-router');  // Adjust path
const petRouter = require('./pets/pets-router');    // Adjust path

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use routers for specific API routes
app.use('/api/users', userRouter);
app.use('/api/pets', petRouter);

// Export the app as a serverless function
module.exports.handler = serverless(app);
