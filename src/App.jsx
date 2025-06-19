import { useEffect, useState } from "react";

import "./App.css";
import Container from "@mui/material/Container";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalBasketAmount, removeToBasket, setModal } from "./redux/slice/basketSlice";
import { ImBin } from "react-icons/im";
import "./components/Marquee"
import Marquee from "./components/Marquee";
function App() {
  const { products, modal, totalAmount } = useSelector((store) => store.basket);
  const {basketAmount} = products
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotalBasketAmount())
  },[])
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <PageContainer>
        <Header />
        <Marquee />
        <Modal open={modal} onClose={() => dispatch(setModal())}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "850px",
              height: "450px",
              backgroundColor: "rgb(255, 255, 255)",
              border: "none",
              boxShadow: "24px",
              padding: "4px",
              overflow: "auto",
              transition:"all 5s",
              alignItems:'center',
              justifyContent:'flex-start',
              display: "flex",
               flexDirection: "column", 

            }}
          >
            {products &&
              products.map((product) => {
                return (
                  <div className="app-card" key={product.id}>
                    <div style={{ display: "flex", flexDirection:"row",justifyContent:"space-between"}} >
                      <div key={product.id} style={{ display: "flex",
                        flexDirection: "row", alignItems:"center"}}>
                          <img src={product.thumbnail} alt="" style={{ width: "80px", height: "120px" }}/>
                            <b><p className="app-product-brand">{product.brand}</p></b>
                              <p className="app-product-title">{product.title}</p>
                              <p><b>x{product.basketAmount}</b></p>
                      </div>

                          <div style={{display: "flex",alignItems: "center",justifyContent:'center'}}>

                                  <div style={{display: "flex",alignItems: "center",
                                    flexDirection:'row',justifyContent:'center'}}>
                                    <p className="app-product-price">{product.price} $</p>
                                    < ImBin 
                                    className="app-bin-icon" 
                                    onClick={()=> dispatch(removeToBasket(product.id))}/>
                                  </div>

                          </div>
                    </div>
                  </div>
                );
              })}

                 <div ><h4 style={{ display:'flex',alignItems:'flex-end',fontSize:'20px'}}>Toplam Fiyat: {totalAmount.toLocaleString( { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</h4></div>

          </Box>
        </Modal>

        <RouterConfig />
        <Loading />
      </PageContainer>
    </>
  );
}

export default App;
