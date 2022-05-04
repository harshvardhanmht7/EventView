import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL
} from '../constants/userContants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//logout 

export const logout=()=>async(dispatch)=>{
  try {
    localStorage.removeItem('userInfo')
    dispatch({
      type:USER_LOGOUT
    })
    

  } catch (error) {
    console.log('error in logout action!')
    
  }
}



export const register = (name,email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/api/users',
      { name,email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })


    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


//GET user Profile 
//for //users/profile


export const getUserDetails = () => async (dispatch,getState) => {
  
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    })

    const  {userLogin:{userInfo}}=getState()


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:`${userInfo.token}`
      },
    }
    
    const { data } = await axios.get(
      `http://localhost:5000/api/users/profile`,
      config
    )

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    })
    
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}




//PUT user Profile 
//Update user details in Profile
//for //users/profile


export const updateUserDetails = (name,email,password) => async (dispatch,getState) => {
  
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const  {userLogin:{userInfo}}=getState()


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:`${userInfo.token}`
      },
    }
   

    const { data } = await axios.put(
      `http://localhost:5000/api/users/profile`,{
        name,email,password
      },
      config
    )

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}