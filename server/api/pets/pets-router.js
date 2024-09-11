const router = require('express').Router()
const Pets = require('../pets/pets-model')

router.get('/pets' , async (req,res,next) => {
   try {
    const pets = await Pets.find()
    res.json(pets)
   } catch(err){
    next(err)
   }
})

module.exports = router