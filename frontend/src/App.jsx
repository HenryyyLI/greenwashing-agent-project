import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home/Home";
import History from "./pages/History/History";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
          <Route path='/history' element={authUser ? <History /> : <Navigate to='/login' />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
