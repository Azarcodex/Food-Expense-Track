import React, { useEffect, useState } from 'react';
import { GiWeight } from "react-icons/gi";
import useProductContext from '../hooks/useProductContext';
import { api } from '../axios/AxioConnect';
import { MdDeleteForever } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";
import { enUS } from 'date-fns/locale';

const Productpage = () => {
       const { product, dispatch } = useProductContext();
       const [updateList, setUpdateList] = useState(false);
       const [update_id, setUpdate_id] = useState(null)
       const [u_title, setU_title] = useState("");
       const [u_category, setU_category] = useState("");
       const [u_price, setU_price] = useState("");
       const [u_quantity, setU_quantity] = useState("");
       const customLocale = {
              ...enUS,
              formatDistance: (token, count, options) => {
                     const result = enUS.formatDistance(token, count, options);
                     return result.replace('about ', '');
              }
       };

       const fetchProductDetails = async () => {
              try {
                     const response = await api.get("/api/product/");
                     if (response.data.data && Array.isArray(response.data.data)) {
                            dispatch({ type: 'GET_PRODUCTS', payload: response.data.data });
                     } else {
                            console.error("Unexpected format: ", response.data);
                     }
              } catch (error) {
                     console.error(error.message);
              }
       };

       const HandleDelete = async (e, id) => {
              e.preventDefault();
              if (confirm("Do you want to delete?")) {
                     try {
                            const response = await api.delete(`/api/product/delete/${id}`);
                            if (response) {
                                   dispatch({ type: 'DELETE_LIST', payload: response.data.data });
                            } else {
                                   console.log("Item not found");
                            }
                     } catch (error) {
                            console.error(error.message);
                     }
              } else {
                     alert("Delete option cancelled.");
              }
       };

       const HandleUpdate = async (e, id) => {
              e.preventDefault()
              setUpdateList(true)
              const current = await product.find((prod) => prod._id === id)
              console.log(current);

              if (current) {
                     setUpdate_id(current._id)
                     setU_title(current.title)
                     setU_category(current.category)
                     setU_quantity(current.quantity)
                     setU_price(current.price)
              }
       }

       useEffect(() => {
              fetchProductDetails();
       }, []);

       const HandleForm = async (e) => {
              e.preventDefault()
              const dataList = {
                     title: u_title,
                     category: u_category,
                     quantity: u_quantity,
                     price: u_price
              };
              try {
                     const response = await api.patch(`/api/product/update/${update_id}`, dataList)
                     if (response) {
                            console.log("New-title,category,quantity,price", u_title, u_category, u_quantity, u_price);
                            console.log(response.data);
                            dispatch({ type: 'UPDATE_LIST', payload: response.data.data })
                            setU_title("")
                            setU_price("")
                            setU_category("")
                            setU_quantity("")
                            setUpdate_id("")
                            setUpdateList(false)
                     }
                     else {
                            console.log("invalid occurred");
                     }
              } catch (error) {
                     console.log(error.message);
              }
       }

       return (
              <div className='relative px-4 sm:px-6 md:px-10 py-3'>
                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 sm:gap-8'>
                            {product && product.map((prod, idx) => (
                                   <div
                                          key={idx}
                                          className='bg-[#006989] border border-indigo-50 shadow-lg rounded-lg w-full max-w-[300px] mx-auto px-4 py-3 flex flex-col space-y-4 items-center relative [@media(max-width:430px)]:max-w-[90%] [@media(max-width:430px)]:px-2 [@media(max-width:430px)]:py-2'
                                   >
                                          <span
                                                 className='text-red-700 absolute right-2 top-2 text-2xl cursor-pointer hover:text-red-950'
                                                 onClick={(e) => HandleDelete(e, prod._id)}
                                          >
                                                 <MdDeleteForever />
                                          </span>

                                          <label className='text-violet-200 text-sm text-center'>
                                                 Product: <span className='text-white font-semibold'>{prod.title}</span>
                                          </label>

                                          <div className='bg-amber-100 rounded-2xl py-1 px-3 text-yellow-500 text-sm'>
                                                 {prod.category}
                                          </div>

                                          <h6 className='flex items-center justify-between text-sm text-white gap-2'>
                                                 <GiWeight className='text-white text-xl' /> {prod.quantity}kg
                                          </h6>

                                          <label className='text-violet-200 text-sm'>
                                                 Price: <span className='text-white'>{prod.price}</span>
                                          </label>

                                          <label className='text-violet-200 text-sm'>
                                                 Total Price: <span className='text-white'>{prod.price * prod.quantity}</span>
                                          </label>

                                          <span
                                                 className='text-white absolute right-2 bottom-6 text-2xl cursor-pointer hover:text-black'
                                                 onClick={(e) => HandleUpdate(e, prod._id)}
                                          >
                                                 <BsPencilSquare />
                                          </span>

                                          <h6 className='text-yellow-300 absolute left-2 bottom-1 text-[11px] cursor-default'>
                                                 {formatDistanceToNow(new Date(prod.createdAt), {
                                                        addSuffix: true,
                                                        locale: customLocale,
                                                 })}
                                          </h6>
                                   </div>
                            ))}
                     </div>

                     {updateList && (
                            <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                                          <button onClick={() => setUpdateList(false)} className="absolute top-2 right-3 text-2xl text-gray-700 hover:text-red-600">&times;</button>
                                          <h2 className="text-xl font-semibold text-center mb-5 text-gray-800">Update Product</h2>
                                          <form className="space-y-4" onSubmit={HandleForm}>
                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                                        <input type="text" value={u_title} onChange={(e) => setU_title(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                 </div>
                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                                        <input type="number" value={u_quantity} onChange={(e) => setU_quantity(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                 </div>
                                                 <div className='flex flex-wrap items-center gap-5'>
                                                        {['fruits', 'vegetables', 'meals'].map((cat) => (
                                                               <label key={cat} className='flex items-center'>
                                                                      <input type="radio" value={cat} onChange={(e) => setU_category(e.target.value)} checked={u_category === cat} className='mr-2 cursor-pointer' />
                                                                      <span>{cat}</span>
                                                               </label>
                                                        ))}
                                                 </div>
                                                 <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                                        <input type="number" value={u_price} onChange={(e) => setU_price(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                 </div>
                                                 <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Update</button>
                                          </form>
                                   </div>
                            </div>
                     )}
              </div>
       );
};

export default Productpage;