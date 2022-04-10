import React, {useEffect,  useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import IMGOFF from "./Imge/IMGOFF.jpg"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import '../App.css'
//get the all user
const alluser = () => {
  const user1data = localStorage.getItem("users1");
  if(user1data){
      return JSON.parse(user1data)
  }else {
      return [];
  }
}


function Loginpage() {

  

  const navigate = useNavigate()

const [user,setUser]=useState( alluser)
const [email,setEmail]= useState("")
const [password,setPassword]= useState("")
const[hide,setHide]=useState(false)
const [password1,setPassword1]= useState("")

///form validation part
const formSchema = Yup.object().shape({
 email: Yup.string().email().required(),
 password: Yup.string().matches(password1, 'Passwords does not match')
    
 .min(8, 'Password must be at 8 char long') .required('Password is mendatory'),
   })
 const formOptions = { resolver: yupResolver(formSchema) }
 const { register, handleSubmit, reset, formState } = useForm(formOptions)
 const { errors } = formState
 //END FORM VALIDATION

 useEffect (() => {

},[])

const filtered_arr = [];
// submit form login
const Submit = () => {
  user.map((ele,i) => {
      if(ele.email === email){
          filtered_arr.push(ele)
      }
  })
  filtered_arr.map(ele => {
     if (password === ele.password){
         navigate("/admin")
        
     }else {
      
     }
  })
};

// go to register page
const RegisterUser=()=>{
  navigate("/register")
}
//password hide and sho
const passHide=()=>{
 hide===true? setHide(false):setHide(true)
 
}


  return (<>

<Online>
    <div className="container  f1  mt-5 text-white shadow-lg p-3 mb-3  rounded-3">
      <h2>Register form</h2>
      <form onSubmit={handleSubmit(Submit)}>
     
      
        <div className="form-group">
          <label className='text-white'>Email Id</label>
         <div className="row">
           <div className="col-11"> <input
            name="email"
            type="text"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
           <div className="invalid-feedback">{errors.email?.message}</div></div>
           <div className="col-1"></div>
         </div>
         
        </div>

      

        <div className="form-group ">
          <label className='text-white'>Password</label>
         <div className="row">
           <div className="col-11"> <input
            name="password"
            type={hide===false?"password":"text"}
            {...register('password')}
            className={`form-control  ${errors.password ? 'is-invalid' : ''}`}
            onChange={(e)=>{setPassword(e.target.value)}  } onkeyup={(E)=>{setPassword1(E.target.value)}}
          /> <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
           <div className="col-1 text-center"> <div  onClick={passHide}>{hide===false?<i class="fa fa-eye-slash text-white" aria-hidden="true"></i>: <i class="fa fa-eye text-white" aria-hidden="true"></i>}</div></div>
         </div>
       
        </div>
        
      
        <div className="mt-3">
          <button type="submit" className="btn btn-primary btn-sm mt-2">
            Submit
          </button>
        
       <button className=' btn btn-primary mt-2 mx-3 btn-sm' onClick={RegisterUser}>New User</button>

        </div>
      </form>
      <div className="invalid-feedback">{errors.email?.message}</div>
        
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


