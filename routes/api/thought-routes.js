const router = require('express').Router();
const {
 getAllThoughts,
 getThoughtById,
 createThought,
 updateThought,
 deleteThought,
 addReaction,
 deleteReaction
} = require('../../controllers/thought-controller')

// Thought routes use /api/thoughts

// GET ALL THOUGHTS
router
  .route('/')
  .get(getAllThoughts)

// Individual thought routes
router
  .route('/:id')
  .post(createThought)
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// The reaction routes use /api/thoughts/:thoughtId/reactions

// add reaction
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// delete reaction
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

  module.exports = router;