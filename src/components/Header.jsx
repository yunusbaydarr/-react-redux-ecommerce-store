import React from 'react'
import '../css/Header.css'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSunnyOutline ,IoMoonOutline} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { basketSlice, setModal } from '../redux/slice/basketSlice';
import { setAppliedSearchQuery, setSearchText } from '../redux/slice/productSlice';
import { useRef } from 'react';

function Header() {

  const navigate = useNavigate()
  const {products} = useSelector((store) => store.basket)
  const dispatch = useDispatch();
  const{searchText}=useSelector((store)=>store.products)

  const inputRef = useRef(null)
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -1,
      top: 5,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));


  return (
    <div className='header-body' style={{display:'flex', justifyContent:'space-between', alignContent:'center', flexDirection:'row'}}>
        <div className='flex-row'>
        <img className='logo' onClick={()=>navigate("/")} src="./src/images/logo.avif" alt="" />
        <p onClick={()=>navigate("/")} className='logo-text'>al-götür</p>
        </div>

        <div className='flex-row'>
            <input 
            value={searchText}
            type="text" 
            className='input' 
            placeholder='Aramak istediğiniz metni girdikten sonra "Enter" tuşuna basınız.'
            ref={inputRef}
            onChange={(e)=>dispatch(setSearchText(e.target.value))}
            onKeyDown={(e) => {
              if(e.key==='Enter')dispatch(setAppliedSearchQuery(searchText))
            }} />
            <div className='icons'>
                <FaMagnifyingGlass 
                onClick={()=>{if(inputRef.current)inputRef.current.focus()}}
                style={{marginLeft:'10px', alignItems:'center', justifyContent:'center' , marginRight:'10px'}} />

                <StyledBadge badgeContent={products.length} color="error">
                  <MdOutlineShoppingCart onClick={()=>dispatch(setModal())} style={{fontSize:'25px',marginTop:'-10px'}}>

                  </MdOutlineShoppingCart>
                </StyledBadge>

            </div>
        </div>
        
    </div>
    
  )
}

export default Header
