import React, { useEffect ,useState} from "react";
import {IoMdAddCircle} from 'react-icons/io';
import {BsPersonCircle} from 'react-icons/bs';
import home from '../Home/home.css'
import SellCard from '../Components/SellCard'

function Home(){
    const logout =()=>{
        localStorage.clear()
        window.location.reload()
        window.location.href=`/`
    }

    const  [allProductInfo , setAllProductInfo] = useState([]);

    const getData = async(e)=>{
        // e.preventDefault();
           const productSellerEmail = localStorage.getItem('email');
        const res = await fetch(`http://localhost:8003/getdata/${productSellerEmail}`,{
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
            setAllProductInfo(data);
        }
        // window.location.reload();
  
      }
 
       useEffect(()=>{
        getData();
       }, [])
    return (
        <div>
            <div className="topInsti">
                <div style ={{fontSize:'20px' , }}>
                    Insti marketplace
                </div>
                <div style={{width :"20vw"}}>
                </div>
                <div style ={{marginRight:'350px'}}>
                    <input placeholder="Search for products..." rows="1" className="search" style={{width :"500px"}}/>
                </div>
                <button onClick={logout}>Logout</button>
                <BsPersonCircle onClick={event =>  window.location.href="/userInfo"} className="UserName" size='23px'style={{marginLeft:'5vw', marginTop:'2px', cursor:"pointer"}}/>
            </div>
            <div style= {{height:'0.5px' , backgroundColor: 'gray', marginBottom:'10px'}}>

            </div>
            <button onClick={event =>  window.location.href=`/upload`} className="upload">
                Upload items
                <IoMdAddCircle size='20px' style ={{marginLeft:'15px', marginTop: '-3px'}}/>
            </button>

          
           <div style ={{marginLeft: '-93vw', marginTop:'5px'}}>
            Buy items
           </div>
          <div className="BuyList">
             
          {  allProductInfo.map(item => (
                <SellCard uniqueId={item._id} productName={item.productName} productPrice={item.productPrice} productAge={item.productAge}  productWarranty={item.productWarranty} productSpecs={item.productSpecs} productImagesURL = {item.productImagesURL}/>

            ))
          }
        {/* <SellCard uniqueId={1} productName={"Study lamp"} productPrice={"₹999.99"} productAge={"14 months old"}  productWarranty={"2 years Warranty period"} productSpecs={"A lamp is a device that makes light and heat. Lamps usually work with electricity, using a lightbulb. In the United States, a lamp is usually considered a desk lamp or floor lamp. Other sources of light are called 'lights', such as streetlights, flashlights, and headlights, which in some countries are called streetlamps, torches and headlamps."}/>
         <SellCard uniqueId={2} productName={"Study lamp"} productPrice={"₹999.99"} productAge={"14 months old"}  productWarranty={"2 years Warranty period"} productSpecs={"A lamp is a device that makes light and heat. Lamps usually work with electricity, using a lightbulb. In the United States, a lamp is usually considered a desk lamp or floor lamp. Other sources of light are called 'lights', such as streetlights, flashlights, and headlights, which in some countries are called streetlamps, torches and headlamps."}/>
         <SellCard uniqueId={3} productName={"Study lamp"} productPrice={"₹999.99"} productAge={"14 months old"}  productWarranty={"2 years Warranty period"} productSpecs={"A lamp is a device that makes light and heat. Lamps usually work with electricity, using a lightbulb. In the United States, a lamp is usually considered a desk lamp or floor lamp. Other sources of light are called 'lights', such as streetlights, flashlights, and headlights, which in some countries are called streetlamps, torches and headlamps."}/>
         <SellCard uniqueId={4} productName={"Study lamp"} productPrice={"₹999.99"} productAge={"14 months old"}  productWarranty={"2 years Warranty period"} productSpecs={"A lamp is a device that makes light and heat. Lamps usually work with electricity, using a lightbulb. In the United States, a lamp is usually considered a desk lamp or floor lamp. Other sources of light are called 'lights', such as streetlights, flashlights, and headlights, which in some countries are called streetlamps, torches and headlamps."}/>
         <SellCard uniqueId={5} productName={"Study lamp"} productPrice={"₹999.99"} productAge={"14 months old"}  productWarranty={"2 years Warranty period"} productSpecs={"A lamp is a device that makes light and heat. Lamps usually work with electricity, using a lightbulb. In the United States, a lamp is usually considered a desk lamp or floor lamp. Other sources of light are called 'lights', such as streetlights, flashlights, and headlights, which in some countries are called streetlamps, torches and headlamps."}/> */}

          </div>

         
        </div>
        
    );
}
export default Home;
