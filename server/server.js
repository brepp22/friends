// require('dotenv').config();

// const express = require('express')
// const app = express()
// const cors = require('cors')
// app.use(express.json())
// const userRouter = require('./api/users/user-router')
// const petRouter = require('./api/pets/pets-router')

// app.use(cors())

// app.use('/api' , userRouter)
// app.use('/api', petRouter)


// app.listen(process.env.PORT || 9000 , () => {
//     console.log(`server started on port ${process.env.PORT || 9000}`)
// })



// const express = require('express');
// const serverless = require('serverless-http');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// const userRouter = require('./users/user-router');  // Adjust path
// const petRouter = require('./pets/pets-router');    // Adjust path


// app.use('/api/users', userRouter);
// app.use('/api/pets', petRouter);

// module.exports = app;

// module.exports.handler = serverless(app);


require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const userRouter = require('./api/users/user-router');
const petRouter = require('./api/pets/pets-router');

app.use(cors());

// Routes for users and pets
app.use('/api', userRouter);
app.use('/api', petRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/test' , (req, res) => {
    res.status(200).send('Test route is working')
})

app.get('/', (req, res) => {
    res.send('Server is up and running');
  });  


app.listen(process.env.PORT || 9000, () => {
  console.log(`server started on port ${process.env.PORT || 9000}`);
});
