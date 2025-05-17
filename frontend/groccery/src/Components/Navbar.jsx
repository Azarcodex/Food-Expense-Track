import React, { useEffect, useState } from 'react'
import { FaHome, FaPlus } from 'react-icons/fa'
import { IoFastFoodSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'
import useProductContext from '../hooks/useProductContext';
import { api } from '../axios/AxioConnect';
import { GiMoneyStack } from "react-icons/gi";
const Navbar = () => {
       const { product } = useProductContext()
       const [total, setTotal] = useState(null)
       const TotalScore = async () => {
              const response = await api.get('/api/product/total')
              console.log("Total score:", response.data.sum);
              try {
                     if (response.data) {
                            setTotal(response.data.sum)
                     }
              } catch (error) {
                     console.log(error.message);
              }
       }
       useEffect(() => {
              TotalScore();
       }, [product])
       return (
              <div className='bg-transparent h-screen border-r-2 border-white p-2'>
                     <div className='flex items-center justify-center gap-2 bg-blue-500 p-3'>
                            <IoFastFoodSharp className='text-white text-2xl' />
                            <h2 className='text-xl tracking-tight font-bold'>Food Expense Tracker</h2>
                     </div>
                     <ul className='flex flex-col items-center gap-2 mx-auto'>
                            <Link to={'/'}>
                                   <li className='my-2 text-sm font-semibold capitalize tracking-tight flex items-center gap-3 cursor-pointer text-white transition duration-500 hover:text-green-300'>Home<span><FaHome /></span></li>
                            </Link>
                            <Link to={'/add'}>
                                   <li className='my-2 text-sm font-semibold capitalize tracking-tight flex items-center gap-3 cursor-pointer text-white transition duration-500 hover:text-green-300'>add item<span><FaPlus /></span></li>
                            </Link>
                     </ul>
                     <div className='flex items-center justify-center mt-10 bg-violet-500 rounded-sm px-2 py-1'>
                            <h3 className='font-bold capitalize flex items-center gap-3'>total<GiMoneyStack className='text-green-900 text-lg' />:<span className='text-white'>{total}</span></h3>
                     </div>
              </div>
       )
}

export default Navbar
