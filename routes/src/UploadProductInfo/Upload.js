import {React, useState} from 'react'
import {BsPersonCircle} from 'react-icons/bs';
import UploadFile from '../UploadProductInfo/UploadFile.css'
import { IoMdAddCircleOutline } from 'react-icons/io';



const Upload = () => {
    const logout =()=>{
        localStorage.clear()
        window.location.reload()
        window.location.href=`/`
    }
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
  
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
  
      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  
      // FOR BUG IN CHROME
      event.target.value = "";
    };
  
    function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    }

    const [itemName ,setItemName] = useState('');
    const [itemPrice ,setItemPrice] = useState('');
    const [itemAge ,setItemAge] = useState('');
    const [itemWarranty ,setItemWarranty] = useState('');
    const [itemSpecs ,setItemSpecs] = useState('');
    
    const productSellerEmail = localStorage.getItem('email');

    // const prooductInfo = {itemName, itemPrice, itemAge, itemWarranty, itemSpecs}

    const handleChange1 = e=>{
      setItemName(e.target.value);
      console.log(e.target.value);
    }
    const handleChange2 = (e)=>{
      setItemPrice(e.target.value);
      console.log(e.target.value);
    }
    const handleChange3 = (e)=>{
      setItemAge(e.target.value);
      console.log(e.target.value);
    }
    const handleChange4 = (e)=>{
      setItemWarranty(e.target.value);
      console.log(e.target.value);
    }
    const handleChange5 = (e)=>{
      setItemSpecs(e.target.value);
      console.log(e.target.value);
    }

    const [size, setSize] = useState(1);

    const handleClick = () => {
      setSize(size + 1);
      // console.log(counter);
    };
  
    const replacerFunc = () => {
      const visited = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (visited.has(value)) {
            return;
          }
          visited.add(value);
        }
        return value;
      };
    };
    const addProductData = async(e)=>{
      // e.preventDefault();
     
      
      // const n =  textboxValues.length;
      // textboxValues[n] = frstImage; 
      textboxValues.push(frstImage);
      // console.log(textboxValues);
      const [productName ,productPrice, productAge, productWarranty, productSpecs ,productSold ,productImagesURL ,productBuyerEmail] = [itemName ,itemPrice ,itemAge ,itemWarranty ,itemSpecs , false, textboxValues,""];
      const res = await fetch("http://localhost:8003/upload",{
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          productName ,productPrice, productAge, productWarranty, productSpecs , productSellerEmail ,productSold ,productImagesURL ,productBuyerEmail
        }, replacerFunc())
      })
     
      const data = await res.json();
 
      if( res.status === 404 || !data){
        alert("fail");
      }
      else{
        alert("data added");
        console.log("data added");
      }
      window.location.reload();

    }
   
    const [textboxValues, setTextboxValues] = useState([]);

    const handleChange = (event, index) => {
     
      const updatedValues = [...textboxValues];
      updatedValues[index] = event.target.value;
      setTextboxValues(updatedValues);
      
      console.log(textboxValues);
    };
 const [frstImage, setFirstImage] = useState("");
  
  const firstChange = (e) =>{
    console.log(e);
     setFirstImage(e);
  }
  return (
  
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
            <div style= {{height:'1px' , backgroundColor: 'gray', marginBottom:"20px"}}>
            </div>
            

            {/* <div>
            <section>
      <label className='LabelAddImage'>
        + Add Images
        <br />
        <span>up to 10 images</span>
        <input
        className='InputForImages'
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />


      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          null

        ))}

      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="image">
                <img src={image} height="200" alt="upload" />
                <button onClick={() => deleteHandler(image)}>
                  delete image
                </button>
                <p>{index + 1}</p>
              </div>
            );
          })}
      </div>
    </section>
    </div> */}
   
     
  <div className='AllDataTable'>
 <div>
 <div style={{height:`${size*40}px`,display:"flex", flexDirection:"column", marginBottom:"15px"}}>
    <div className='SingleDataContainer'>
       <div >Enter image URLs </div> 
       <div style={{display:"flex", flexDirection:"column" , height:"2000px"}}>
       {
        
          Array.from({ length: size} , (_ ,index) => (
           
            <div onChange={event => handleChange(event, index)} className='InputDataBox' key={index} style={{ marginBottom:"15px"}}>
          <input placeholder="https://ibb.co/x7Bt0cw" rows="1" className="textInput" style={{width :"200px", fontSize:'15px'}}/>
          </div> 
         
          ))

              }
              </div> 
    </div>
      <div style={{marginLeft: "530px", marginTop:"-37px"}}>
           <IoMdAddCircleOutline style={{cursor:"pointer"}} onClick={handleClick} size={20}/>
      </div>
      </div>
 <div className='SingleDataContainer'>
       <div>Name of product </div> 
      <div className='InputDataBox'>
        <input onChange={handleChange1}   placeholder="Bicycle , lamp etc..." rows="1" className="textInput" style={{width :"200px", fontSize:'15px'}}/>
      </div>
    </div>
    <div className='SingleDataContainer'>
       <div>Price of product </div> 
      <div className='InputDataBox'>
        <input onChange={handleChange2}  placeholder="₹999.99" rows="1" className="textInput" style={{width :"200px", fontSize:'15px'}}/>
      </div>
    </div>
    <div className='SingleDataContainer'>
       <div>Age of product </div> 
      <div className='InputDataBox'>
        <input onChange={handleChange3}  placeholder="14 months" rows="1" className="textInput" style={{width :"200px", fontSize:'15px'}}/>
      </div>
    </div>

    <div className='SingleDataContainer'>
       <div>Warranty period of product </div> 
      <div className='InputDataBox'>
        <input  onChange={handleChange4} placeholder="2 years" rows="1" className="textInput" style={{width :"200px", fontSize:'15px'}}/>
      </div>
    </div>

    <div className='SingleDataContainer'>
       <div>Descrition of product </div> 
      <div className='InputDataBox'>
        < textarea onChange={handleChange5}  placeholder="Brief summary about product" rows="1"  style={{width :"400px", fontSize:'14px', height:'70px'}}/>
      </div>
    </div>

    
 </div>
 {
  // selectedImages.length > 0 &&  selectedImages.length < 11 ?
  <button
  className="upload-btn"
  onClick ={addProductData}
>
  Upload {size} image{size === 1 ? "" : "s"} and data 
  
</button> 
// : null
 }

  </div>

        
   </div>
  )
}

export default Upload
