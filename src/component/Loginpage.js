import React, { useState,useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form";
import { Offline, Online } from "react-detect-offline";
import IMGOFF from "./Imge/IMGOFF.jpg"
const AllUser = () => {
  const data = localStorage.getItem("users1");
  
  if(data){
      return JSON.parse(data)
  }else {
      return [];
  }
}

function Loginpage() {
  const admin =JSON.parse(localStorage.getItem("admin")) 
  const [user1,setUser1]=useState( admin)
  const{register,handleSubmit,formState:{errors}, reset}=useForm()

  const navigate = useNavigate()

const [user,setUser]=useState( AllUser)
const [email,setEmail]= useState("")
const [password,setPassword]= useState("")
const [msg,setMsg]=useState(false)

useEffect (() => {

},[])

const filtered_arr = [];
const Submit = () => {
  user.map((ele,i) => {
      if(ele.email === email){
          filtered_arr.push(ele)
      }
  })
  filtered_arr.map(ele => {
     if (password === ele.password){
         navigate("/admin")
     }else{
      setMsg(true)
      setTimeout(()=>{
        setMsg(false)
       },1500)
        
     }
  })
};


const RegisterUser=()=>{
  navigate("/register")
}
  return (<>
    <Online>
    
 <div className='container w-25 bg-warning mt-5 text-black shadow-lg p-2 mb-3  rounded-3 '>


    <center>
    <h3 className='border-bottom w-25 p-2 border-dark border-5'>Login</h3>
    <form  onSubmit={handleSubmit(Submit)}  className="p-5" >
   

   <div className='mt-2 mx-2'>
   <h6 className='font-weight-bold'>Your Email</h6>
       <input type="email" {...register("email", {required: true})} onChange={(e) => setEmail(e.target.value)} />
       <br/>  {errors?.email?.type === "required" && <span className='text-danger'>🔺 This field is required</span>}
        
   </div>
        
   <div className='mt-2 mx-2 '>
   <h6 >Your Password</h6>
       <input type="text" {...register("password", {required: true})} onChange={(e) => setPassword(e.target.value)} />
         {errors?.Password?.type === "required" && <span className='text-danger'>🔺  This field is required</span>}
     
   </div>
        
        
   
       
       <input type="submit" value="Submit" className='mt-3 mx-2 btn  btn-primary btn-sm'/>
       <button className=' btn btn-primary mt-3 mx-3 btn-sm' onClick={RegisterUser}>New User</button>

       {
         msg===true && <div className='mt-3 mx-2 p-2 bg-danger rounded-3 text-white'>Inccorrect Password </div>
       }
     </form>
    </center>
    </div>
   </Online>
 
   <Offline>
<div className='text-center' >
          <img src={IMGOFF} alt="" width="1000"  />
          </div>
</Offline>
  </>
  
   


  
  )
}

export default Loginpage


