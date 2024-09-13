const router = require('express').Router()
const Pets = require('../pets/pets-model')

// router.get('/pets' , async (req,res,next) => {
//    try {
//     const pets = await Pets.find()
//     res.json(pets)
//    } catch(err){
//     next(err)
//    }
// })

// router.post('/pets/:id/comments', async (req, res, next) => {
//    try{
//       const {comment}  = req.body
//       const pet_id = req.params.id

//       const pet = await Pets.getById(pet_id)
//       if(!pet){
//          return res.status(404).json({message: 'Pet not found'})
//       }
//       const newComment = await Pets.addComment({ comment, pet_id })
//       res.status(201).json(newComment)
//    } catch(err) {
//       next(err)
//    }
// })

router.get('/pets', async (req, res, next) => {
   try {
       const pets = await Pets.find();
       
       // Format the data to group comments under each pet
       const petsWithComments = pets.reduce((acc, pet) => {
           if (!acc[pet.pet_id]) {
               acc[pet.pet_id] = {
                   ...pet,
                   comments: []
               };
           }
           if (pet.comment) {
               acc[pet.pet_id].comments.push(pet.comment);
           }
           return acc;
       }, {});

       res.json(Object.values(petsWithComments));
   } catch (err) {
       next(err);
   }
});

// Add a comment to a specific pet
router.post('/pets/:id/comments', async (req, res, next) => {
   try {
       const { comment } = req.body;
       const pet_id = req.params.id;

       const pet = await Pets.getById(pet_id);
       if (!pet) {
           return res.status(404).json({ message: 'Pet not found' });
       }
       const newComment = await Pets.addComment({ comment, pet_id });
       res.status(201).json(newComment);
   } catch (err) {
       next(err);
   }
});

module.exports = router