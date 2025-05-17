import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
       title: {
              type: String,
              required: true
       },
       category: {
              type: String,
              required: true
       },
       quantity: {
              type: Number,
              required: true
       },
       price: {
              type: Number,
              required: true
       }
}, { timestamps: true })

const Products=mongoose.model("Products",schema)
export default Products