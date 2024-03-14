import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { noteState } from '../Atoms/NoteAtom';
import Notes from '../Notes/Notes';





export default function Home() {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let[noteLength, setNoteLength]=useRecoilState(noteState)
  let [allNotes, setAllNotes] = useState([])

  useEffect(()=>{
    getUserNotes()
  },[])

let formik = useFormik({
  initialValues:{
    title:"",
    content:""
  },
  validate:function(values){
    
  },
  onSubmit:addNote
})

function addNote(values){
  axios.post('https://note-sigma-black.vercel.app/api/v1/notes',values,{
    headers:{
      token:`3b8ny__${localStorage.getItem('token')}`
    }
  }).then(()=>{getUserNotes()}).catch((err)=>{console.log(err)}).finally(()=>handleClose())
}

function getUserNotes(){
  axios.get('https://note-sigma-black.vercel.app/api/v1/notes',{
    headers:{
      token:`3b8ny__${localStorage.getItem('token')}`
    }
  }).then((res)=>{
    setNoteLength(res.data.notes.length);
    setAllNotes(res.data.notes)
  })
  .catch((err)=>{console.log(err)})
}


  return (
    
<div className='d-flex flex-column w-100'>
    <div>
    <div className=' w-100 d-flex justify-content-center'>
    <div className=' bt-bgr text-white m-3 p-2 rounded'>My Notes: {noteLength}</div>
    <button variant="primary" onClick={handleShow} className=' btn bt-bgr text-white m-3'>+ New Note</button>
    </div>
    </div>
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='d-flex flex-column'>
            <input onChange={formik.handleChange} className='form-control my-2' type="text" name='title' id='title' placeholder='Please enter title' />
            <textarea onChange={formik.handleChange} className='form-control my-2' name="content" id="content" placeholder='Please enter content'></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="" className='bt-bgr text-white' onClick={formik.handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      

      <div className="container">
      <div className="row">
        {allNotes.map(note=>{
          return <Notes key={note._id} note={note} getUserNotes={getUserNotes}/>
        })}
      </div>
      </div>
      
      </div>
  )
}