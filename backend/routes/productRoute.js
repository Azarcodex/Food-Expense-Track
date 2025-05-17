import express from 'express'
import { addProduct, DeleteProduct, FindTotal, getProducts, UpdateProductDetails } from '../controllers/productController.js'

export const routing = express.Router()

//get
routing.get('/',getProducts)

//post
routing.post('/add', addProduct)

//delete
routing.delete('/delete/:id',DeleteProduct)

//update
routing.patch('/update/:id',UpdateProductDetails)

//to find total expense
routing.get('/total',FindTotal)