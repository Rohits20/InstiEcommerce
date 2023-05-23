import React from 'react'
import { useNavigate } from "react-router-dom";


const SellCard = ({
    productName, productPrice, productWarranty, productAge, productSpecs,uniqueId,productImagesURL
}) => {
  // let navigate = useNavigate(); 
  // const routeChange = () =>{ 
  //   let path = `newPath`; 
  //   navigate(path);
  // }

  return (
    <div>
        <div onClick={event =>  window.location.href=`/product?uniqueId=${uniqueId}`} className="itemCard">
            <div>
           <img alt="Product" className="itemImage" src={productImagesURL[0]} />
            </div>
            <div className="description">
             <div className="productName"> {productName}</div>
             <div className="productDetail">₹ {productPrice}</div>
             <div className="productDetail">Warranty period {productWarranty} years</div>
             <div className="productDetail">Product age {productAge} years</div>
             <div className="textDescription">{productSpecs}</div>
             
           </div>
           </div>
    </div>
  )
}

export default SellCard
