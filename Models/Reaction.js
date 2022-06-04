const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/date-format');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        require: true,
        maxlength: 280
    },
    userName: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
},
{
    toJSON:{
        getters: true
    },
    id: false
}
)

module.exports = reactionSchema;