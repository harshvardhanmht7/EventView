
import { useParams,useNavigate } from 'react-router-dom'
import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col,  Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listEventDetails } from '../actions/eventAction'


const EventScreen = () => {
    const {id}=useParams();
    

    const dispatch=useDispatch();
    const eventDetails=useSelector(state=>state.eventDetails)
    const {loading,error,event} =eventDetails

    const navigate =useNavigate();

    useEffect(()=>{
      dispatch(listEventDetails(id))
     
    
    },[dispatch,id])

    
  return (
    <>
    
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Card className="my-3 p-3">
      
        <h1>{event.name}</h1>
          <strong>{event.description}</strong>
      <Row>
        <Col><strong>Time : {event.time}</strong></Col>
        <Col><strong>Venue : {event.place}</strong></Col>
      </Row>
        
      
    </Card>
      )}
      
    </>
  )
}

export default EventScreen