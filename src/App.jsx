import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import PasswordReset from './pages/PasswordReset';
import Settings from './pages/Settings';
import { Context } from './api/Context';
import TransportSearch from './pages/TransportSearch';
import News from './pages/News';

function App() {
  const {user} = useContext(Context);

  const Routing = ({children}) => {
    if(!user){
      return <Navigate to={'/login'}/>
    }
    return children
  }
  
  return(
      <div className="App">
        <Router>
          <Routes>
            <Route index element={<Routing><Home/></Routing>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/search' element={<Routing><TransportSearch/></Routing>}/>
            <Route path='/chat' element={<Routing><Chat/></Routing>}/>
            <Route path='/news' element={<Routing><News/></Routing>}/>
            <Route path='/profile' element={<Routing><Profile/></Routing>}/>
            {/* <Route path='/profile/:id' element={<Profile/>}/> */}
            <Route path='/passwordReset' element={<PasswordReset/>}/>
            <Route path='/settings' element={<Routing><Settings/></Routing>}/>
          </Routes>
        </Router>
      </div>
);
}

export default App;
