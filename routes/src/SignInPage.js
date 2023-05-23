import React, { useEffect, useState } from "react";
import {auth,provider} from "./FirebaseAuth/config";
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom"


const SignInPage = () => {


    const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        })
    }
    

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    },[])
  return (
    <div>
      
            {
            value ?  window.location.href=`/home` :
              <button onClick={handleClick} style={{marginLeft:'80vw',marginTop:'15px',padding:'3px'}}>Signin With Google</button>
           
            }
              </div>
  )
}

export default SignInPage
