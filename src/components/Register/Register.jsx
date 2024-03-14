import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import img from '../../assets/images/v4-460px-Take-Better-Notes-Step-1-Version-2.jpg.jpeg'

export default function Register() {


    let navigate = useNavigate()

    const [errorMsg,setErrorMsg]=useState('')
    const [loading,setLoading]=useState(true)

     function sendDataToApi(values){
        setLoading(false)
         axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp' , values).then(({data})=>{
            if(data.msg=='done'){
                navigate('/signin')
            }
         }).catch((err)=>{
            setErrorMsg(err.response.data.msg)
            setLoading(true)
         })
    }

    function validationSchema(){
        let schema = new Yup.object({
            name: Yup.string().min(3).max(20).required(),
            email: Yup.string().email().required(),
            password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ , 'You need Minimum eight characters, at least one uppercase letter, one lowercase letter and one number').required(),
            age: Yup.string().matches(/^\S[0-9]{0,3}$/).required(),
            phone: Yup.string().matches( /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ , 'Phone number is not valid').required()
        })

        return schema
    }


    let signup=useFormik({
        initialValues : {
            name:'',
            email:'',
            password:'',
            age:'',
            phone:'',
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
        <h3>Create an account</h3>
        <form onSubmit={signup.handleSubmit}>
            
            <input placeholder='Username' onBlur={signup.handleBlur} value={signup.values.name} onChange={signup.handleChange} type="text" name='name' className='form-control mb-3' id='name'/>


            
            {signup.errors.name && signup.touched.name?<div className="alert alert-danger">{signup.errors.name}</div>:''}

            
            <input placeholder='Email' onBlur={signup.handleBlur} value={signup.values.email} onChange={signup.handleChange} type="email" name='email' className='form-control mb-3' id='email'/>

            {signup.errors.email && signup.touched.email?<div className="alert alert-danger">{signup.errors.email}</div>:''}

            
            <input placeholder='Password' onBlur={signup.handleBlur} value={signup.values.password} onChange={signup.handleChange} type="password" name='password' className='form-control mb-3' id='password'/>

            {signup.errors.password && signup.touched.password?<div className="alert alert-danger">{signup.errors.password}</div>:''}

            
            <input placeholder='Age' onBlur={signup.handleBlur} value={signup.values.age} onChange={signup.handleChange} type="number" name='age' className='form-control mb-3' id='age'/>

            {signup.errors.age && signup.touched.age?<div className="alert alert-danger">{signup.errors.age}</div>:''}

            
            <input placeholder='Phone' onBlur={signup.handleBlur} value={signup.values.phone} onChange={signup.handleChange} type="number" name='phone' className='form-control mb-3' id='phone'/>

            {signup.errors.phone && signup.touched.phone?<div className="alert alert-danger">{signup.errors.phone}</div>:''}

            


            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}




            <button disabled={!(signup.dirty && signup.isValid)} type='submit' className='btn bt-bgr text-white w-100'>
                {loading?'Create account':<i className='fa fa-spinner fa-spin'></i>}
            </button>

            <p className='text-center mt-2'>Already have account? <Link className='col' to="/signin">Log in</Link></p>
        </form>
      </div>
        </div>
    </div>
    </div>
      
    </>
  )
}