import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import img from '../../assets/images/v4-460px-Take-Better-Notes-Step-1-Version-2.jpg.jpeg'

export default function SignIn() {


    let navigate = useNavigate()

    const [errorMsg,setErrorMsg]=useState('')
    const [loading,setLoading]=useState(true)

     function sendDataToApi(values){
        setLoading(false)
         axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn' , values).then(({data})=>{
            if(data.msg=='done'){
                localStorage.setItem('token',data.token)
                navigate('/home')
            }
         }).catch((err)=>{
            setErrorMsg(err.response.data.msg)
            setLoading(true)
         })
    }

    function validationSchema(){
        let schema = new Yup.object({
            email: Yup.string().email().required('You have to enter your email'),
            password: Yup.string().required('You have to enter your password'),
    
        })

        return schema
    }


    let signin=useFormik({
        initialValues : {
            email:'',
            password:'',
        },
        validationSchema,
        onSubmit: (values)=>{
            sendDataToApi(values)
        }  
    })
  return (
    <>
    <div className="mx-5 pe-4 mt-5 bg-white">
    <div className="row">
        <div className="col-md-6">
        <div className="div position-relative">
            <img src={img} className='w-100' alt="" />
            <div className="lay"></div>
        </div>
        </div>
        <div className="col-md-6 mt-5">
        <div className=' mx-auto'>
        <h3>Welcome back</h3>
        <p>Thanks for returning! pleasesign in to access your account.</p>
        <form onSubmit={signin.handleSubmit}>

            <input placeholder='Email' onBlur={signin.handleBlur} value={signin.values.email} onChange={signin.handleChange} type="email" name='email' className='form-control mb-3' id='email'/>

            {signin.errors.email && signin.touched.email?<div className="alert alert-danger">{signin.errors.email}</div>:''}

            
            <input placeholder='Password' onBlur={signin.handleBlur} value={signin.values.password} onChange={signin.handleChange} type="password" name='password' className='form-control mb-3' id='password'/>

            {signin.errors.password && signin.touched.password?<div className="alert alert-danger">{signin.errors.password}</div>:''}

            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}

            <button  type='submit' className='btn bt-bgr text-white w-100'>
                {loading?'Login':<i className='fa fa-spinner fa-spin'></i>}
            </button>
            <p className='text-center mt-2'>You don't have account yet? <Link className='col' to="/register">Sign up</Link></p>
        </form>
      </div>
        </div>
    </div>
    </div>
      
    </>
  )
}