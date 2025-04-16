import mongoose, { Types }  from "mongoose";

interface IBookSchema {
    title: String;
    caption: String;
    description: String;
    rating: Number;
    price: Number;
    image: String;
    user: Types.ObjectId;
}
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

const Books = mongoose.model<IBookSchema>("Books", BookSchema);

export default Books