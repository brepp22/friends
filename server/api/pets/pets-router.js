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

router.get('/pets/:pet_id/comments', async (req, res, next) => {
    try {
        const { pet_id } = req.params;
        const comments = await Pets.getCommentsByPetId(pet_id);
        
        if (!comments.length) {
            return res.status(404).json({ message: 'No comments found for this pet.' });
        }
        
        res.json(comments);
    } catch (err) {
        next(err);
    }
})

router.post('/pets/:id/comments', async (req, res, next) => {
   try {
       const { comment } = req.body;
       const pet_id = req.params.id;
       const username = req.body.username

       const pet = await Pets.getById(pet_id);
       if (!pet) {
           return res.status(404).json({ message: 'Pet not found' });
       }
       const newComment = await Pets.addComment({ comment, pet_id, username });
       res.status(201).json(newComment);
   } catch (err) {
       next(err);
   }
});

module.exports = router