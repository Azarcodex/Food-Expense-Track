import React, { useState } from 'react'
import { api } from '../axios/AxioConnect'
import useProductContext from '../hooks/useProductContext'
import { useNavigate } from 'react-router-dom'
const Addproduct = () => {
       //state to manage data
       const [title, setTitle] = useState('')
       const [category, setCategory] = useState('')
       const [quantity, setQuantity] = useState('')
       const [price, setPrice] = useState('')
       const { dispatch } = useProductContext()
       const navigate = useNavigate()
       const HandleFormSubmit = async (e) => {
              e.preventDefault();
              const FormData = { title, category, quantity: Number(quantity), price: Number(price) };
              try {
                     const response = await api.post('/api/product/add', FormData)
                     console.log("response for posting", response.data);
                     if (response && response.data.data) {
                            dispatch({ type: 'CREATE_LIST', payload: response.data.data })
                            setTitle("")
                            setCategory("")
                            setQuantity("")
                            setPrice("")
                            navigate("/")
                     }
                     else {
                            console.error("not an array found-!");
                     }
              } catch (error) {
                     console.log(error);
              }

       }
       return (
              <div className="px-2">
                     <form
                            onSubmit={HandleFormSubmit}
                            className="max-w-md mx-auto p-6 bg-indigo-400 shadow-md rounded-md [@media(max-width:430px)]:p-3"
                     >
                            <h2 className="text-2xl font-semibold mb-4 text-center text-white [@media(max-width:430px)]:text-lg">
                                   Product Details
                            </h2>

                            <div className="mb-4">
                                   <label className="block text-sm font-medium text-white mb-1 [@media(max-width:430px)]:text-xs">
                                          Name
                                   </label>
                                   <input
                                          placeholder="item name"
                                          type="text"
                                          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 [@media(max-width:430px)]:px-2 [@media(max-width:430px)]:py-1"
                                          value={title}
                                          onChange={(e) => setTitle(e.target.value)}
                                   />
                            </div>

                            <div className="mb-4">
                                   <label className="block text-sm font-medium text-white mb-2 [@media(max-width:430px)]:text-xs">
                                          Category:
                                   </label>
                                   <div className="flex flex-wrap items-center gap-4">
                                          {['Fruits', 'Vegetables', 'meals'].map((cat) => (
                                                 <label className="flex items-center text-white text-sm" key={cat}>
                                                        <input
                                                               type="radio"
                                                               className="mr-1 cursor-pointer bg-white text-black"
                                                               value={cat}
                                                               checked={category === cat}
                                                               onChange={(e) => setCategory(e.target.value)}
                                                        />
                                                        <span>{cat}</span>
                                                 </label>
                                          ))}
                                   </div>
                            </div>

                            <div className="mb-4">
                                   <label className="block text-sm font-medium text-white mb-1 [@media(max-width:430px)]:text-xs">
                                          Quantity
                                   </label>
                                   <div className="flex items-center">
                                          <input
                                                 placeholder="quantity"
                                                 type="number"
                                                 className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 [@media(max-width:430px)]:px-2 [@media(max-width:430px)]:py-1"
                                                 value={quantity}
                                                 onChange={(e) => setQuantity(e.target.value)}
                                          />
                                          <span className="ml-2 text-sm text-white [@media(max-width:430px)]:text-xs">(kg)</span>
                                   </div>
                            </div>

                            <div className="mb-4">
                                   <label className="block text-sm font-medium text-white mb-1 [@media(max-width:430px)]:text-xs">
                                          Price
                                   </label>
                                   <div className="flex items-center">
                                          <input
                                                 placeholder="price"
                                                 type="number"
                                                 className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 [@media(max-width:430px)]:px-2 [@media(max-width:430px)]:py-1"
                                                 value={price}
                                                 onChange={(e) => setPrice(e.target.value)}
                                          />
                                          <span className="ml-2 text-sm text-white [@media(max-width:430px)]:text-xs">(kg)</span>
                                   </div>
                            </div>

                            <button
                                   type="submit"
                                   className="mx-auto block w-full max-w-[10rem] bg-blue-600 text-white my-1 border border-gray-300 rounded-md px-3 py-2 hover:opacity-50 transition [@media(max-width:430px)]:text-sm"
                            >
                                   ADD
                            </button>
                     </form>
              </div>

       )
}

export default Addproduct
