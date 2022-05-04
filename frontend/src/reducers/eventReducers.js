import {
   EVENT_DETAILS_REQUEST,
   EVENT_LIST_SUCCESS,
   EVENT_LIST_FAIL,
   EVENT_DETAILS_SUCCESS,
   EVENT_DETAILS_FAIL,
   ADD_EVENT_REQUEST,ADD_EVENT_SUCCESS,REMOVE_EVENT, CLEAR_EVENT
} from '../constants/eventConstant'


export const eventListReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return { loading: true, events: [] }
    case EVENT_LIST_SUCCESS:
      return { loading: false, events: action.payload }
    case EVENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const eventDetailsReducer = (
  state = { event: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case EVENT_DETAILS_SUCCESS:
      return { loading: false, event: action.payload }
    case EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}



export const eventAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EVENT_REQUEST:
      return { loading: true }
    case ADD_EVENT_SUCCESS:
      return { loading: false, eventInfo: action.payload }
    case CLEAR_EVENT:
      return { }
    case REMOVE_EVENT:
      return { loading: false, error: action.payload }
    
    default:
      return state
  }
}