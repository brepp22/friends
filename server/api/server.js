// const express = require('express')
// const serverless = require('serverless-http');
// const app = express()
// const cors = require('cors')
// app.use(express.json())
// const userRouter = require('./api/users/user-router')
// const petRouter = require('./api/pets/pets-router')

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

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require('./users/user-router');  // Adjust path
const petRouter = require('./pets/pets-router');    // Adjust path


app.use('/api/users', userRouter);
app.use('/api/pets', petRouter);

module.exports = app;

module.exports.handler = serverless(app);
