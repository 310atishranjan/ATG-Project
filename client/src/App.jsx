import './App.css'
import {Route} from 'react-router-dom';
import Register from './components/Register';
import { BrowserRouter as Router,Routes} from 'react-router-dom'
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EmailSend from './components/EmailSend';
import ChangePassword from './components/ChangePassword';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/emailsend' element={<EmailSend/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      </Routes>
      <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}
export default App