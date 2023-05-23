import React, { useEffect } from 'react'
import { useState } from "react";
import { MdDeleteForever } from 'react-icons/md';

const UserDetail = () => {

    const  [productsToSell , setProductsToSell] = useState([]);

    const getProductsToSell = async(e)=>{
    const email  = localStorage.getItem("email")
     const res = await fetch(`http://localhost:8003/userInfo/toSell/${email}`,{
       method: "GET",
       headers:{
         "Content-Type":"application/json",
       },
     })
     const data = await res.json();
     if( res.status === 404 || !data){
       alert("error");
     }
     else{
        setProductsToSell(data);
        }
   }
 

   const  [productsSold , setProductsSold] = useState([]);

    const getProductsSold = async(e)=>{
    const email  = localStorage.getItem("email")
     const res = await fetch(`http://localhost:8003/userInfo/sold/${email}`,{
       method: "GET",
       headers:{
         "Content-Type":"application/json",
       },
     })
     const data = await res.json();
     if( res.status === 404 || !data){
       alert("error");
     }
     else{
        setProductsSold(data);
        }
   }

   const  [productsBought , setProductsBought] = useState([]);

   const getProductsBought = async(e)=>{
   const email  = localStorage.getItem("email")
    const res = await fetch(`http://localhost:8003/userInfo/bought/${email}`,{
      method: "GET",
      headers:{
        "Content-Type":"application/json",
      },
    })
    const data = await res.json();
    if( res.status === 404 || !data){
      alert("error");
    }
    else{
        setProductsBought(data);
       }
  }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8003/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error deleting data');
    }
  };


    useEffect(()=>{
     getProductsToSell();
     getProductsSold();
     getProductsBought();
    }, [])


  return (
    <div>
      <div style={{padding:"20px", color:"brown", fontWeight:"bold"}}>
        Welcome {localStorage.getItem('email')}
      </div>
      <div style={{display:"flex", flexDirection:"row" , height:"auto",alignItems: "flex-start"}}>
      <div style={{marginLeft:"20px", width:"700px", backgroundColor:"lightblue" }}>
            <div>Products to sell</div> 
      {
        productsToSell.map((data) => (
           
            <div style={{display:"flex", flexDirection:"row"}}>
            <div className="itemCardSmall">
                 <div>
                <img alt="Product" className="itemImageSmall" src={data.productImagesURL[0]} />
                 </div>
                 <div className="description">
                  <div className="productNameSmall">{data.productName}</div>
                  <div className="productDetailSmall">Rs. { data.productPrice}</div>             
                </div>
             </div>
             <div onClick={() => handleDelete(data._id)}>
               <MdDeleteForever   style={{marginTop:'50px', marginLeft:'15px',cursor:"pointer"}} size="25px"/>
             </div>
            </div>
          
        ))
        }
         </div>
         <div style={{marginLeft:"20px", width:"700px", backgroundColor:"lightgreen" }}>
            <div>Products sold</div> 
      {
        productsSold.map((data) => (
            <div style={{display:"flex", flexDirection:"row"}}>
            <div>
            <div className="itemCardSmall">
                 <div>
                <img alt="Product" className="itemImageSmall" src={data.productImagesURL[0]} />
                 </div>
                 <div className="description">
                  <div className="productNameSmall">{data.productName}</div>
                  <div className="productDetailSmall">Rs. { data.productPrice}</div>             
                </div>
             </div>
            </div>
            
             <div onClick={() => handleDelete(data._id)}>
               <MdDeleteForever  style={{marginTop:'50px', marginLeft:'15px',cursor:"pointer"}} size="25px"/>
             </div>
            </div>
        ))
        }
         </div>
     
         <div style={{marginLeft:"20px", width:"700px", backgroundColor:"lightpink" }}>
            <div>Products bought</div> 
      {
        productsBought.map((data) => (
            <div style={{display:"flex", flexDirection:"row"}}>
            <div>
            <div className="itemCardSmall">
                 <div>
                <img alt="Product" className="itemImageSmall" src={data.productImagesURL[0]} />
                 </div>
                 <div className="description">
                  <div className="productNameSmall">{data.productName}</div>
                  <div className="productDetailSmall">Rs. { data.productPrice}</div>             
                </div>
             </div>
            </div>
          
             <div onClick={() => handleDelete(data._id)}>
               <MdDeleteForever  style={{marginTop:'50px', marginLeft:'15px',cursor:"pointer"}} size="25px"/>
             </div>
            </div>
        ))
        }
         </div>
      
   
      </div>
    </div>
  )
}

export default UserDetail
