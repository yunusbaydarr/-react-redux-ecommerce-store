import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slice/appSlice'
import productReducer from './slice/productSlice'
import basketReducer from './slice/basketSlice'
export const store = configureStore({
  reducer: {
    app:appReducer,
    products:productReducer,
    basket:basketReducer
  },
})