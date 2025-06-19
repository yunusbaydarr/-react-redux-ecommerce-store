//ProductList.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts} from '../redux/slice/productSlice'
import Product from './Product';
import Loading from './Loading';

function ProductList() {
    const dispatch = useDispatch();
    
    const {products,searchText,loading,appliedSearchQuery} = useSelector((store) => store.products);

    useEffect(() => {
        dispatch(getAllProducts())
    },[])

    const filteredProducts = products.filter((product)=>{
        
        if (appliedSearchQuery === "") {
            return true;
        }

        const lowerSearchText = appliedSearchQuery.toLowerCase();

        return appliedSearchQuery ==="" || 
            //    product.title&&product.title.toLowerCase().includes(lowerSearchText.toLowerCase()) ||
            //    product.brand&&product.brand.toLowerCase().includes(lowerSearchText.toLowerCase()) ||
            //    product.description&&product.description.toLowerCase().includes(lowerSearchText.toLowerCase())
            
                product.title&&product.title.toLowerCase().includes(lowerSearchText.toLowerCase()) ||
               product.brand&&product.brand.toLowerCase().includes(lowerSearchText.toLowerCase())
        
    })

    if(loading){
        return <Loading/>
    }
  return (
    <div className='flex-row' style={{flexWrap:"wrap",marginTop:'25px'}}>
        {/*
            products && products.map((product) => (
                <Product key={product.id} product={product} />
            ))
       */} 

       {
        filteredProducts && filteredProducts.map((product) => <Product key={product.id} product={product} /> )
       }
       {
        filteredProducts.length ===0 && searchText !="" && (
            <p style={{textAlign: 'center', width: '100%', marginTop: '50px', fontSize: '18px', color: '#555'}}>
                    "{searchText}" için ürün bulunamadı.
                </p>
        )
       }
    </div>
  )
}

export default ProductList
