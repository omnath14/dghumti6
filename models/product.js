const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
            maxlength: 20000
        },
        specification: {
            type: String,
            required: false,
            maxlength: 20000
        },
        moreinfo: {
            type: String,
            required: false,
            maxlength: 20000
        },
        questions: {
            type: String,
            required: false,
            maxlength: 20000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        cprice: {
            type: Number,
            trim: true,
            required: false,
            maxlength: 32
        },

        off: {
            type: Number,
            trim: true,
            required: false,
            maxlength: 3
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        quantity: {
            type: Number
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        shipping: {
            required: false,
            type: Boolean
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
