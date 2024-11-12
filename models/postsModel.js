import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const Post = mongoose.Model("Post", postSchema)