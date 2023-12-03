//import { Button, Flex } from 'antd';
import "./stylesheets/theme.css"
import "./stylesheets/alignments.css"
import "./stylesheets/textelements.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/common/Register';
import Login from './pages/common/Login';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/common/Home";
import './stylesheets/layout.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
