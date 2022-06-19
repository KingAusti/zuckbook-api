const { Thought, User } = require('../Models')

const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    // get single thought by id
    getAThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })        
        .then(thoughtData => {
            if(!thoughtData) {
                return res.status(404).json({message: 'no thot found with that id. Try again bud.'})                
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    // create a thought
    createThought(req,res) {
        Thought.create(req.body)
        .then(thoughtData => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id }},
                { new: true }
            )
        })
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: 'no user found. Try again bud.'})
            }
            res.json({message: 'thot successfully created.'})            
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body},
            { runValidators: true, new: true }
        )
        .then(thoughtData => {
            if(!thoughtData) {
                return res.status(404).json({message: 'no thot found with that id. Try again bud.'})                
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then(thoughtData => {
            if(!thoughtData) {
                return res.status(404).json({message: 'no thot found with that id. Try again bud.'})                
            }
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            )
        })
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: 'no user found. Try again bud.'})
            }
            res.json({message: 'thot successfully deleted.'})            
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    // add a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }

        )
        .then(thoughtData => {
            if(!thoughtData) {
                return res.status(404).json({message: 'no thot found with that id. Try again bud.'})                
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    // delete reaction from a thought
    deleteReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }

        )
        .then(thoughtData => {
            if(!thoughtData) {
                return res.status(404).json({message: 'no thot found with that id. Try again bud.'})                
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
}

module.exports = thoughtController;