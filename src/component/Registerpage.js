import React, {useEffect,  useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import IMGOFF from "./Imge/IMGOFF.jpg"
//get the all user
const alluser = () => {
  const data = localStorage.getItem("users1");
  if(data){
      return JSON.parse(data)
  }else {
      return [];
  }
}

function Registerpage() {
  const{register,handleSubmit,formState:{errors}, reset,trigger}=useForm()

  const navigate = useNavigate()
 
  const [state,setState] =useState(alluser())
 const[password,setPassword]=useState("")
  // useEffect 
  useEffect (() => {
      localStorage.setItem("users1", JSON.stringify(state))
  }, [state])

  // submit on local storage
  const Submit = (submition) => {
  
    setState([...state,submition])
    reset()
    navigate("/")
  };

 // eslint-disable-next-line
 const LOGIN =()=>{
navigate("/")
 }
  return ( 
    <div className='container w-25 bg-secondary mt-5 text-white shadow-lg p-3 mb-3  rounded-3'>
    <Online>
    
      <center> 
      <h3 className=' p-3 '>Registerpage</h3> 
           <div>
           <form  onSubmit={handleSubmit(Submit)} className="p-5">
   
   <div className='mt-2 mx-2'>
   <label htmlFor="name">Your Name</label>
     <input type="text" {...register("name", {required: true,maxLength: 25,pattern: /^[A-Za-z]+$/i})} />
     <br/>   {errors?.name?.type === "required" && <span className='text-warning'>🔺  This field is required</span>}
       {errors?.name?.type === "maxLength" && (
         <span>name less  p-3than 25 characters</span>
       )}
   </div>
    
 <div  className='mt-2 mx-2 '>
 <label htmlFor="email">Your Email</label>
     <input type="email" {...register("email", {required: true})} />
     <br/> {errors?.email?.type === "required" && <span className='text-warning'> 🔺  This field is required</span>}
      
 </div>

 <div>
          <label>Mobile :</label>
          <input
            type="number"
            {...register("mobile", { required: "🔺  Mobile field is required" })}
            onKeyUp={() => {
                trigger("mobile")
            }}
          />
        <br/>  {errors.mobile && (
            <small className='text-warning'>{errors.mobile.message}</small>
          )}
        </div>

      
 <div  className='mt-2 mx-2'>
 <label htmlFor="password">Your Password</label>
     <input type="text" {...register("password", {required: true, pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                message: "Invalid email address",
              },})}  onChange={(e) => setPassword(e.target.value)} />
      {errors?.Password?.type === "required" && <span className='text-warning'>🔺  This field is required</span>}
   
 </div>

 
    <div>
    <input type="submit" value="Submit" className=' btn btn-primary mt-2 btn-sm'/>
 <button className=' btn btn-primary mt-2 mx-3 btn-sm' onClick={LOGIN}>login page</button>
    </div>  
      
   </form>
              
           </div> </center> 
           </Online>
           <Offline>
<div className="text-center">
          <img src={IMGOFF} alt="" />
          </div>
</Offline>
    </div>
  )
}

export default Registerpage