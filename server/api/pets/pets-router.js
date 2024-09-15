const router = require('express').Router()
const Pets = require('../pets/pets-model')
const db = require('../../data/db-config')

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
        const { pet_id } = req.params
        const {limit} = req.query
        const comments = await Pets.getCommentsByPetId(pet_id, limit ? parseInt(limit, 10) : null);
        
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


router.patch('/pets/:pet_id/like', async (req, res) => {
    const { pet_id } = req.params;
    const { username, like } = req.body;

    try {
        const updatedLike = await Pets.updateLikeStatus(pet_id, username, like);
        res.json(updatedLike);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update like status' });
    }
});

router.get('/users/:username/liked-pets', async (req, res) => {
    const { username } = req.params;
    try {
        const likedPets = await db('likes')
            .where({ username, like: true })
            .join('pets', 'likes.pet_id', 'pets.pet_id')
            .select('pets.*');

        res.json(likedPets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch liked pets' });
    }
});


module.exports = router






