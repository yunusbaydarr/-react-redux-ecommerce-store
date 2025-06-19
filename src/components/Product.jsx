//Product.jsx
import React from 'react'
import  '../css/Product.css'
import { useNavigate } from 'react-router-dom';
function Product({product}) {
   // const {id , title , image , price , brand, category , model} = product
   const { id, title, thumbnail, price, brand, category, description }  = product;
    const navigate = useNavigate()
        
    const displayedTitle =title.length > 56
            ? title.substring(0, 53) + '...' 
            : title;
  return ( 
    <div >
    <div> 
        <div className='card' onClick={() => navigate("/product-details/"+id)}>
            <img src={thumbnail} alt="Sayfayı yenileyiniz.." className='product-img'/> 
            <p className='product-title'>{`${displayedTitle}`}</p>
            <h3 className='product-price'>{price} $</h3>
            <div className='flex-row' >
                <button className='product-button'> Ürün Detayı </button>    
            </div>
            
        </div>
    </div>
    </div>
  )
}

export default Product
