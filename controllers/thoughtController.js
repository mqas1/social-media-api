const { User, Thought } = require('../models');

module.exports ={
  // find all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // finds a single thought using the thought ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // creates a thought and pushes it to the associated user's thought field/array
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID'
            })
          : res.json({ message: 'Successfully posted the thought 🎉' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // updates a thought by its ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedThought) => 
        !updatedThought
          ? res.status(404).json({ message: 'No thought with this ID!' })
          : res.json(updatedThought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // deletes a thought and updates the associated user's thought field/array
  // deleting it using the $pull MongoDB operator
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) => 
        !deletedThought
          ? res.status(404).json({ message: 'No thought with this ID!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) => 
        !user
          ? res.status(404).json({
              message: 'Thought deleted but no user with this ID!'
            })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // creates a reaction and stores it in a single thought's `reactions` field/array
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      then((updatedThought) => 
        !updatedThought
          ? res.status(404).json({ message: 'No thought with this ID!' })
          : res.json(updatedThought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // deletes a reaction with its `reactionID` and pulls it from its associated
  // thought's `reactions` field/array using the MongoDB $pull operator
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((updatedThought) =>
        !updatedThought
          ? res.status(404).json({ message: 'No thought with this ID!' })
          : res.json(updatedThought)
      )
      .catch((err) => res.status(500).json(err));
  },
};