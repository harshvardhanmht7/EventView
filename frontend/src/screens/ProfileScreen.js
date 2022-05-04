import React, { useEffect,useReducer,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Navigate, useParams} from 'react-router-dom'
import { getUserDetails,updateUserDetails } from '../actions/userAction'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'


const ProfileScreen = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [updateValue,setUpdateValue]=useState(false)

  const dispatch = useDispatch()
  
  const userDetails = useSelector((state) => state.userDetails)
 
  const { loading, error, user } = userDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userUpdateDetails =useSelector(state=>state.userUpdateDetails)
  
 
  useEffect(() => {

    if(!user){
      dispatch(getUserDetails())
    }
    else{
      setName(user.name)
      setEmail(user.email)
    }
    
    
    

  }, [dispatch,user])

  const updateHandler=()=>{

    setUpdateValue(!updateValue)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if(password!==confirmPassword){
        setMessage('Password do not match')
    }
    else{
       dispatch(updateUserDetails(name,email, password))
       setUpdateValue(false)
    }
  }
 

  return (
    
    <FormContainer>
      <h1>User Details</h1>
      {error && <Message variant='danger'>{error}</Message>}

      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Your Name'
            value={name}
            readOnly={updateValue===true?false: true}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            readOnly={updateValue===true?false: true}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'  hidden={ updateValue===true?false: true}>
          <Form.Label>Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
           
            onChange={(e) => setPassword(e.target.value)}
           
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'  hidden={ updateValue===true?false: true}>
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='confirm password'
            value={confirmPassword}
           
            onChange={(e) => setconfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2' hidden={ updateValue===true?false: true}  >
          Update Profile
        </Button>
      </Form>

      <Row className='py-3'>
        <Col hidden={updateValue===true?true:false}>
          Do You want to Update Profile ?{' '}
         <Button onClick={updateHandler} >
            Update
          </Button>
        </Col>

        <Col hidden={updateValue===true?false:true}>
          Don't want to update Profile ?{' '}
         <Button onClick={updateHandler} >
            Read Only
          </Button>
        </Col>

      </Row>
    </FormContainer>
  )
}

export default ProfileScreen
