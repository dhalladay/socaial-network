const { User } = require('../models');

const userController = {
  // get all
  getAllUsers(req, res) {
    User.find({})
      .populate(
        {
        path: 'thoughts',
        select: '-__v'
        },
      )
      .populate(
        {
          path: 'friends',
          select: '-__v'
        }
      )
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // get single
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate(
        {
          path: 'friends',
          select: '-__v'
        }
      )
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // post new
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  // put to update by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete to remove by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  }, 

  //api/users/:userId/friends/:friendId
  // post friend
  addFriend({ params }, res) {
        console.log(params);
    User.findOneAndUpdate(
      { _id: params.id },
      // { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  // delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      // { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = userController;