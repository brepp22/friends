const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
const userRouter = require('../server/api/users/user-router')
const petRouter = require('../server/api/pets/pets-router')

app.use(cors())

app.use('/api' , userRouter)
app.use('/api', petRouter)

app.get("/api", (req , res) => {
    res.json({"users" : ["userOne" , "userTwo" , "userThree"]})
})

app.listen(9000 , () => {
    console.log("server started on port 9000")
})