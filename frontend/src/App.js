import './index.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import EventScreen from './screens/EventScreen';
import AddEventScreen from './screens/AddEventScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
const App=()=> {
  return (
    <Router>
    <Header/>
    <Container className='py-3 text-center' >
    <main className='main'>
      <Routes>
    <Route path='/login' element={<LoginScreen/>}/>
    <Route path='/register' element={<RegisterScreen/>}/>
    <Route path='/profile' element={<ProfileScreen/>} exact/>

     < Route path="/event/:id" element={<EventScreen/>} exact />
     < Route path="/addEvent" element={<AddEventScreen/>} exact />
     < Route path="/" element={<HomeScreen/>} exact />
     
     </Routes>
     </main>
    </Container>
     
    <Footer/> 
    </Router>
  );
}

export default App;
