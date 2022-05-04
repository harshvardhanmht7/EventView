import axios from "axios";
import {
  EVENT_LIST_REQUEST,
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_SUCCESS,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  CLEAR_EVENT,
  REMOVE_EVENT,
  MY_EVENTS_REQUEST,
  MY_EVENTS_SUCCESS
  
} from "../constants/eventConstant";


export const listEvents = () => async (dispatch) => {

  
  try {
    dispatch({type :EVENT_LIST_REQUEST });

    const { data } = await axios.get("/api/events");
    
    
    dispatch({
      type: EVENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });

    const { data } = await axios.get( `/api/events/${id}`);

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const addEvent=(name,description,time,place)=>async(dispatch,getState)=>{
 

  try {

      dispatch({
          type:ADD_EVENT_REQUEST
      })
   
      const  {userLogin:{userInfo}}=getState()

      const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization:`${userInfo.token}`
          },
        }
      
      const {data}=await axios.post(`/api/events/addEvent`,{name,description,time,place},config)
      

      dispatch({
          type:ADD_EVENT_SUCCESS,
          payload:data
      })
      dispatch({
          type:CLEAR_EVENT
      })

    

  } catch (error) {
      console.log('error while adding an event')
      
  }

} 




export const findMyEvents=()=>async(dispatch,getState)=>{
 
  try {

      dispatch({
          type:MY_EVENTS_REQUEST
      })
   
      const  {userLogin:{userInfo}}=getState()

      const config = {
          headers: {
            Authorization:`${userInfo.token}`
          },
        }
      
      const {data}=await axios.get(`/api/myevents`,config)

    

      dispatch({
          type:MY_EVENTS_SUCCESS,
          payload:data
      })
     

  } catch (error) {
      console.log('error while fetching all events from action !')
      
  }

} 