import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import Event from "../components/Event";
import {findMyEvents} from '../actions/eventAction'
import Loading from "../components/Loader";
import Message from "../components/Message";


const MyEventsScreen = () => {
    const dispatch = useDispatch();
    
  const myEvents = useSelector((state) => state.myEvents);
  const { events, error, loading } = myEvents;

  useEffect(() => {
    dispatch(findMyEvents())
    
  }, [dispatch]);
  


  return (
    
    <>
         <h1> My Events</h1>
         {events===undefined?(<Loading/>):(<Row>
          {events.map((event) => (
            <Col key={event._id} sm={12} md={6} lg={4} xl={3}>
              <Event event={event} />
            </Col>
          ))}
        </Row>)
        }
     

    </>
  );
};

export default MyEventsScreen;
