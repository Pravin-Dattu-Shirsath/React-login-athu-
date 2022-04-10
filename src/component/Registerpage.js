import React, {useEffect,  useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import IMGOFF from "./Imge/IMGOFF.jpg"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
//get the all user
const alluser = () => {
  const user1data = localStorage.getItem("users1");
  if(user1data){
      return JSON.parse(user1data)
  }else {
      return [];
  }
}

function Registerpage() {
  const navigate=useNavigate()
const [user,setUser]=useState(alluser())
const[hide,setHide]=useState(false)
const[hide1,setHide1]=useState(false)
useEffect(()=>{
  localStorage.setItem("users1", JSON.stringify(user))
})
//form submit function
function onSubmit(data) {
    setUser([...user,data])
    navigate("/")
  alert("successfully register")
   return false
 }



  ///form validation part
  const formSchema = Yup.object().shape({
   
   fname:Yup.string().required(),
   lname: Yup.string().required(),
   email: Yup.string().email().required(),
   phone: Yup.string().required(),
    password: Yup.string()
      .required('Password is mendatory')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Stuname@123 its type  write password"
            )
      .min(8, 'Password must be at 8 char long'),
    confirmPwd: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  
  // navigate page
 const login=()=>{
navigate("/")
 }
 //password hide and sho
const passHide=()=>{
  hide===true? setHide(false):setHide(true)
  
 }
 const passHide1=()=>{
  hide1===true? setHide1(false):setHide1(true)
  
 }
  return (
    <>
    <Online>
    <div className="container  f1 mt-5 text-white shadow-lg p-3 mb-3  rounded-3">
      <h2>Register form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
          <label className='text-white'> First Name</label>
          <input
            name="name"
            type="text"
            {...register('fname')}
            className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.fname?.message}</div>
        </div>

      <div className="form-group">
          <label className='text-white'>Last Name</label>
          <input
            name="lname"
            type="text"
            {...register('lname')}
            className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.lname?.message}</div>
        </div>
      
        <div className="form-group">
          <label className='text-white'>Email Id</label>
          <input
            name="email"
            type="text"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group ">
          <label className='text-white'> Mobile No.</label>


          <input
            name="phone"
            type="text"
            {...register('phone')}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.phone?.message}</div>
        </div>

        <div className="form-group ">

          <label className='text-white'>Password</label>
          <div className="row">
  <div className="col-11"><input
            name="password"
            type={hide===false?"password":"text"}
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
           <div className="invalid-feedback">{errors.password?.message}</div></div>
  <div className="col-1">
  <div  onClick={passHide}>{hide===false?<i class="fa fa-eye-slash text-white" aria-hidden="true"></i>: <i class="fa fa-eye" aria-hidden="true"></i>}</div>
         
  </div>
</div>
          
        
        </div>
        
        <div className="form-group">
        
          <label className='text-white'>Confirm Password</label>
          <div className="row">
  <div className="col-11"> <input
            name="confirmPwd"
            type={hide1===false?"password":"text"}
            {...register('confirmPwd')}
            className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
          /> 
           <div className="invalid-feedback">{errors.confirmPwd?.message}</div></div>
  <div className="col-1"> 
   <div className=" text-black" onClick={passHide1}>
   {hide1===false?<i class="fa fa-eye-slash text-white" aria-hidden="true"></i>
                 : <i class="fa fa-eye text-white" aria-hidden="true"></i>}</div>
        </div>
</div>
         
         
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-primary btn-sm mt-2 mx-2">
            Submit
          </button>
          <button onClick={login} className="btn btn-primary  btn-sm mt-2 mx-2">
           login page
          </button>
          <button  className="btn btn-primary  btn-sm mt-2">
           Forgot Password
          </button>
        </div>
      </form>
    </div>
    </Online>
    <Offline>
 <div className="text-center">
          <img src={IMGOFF} alt="" />
           </div> </Offline> 
            </>
  )
}

export default Registerpage
