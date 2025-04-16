import mongoose  from "mongoose";


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    captions: {
        type: String,
        required: true
    },
    description: {

        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    price: { 
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})