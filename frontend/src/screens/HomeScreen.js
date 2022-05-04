import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Event from "../components/Event";
import { listEvents } from "../actions/eventAction";
import Loading from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);

  const { events, error, loading } = eventList;

  

  useEffect(() => {
    dispatch(listEvents());
    
  }, [dispatch]);

  return (
    <>
      <h1>All Events</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {events.map((event) => (
            <Col key={event._id} sm={12} md={6} lg={4} xl={3}>
              <Event event={event} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
