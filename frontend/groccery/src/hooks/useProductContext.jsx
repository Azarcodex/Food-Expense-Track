import React from 'react'
import { useContext } from 'react'
import { ProductContext } from '../contexts/productContext'

const useProductContext = () => {
  const product=useContext(ProductContext)
  if(!product)
  {
       throw Error("Add context in your app component")
  }
  return product
}

export default useProductContext
