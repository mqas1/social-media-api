const { User, Thought } = require('../models');

module.exports = {
  // find all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // find a user with their user ID; populates friends and thoughts fields 
  // with the values from the user and thought documents.
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: 'friends', select: '-__v' })
      .populate({ path: 'thoughts', select: '-__v' })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
// create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // updates a user by their user ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedUser) => 
        !updatedUser
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(updatedUser)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Deletes a user by their user ID and also deletes all thoughts associated with the user
  deleteUser(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId }
    )
      .then((deletedUser) => 
        !deletedUser
          ? res.status(404).json({ message: 'No user with this id!' })
          : Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // adds one user to another's `friends` field/list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((updatedUser) => 
        !updatedUser
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json({ message: 'Friend added 🎉' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // removes one user from another's `friends` field/list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((updatedUser) => 
        !updatedUser
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json({ message: 'Successfully removed from friends list' })
      )
      .catch((err) => res.status(500).json(err));
  },
};