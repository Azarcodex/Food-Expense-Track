import mongoose from "mongoose"
import Products from "../model/productModel.js"

//get a product
export const getProducts = async (req, res) => {
       const products = await Products.find({}).sort({ createdAt: -1 })
       try {
              if (products) {
                     res.status(200).json({ success: true, data: products })
              }
              else {
                     res.status(400).json({ success: false, message: "failed to fetch data" })
              }
       } catch (error) {
              res.status(404).json({ error: error.message })
       }
}
//add a product
export const addProduct = async (req, res) => {
       const { title, category, quantity, price } = req.body
       console.log("Body:", req.body);

       if (!title || !category || !quantity || !price) {
              res.status(400).json({ error: "Fill the blank category" })
       }
       try {
              const product = await Products.create({ title, category, quantity, price })
              if (product) {
                     res.status(200).json({ success: true, data: product })
              }
              else {
                     res.status(400).json({ success: false, message: "Items not added" })
              }
       } catch (error) {
              res.status(404).json({ error: error.message })
       }
}
export const DeleteProduct = async (req, res) => {
       const { id } = req.params
       if (!mongoose.isValidObjectId(id)) {
              res.status(400).json({ success: false, error: "No id exist" })
       }
       try {
              const product = await Products.findOneAndDelete({ _id: id })
              if (product) {
                     res.status(200).json({ success: true, data: product })
              }
              else {
                     res.status(400).json({ success: false, error: "Invalid" })
              }
       } catch (error) {
              res.status(500).json({ success: false, error: "Server error" + error.message })
       }
}
//update
export const UpdateProductDetails = async (req, res) => {
       const { id } = req.params
       if (!mongoose.isValidObjectId(id)) {
              res.status(400).json({ success: false, error: "Data id not existed" })
       }
       try {
              const product = await Products.findOneAndUpdate({ _id: id }, {
                     ...req.body
              }, { new: true })
              if (product) {
                     res.status(200).json({ success: true, data: product })
              }
              else {
                     res.status(400).json({ success: false, error: "Invalid detected" })
              }
       } catch (error) {
              res.status(404).json({ error: error.message })
       }
}

export const FindTotal = async (req, res) => {
       const product = await Products.find()
       try {
              if (product) {
                     const total = product.reduce((sum, tot) => {
                            return sum + (tot.price * tot.quantity)
                     },0)
                     res.status(200).json({ sum: total })
              }
              else {
                     res.status(400).json({ error: "Invalid" })
              }
       } catch (error) {
              console.error(error.message);
       }
}