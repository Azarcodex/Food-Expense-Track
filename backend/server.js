import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { routing } from './routes/productRoute.js'
import cors from 'cors'
dotenv.config()
const app = express()
app.get('/favicon.ico',(req,res)=>res.status(204).end())
//middlewares
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
       console.log(req.path, req.method);
       next()
})
//routing
app.use('/api/product', routing)
//listening and database
const port = process.env.PORT
const mongoID = process.env.MONGO_URI
mongoose.connect(mongoID)
       .then(() => {
              app.listen(port, () => {
                     console.log(`connected to the server ${port} and connected to database`);

              })
       }
       )
       .catch((e) => {
              console.log(e);

       })
