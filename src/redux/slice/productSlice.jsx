import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
products:[],
selectedProduct:{},
loading : false,
searchText:"",
appliedSearchQuery: ""
}

//const BASE_URL = "https://fakestoreapi.in/api";

const BASE_URL = 'https://dummyjson.com'

export const getAllProducts = createAsyncThunk("getAllProducts" , async() =>{
    const response = await axios.get(`${BASE_URL}/products?limit=0`)
    return response.data.products
})


export const productSlice  = createSlice( {
    name:"product",
    initialState,
    reducers:{
        setSelectedProduct:(state , action) => {
            state.selectedProduct = action.payload;
        },
        setSearchText:(state,action) => {
            state.searchText = action.payload
        },
        setAppliedSearchQuery:(state,action) => {
            state.appliedSearchQuery=action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProducts.fulfilled,(state,action) => {
            state.loading = false;
            state.products = action.payload;
        })
    }
})

export const { setSelectedProduct,setSearchText,setAppliedSearchQuery } = productSlice.actions

export default productSlice.reducer