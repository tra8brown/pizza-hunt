const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//model for replies
const ReplySchema = new Schema({
    // set custom id to avoid confusion with parent comment _id
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String,
        required: true
    },
    writtenBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
}, {
    toJSON: {
        getters: true
    }
});

//model for comments
const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

//virtual to get total reply count just like pizza.js
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;