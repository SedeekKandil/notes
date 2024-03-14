import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Notes({note , getUserNotes}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let formik = useFormik({
    initialValues:{
      title:"",
      content:""
    },
    validate:function(values){
      
    },
    onSubmit:updateNote
  })


  function updateNote(values){
    axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,values,{
      headers:{
        token:`3b8ny__${localStorage.getItem('token')}`
      }
    }).then((res)=>{getUserNotes()}).catch((err)=>{
      console.log(err)
    }).finally(()=>handleClose())
  }



  function deleteNote(){
    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
    {
      headers:{
        token:`3b8ny__${localStorage.getItem('token')}`
      }
    }).then((res)=>{getUserNotes()}).catch((err)=>{
      console.log(err)
    }).finally(()=>handleClose())
  }


  return (
    <>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='d-flex flex-column'>
            <input  onChange={formik.handleChange} className='form-control my-2' type="text" name='title' id='title' placeholder='Please enter title' />
            <textarea  onChange={formik.handleChange} className='form-control my-2' name="content" id="content" placeholder='Please enter content' ></textarea>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="" className='bt-bgr text-white' onClick={formik.handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>


<div className="col-md-6">
        <div className='bg-white px-3 py-2 my-3'>
            <h3 className='text-black'>{note.title}</h3>
        <p className='text-black'>{note.content}</p>
        
        
        <div>
            <button variant="" onClick={handleShow} className='border border-0 bt-bgr rounded-circle me-3'>
            <i className="fa-solid fa-pen-to-square text-white" />
            </button>
            <button variant="" onClick={()=>{deleteNote()}} className='border border-0 bt-bgr rounded-circle'>
            <i className="fa-solid fa-trash text-white" />
            </button>
</div>

        </div>
        </div>

      
        
      
    </>
  )
}
