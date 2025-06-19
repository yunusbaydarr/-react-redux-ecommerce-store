import { createSlice } from '@reduxjs/toolkit'

const getBasketFromStorage = () =>{
    if(localStorage.getItem("basket")){
        return JSON.parse(localStorage.getItem("basket"));
    }else{ return []}
}

const writeFromBasketToStorage = (basket) =>{
    localStorage.setItem("basket",JSON.stringify(basket))
}

const initialState = {
    products : getBasketFromStorage(),
    modal:false,
    totalAmount:0,
}
export const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers:{

        addToBasket:(state,action) => {
          const findProduct = state.products && state.products.find((product) => product.id === action.payload.id);
            if(findProduct){
               const extractedProduct = state.products.filter((product) =>product.id !== action.payload.id)

               findProduct.basketAmount+=action.payload.basketAmount

              state.products =[...extractedProduct,findProduct]
              if(action.payload.basketAmount != 0){
                    writeFromBasketToStorage(state.products)
                }

            }else{  
                if(action.payload.basketAmount > 0){
                state.products = [...state.products,action.payload];
                }
                if(action.payload.basketAmount != 0){
                    writeFromBasketToStorage(state.products)
                }
                
            }
        },
        removeToBasket:(state,action) => {
            const extractedProduct = 
            state.products && state.products.filter((product) => {
                return product.id !== action.payload
            });
            state.products=extractedProduct
            writeFromBasketToStorage(state.products)
            
            state.totalAmount = state.products.reduce((sum,product) => sum + (product.price * product.basketAmount) , 0);
        },

        setModal:(state) => {
            state.modal=!state.modal;
        },

        calculateTotalBasketAmount:(state) => {
        state.totalAmount=0;
        state.products && state.products.map((product) => {
            state.totalAmount += product.price * product.basketAmount
        })
    }
    },

   
})

export const { addToBasket , setModal , calculateTotalBasketAmount ,removeToBasket } = basketSlice.actions

export default basketSlice.reducer