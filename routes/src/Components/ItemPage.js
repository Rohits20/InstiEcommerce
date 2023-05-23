import {React, useState, useEffect } from 'react'
import {BsPersonCircle} from 'react-icons/bs';
import home from '../Home/home.css'
import ItemPagecss from '../Components/ItemPage.css';
import ScrollBar from 'react-custom-scrollbars'

const ItemPage = ({
    productName, productPrice, productWarranty, productAge, productSpecs
}) => {



    const logout =()=>{
        localStorage.clear()
        window.location.reload()
         window.location.href=`/`
    }
    const  [image , setImage] = useState([]);
    const [firstImage , setFirstImage] = useState("");
    const [hover, setHover] = useState(false)
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [bigImageURl , setBigImageURL]  = useState("");

    const onMouseEnter = e => {
      setBigImageURL(e.url);
      setHover(true);
      setHoverIndex(e.id);
    }
    const handleMouseLeave = () => {
      setHover(false);
      setHoverIndex(-1);
   };
   
   const  [oneData , setOneData] = useState([]);


   const getData = async(e)=>{
       const product_uri = window.location.href.split("=");
       const product_id = product_uri[1];
    const res = await fetch(`http://localhost:8003/getsingledata/${product_id}`,{
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
      
      setOneData(data);
      const allImages = data.productImagesURL.map((value , index) =>({
          id : index+1,
          url: value
        }));
        const newArray = allImages.slice(0, -1);
        setFirstImage(allImages[0].url);
      setImage(newArray);
    }
  }

   useEffect(()=>{
    getData();
   }, [])
    

   const handelBuyClick = () =>{
    const product_uri = window.location.href.split("=");
    const product_id = product_uri[1];
    const productSold = true;
    const productBuyerEmail = localStorage.getItem('email');
    fetch(`http://localhost:8003/update/${product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productSold , productBuyerEmail})
    })
      .then(response => response.json())
      .then(updatedDocument => {
      })
      .catch(error => {
        console.error(error);
      });
   }




  return (
    <div>
     <div>
     <div className="topInsti">
                <div style ={{fontSize:'20px' , }}>
                    Insti marketplace
                </div>
                <div style={{width :"20vw"}}>
                </div>
                <div style ={{marginRight:'858px'}}>
                </div>
                <button onClick={logout} style={{height:'30px'}}>Logout</button>
                <BsPersonCircle size='23px'style={{marginLeft:'5vw', marginTop:'2px'}}/>
            </div>
            <div style= {{height:'1px' , backgroundColor: 'gray'}}>

            </div>
     </div>
     
     <div className='ImageAndInfo'>
     <div className='ProductImage'>
    
    <div className='ProductSmallImageGroup'>
    <ScrollBar style={{height: '70px', width:'400px'}}>
      {
      image.map(data => (
        <img key={data.id} onMouseEnter={() => onMouseEnter(data)} onMouseLeave={handleMouseLeave} style={hoverIndex === data.id ? { border:'2px solid' , borderColor: 'Blue'} : {border:'2px solid' , borderColor: 'White'}}
        className='ProductSmallImage' src= {data.url} alt="Product description">
        </img>
      ))
      
      // image.map((data, id) => (
      //   <img key={id +1} onMouseEnter={() => onMouseEnter(data)} onMouseLeave={handleMouseLeave} style={hoverIndex === id ? { border:'2px solid' , borderColor: 'Blue'} : {border:'2px solid' , borderColor: 'White'}}
      //   className='ProductSmallImage' src= {data} alt="Product description"></img>
      // ))
      }
       </ScrollBar>
    
    </div>
    
{bigImageURl === "" ?
     <img alt='Big product' className='ProductBigImage' src={ firstImage}></img>
  :  <img alt='Big product' className='ProductBigImage' src={ bigImageURl}></img>
   

    }

   </div>
   <div className='OnlyInfo'>
      <div style={{ fontSize: 18 ,marginBottom:'8px', fontWeight:"700"}} >{oneData.productName}</div>
      <div style={{ fontSize: 23 ,marginBottom:'8px', fontWeight:"500"}} >₹ {oneData.productPrice}</div>
      <div style={{ fontSize: 20 ,marginBottom:'8px'}} >Product warranty {oneData.productWarranty} year</div>
      <div style={{ fontSize: 20 ,marginBottom:'8px'}} >Product age{oneData.productAge} year</div>
      <div className='OnlyInfoDesc'  >{oneData.productSpecs}</div>
      <div className='BidButton'>
        <div onClick={handelBuyClick} className='BuyNowButton'>
          Buy now
        </div>
     
      </div>
   
     </div>
     </div>
     
     
    </div>
  )
}

export default ItemPage
