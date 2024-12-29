import mongoose from "mongoose";

const collection = "Adoptions";

const schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pets",
    },
    date: {
        type: Date,
        required: true,
    },
})

const adoptionModel = mongoose.model(collection,schema);

export default adoptionModel;