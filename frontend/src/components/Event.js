import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


const Event = ({ event }) => {
  return (
    <Card className="my-3 p-3">
      <Link to={`/event/${event._id}`} style={{ textDecoration: "none" }}>
        <h1>{event.name}</h1>

        {event.description.length >= 25 ? (
          <strong>{event.description.substring(0, 25)}...</strong>
        ) : (
          <strong>{event.description}</strong>
        )}
        <br/>
        <strong>Time :{event.time}</strong>
      </Link>
    </Card>
  );
};

export default Event;
