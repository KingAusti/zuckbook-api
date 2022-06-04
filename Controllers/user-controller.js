const { response } = require('express');
const { User, Thought } = require('../Models');

const userController = {
    getUsers(req, res) {
        User.find()
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then(userData => {
            if(!userData) {
                return res.status(404).json({message: 'no user found with that id. Try again bud.'})                
            }
            res.json(userData)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    createUser(req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {
                runValidators:true,
                new: true
            }
        )
        .then(userData => {
            if(!userData) {
                return res.status(404).json({message: 'no user found with that id. Try again bud.'})                
            }
            res.json(userData)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then(userData => {
            if(!userData) {
                return res.status(404).json({message: 'no user found with that id. Try again bud.'})                
            }
            res.json({message: 'Requested user has been deleted. Good job bud.'})
        })

    }
}

module.exports = userController;