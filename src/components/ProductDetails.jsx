//ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slice/productSlice";
import "../css/ProductDetails.css";
import { HiPlusCircle } from "react-icons/hi";
import { HiMinusCircle } from "react-icons/hi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { addToBasket, calculateTotalBasketAmount } from "../redux/slice/basketSlice";
import { BiSolidBasket } from "react-icons/bi";


function ProductDetails() {
  const [basketAmount, setBasketAmount] = useState(0);
  const [showAlert, setShowAlert] = useState(false); // Alert'i göstermek için state
  const [alertMessage, setAlertMessage] = useState(""); // Alert mesajı için state
  const [alertSeverity, setAlertSeverity] = useState("warning"); // Alert tipi için state

  const { id } = useParams();

  const { products } = useSelector((store) => store.products);
  const { selectedProduct } = useSelector((store) => store.products);
  const { title, thumbnail, price, brand, category, description, images } =
    selectedProduct || {};

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsById();
  }, [id, products, dispatch]);

  // const getProductsById = () =>{
  //   products && products.map((product) => {
  //     if(id == product.id){
  //        dispatch(setSelectedProduct(product))
  //     }
  //   })
  // }
  const getProductsById = () => {
    if (products && products.length > 0) {
      const foundProduct = products.find((product) => product.id == id);
      if (foundProduct) {
        dispatch(setSelectedProduct(foundProduct));
      } else {
        dispatch(setSelectedProduct(null));
      }
    } else {
      dispatch(setSelectedProduct(null));
    }
  };
  if (!selectedProduct || selectedProduct.id != id) {
    return <div>Ürün yükleniyor...</div>;
  }

  const handleIncrement = () => {
    if (basketAmount < 20) {
      setBasketAmount(basketAmount + 1);
      if (showAlert) setShowAlert(false);
    } else {
      setAlertMessage("Maksimum 20 adet ekleyebilirsiniz.");
      setAlertSeverity("warning");
      setShowAlert(true);
    }
  };

  const handleDecrement = () => {
    if (basketAmount > 0) {
      setBasketAmount(basketAmount - 1);
      if (showAlert) setShowAlert(false);
    } else {
      setAlertMessage("0'dan küçük değer girilemez.");
      setAlertSeverity("warning");
      setShowAlert(true);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  const addBasket = () => {
    const payload = {
      id,
      brand,
      title,
      thumbnail,
      price,
      description,
      basketAmount
    }
    dispatch(addToBasket(payload));
    dispatch(calculateTotalBasketAmount())
  }

  const mainImageUrl = images && images.length > 0 ? images[0] : thumbnail;
  return (
    <div>
      {/* Snackbar bileşeni Alert'i ekranda konumlandırmak için kullanılır */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <div className="product-details-flex-row">
        <div className="product-details-card">
          <img
            src={mainImageUrl}
            alt=""
            style={{ height: "423px", width: "508px" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="product-details-product-brand">{brand} </div>
            <div className="product-details-product-title">{title}</div>
          </div>

          <div className="product-details-description">{description}</div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="product-details-product-price">{price} $</div>
              <div style={{ alignItems: "center", justifyContent: "center" }}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <BiSolidBasket style={{fontSize:'30px',marginRight:'10px', color:'rgb(100, 100, 100)'}}/>
                <HiPlusCircle
                  className="product-details-plus-icon"
                  onClick={handleIncrement} 
                />
                <span className="product-details-count">{basketAmount}</span>
                <HiMinusCircle
                  className="product-details-minus-icon"
                  onClick={handleDecrement} 
                />
                </div>
              </div>
            </div>
            <button
            className="product-details-basket-button"
            onClick={addBasket}
            >Sepete Ekle</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
