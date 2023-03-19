
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import NavBar from './components/NavBar'
import ToDos from './pages/ToDos'


const App = () => {


  return (
    <>
      <NavBar />
      <div
        className="container d-flex flex-column justify-content-center align-items-center overflow-auto"
        style={{ minHeight: "90vh" }}
      >
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/todos' element={<ToDos />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
