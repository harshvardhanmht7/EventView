import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart,addEvent } from '../actions/eventAction'
import FormContainer from '../components/FormContainer'

const AddEventScreen = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const eventAdd=useSelector(state=>state.eventAdd)
  const {eventInfo}=eventAdd  

const [name,setName]=useState('')
const [description,setDescription]=useState('')
const [time,setTime]=useState('')
const [place,setPlace]=useState('')
const [message,setMessage]=useState(null)

useEffect(()=>{
  if(eventInfo){
    navigate('/')
  }

})


  const submitHandler=(e)=>{
    e.preventDefault()
   
    if(name&&description&&time&&place){
      dispatch(addEvent(name,description,time,place))
     
    }
    else
    {
       setMessage('All fields are mandatory !')
    }

  }




  return(
    <FormContainer>
    
       {message && <Message variant='danger'>{message}</Message>}
    <Form  onSubmit={submitHandler} >
      <Form.Group controlId='name'>
        <Form.Label>Title</Form.Label>
       <Form.Control type='text' placeholder='Please Enter the title of event' value={name} onChange={(e)=>setName(e.target.value)}>
       </Form.Control>
      </Form.Group>

      <Form.Group controlId='Description'onChange={(e)=>setDescription(e.target.value)}>
        <Form.Label>Description</Form.Label>
       <Form.Control as="textarea" rows={5} placeholder='Please Enter the description of event'>
       </Form.Control>
      </Form.Group>

      <Form.Group controlId='time' onChange={(e)=>setTime(e.target.value)}>
        <Form.Label>Time</Form.Label>
       <Form.Control type='text' placeholder='Please Enter the Time'>
       </Form.Control>
      </Form.Group>
      
      <Form.Group controlId='place' onChange={(e)=>setPlace(e.target.value)}>
        <Form.Label>Venue</Form.Label>
       <Form.Control type='text' placeholder='Please Enter the Venue'>
       </Form.Control>
      </Form.Group>


      <Button type='submit'>Submit</Button>

    </Form>
    </FormContainer>
  )
    
  
}

export default AddEventScreen