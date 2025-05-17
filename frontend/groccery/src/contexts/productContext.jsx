import { useReducer } from "react";
import { createContext } from "react";

export const ProductContext = createContext()
const productReducer=(state,action)=>
{
       switch(action.type)
       {
              case 'GET_PRODUCTS':
                     return{
                            product:action.payload
                     }
              case 'CREATE_LIST':
                     return{
                            product:[action.payload,...state.product]
                     }
              case 'DELETE_LIST':
                     return{
                            product:state.product.filter((prod)=>prod._id!=action.payload._id)
                     }
              case 'UPDATE_LIST':
                     return{
                            product:state.product.map((prod)=>prod._id===action.payload._id?action.payload:prod)
                     }
              default:
                     return state
       }
}
export const ProductContextProvider = ({ children }) => {
       const [state, dispatch] = useReducer(productReducer, {
              product: []
       })
       return (

              <ProductContext.Provider value={{...state,dispatch}}>
                     {children}
              </ProductContext.Provider>
       )
}

