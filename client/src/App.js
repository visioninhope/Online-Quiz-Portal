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
import Exams from "./pages/admin/Exams";
import AddEditExams from "./pages/admin/Exams/AddEditExams";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import WriteExam from "./pages/user/WriteExam";




function App() {
  const {loading}=useSelector(state=>state.loader);
  return (
    <>
    {loading && <Loader/>}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/user/write-exam/:id" element={<ProtectedRoute><WriteExam /></ProtectedRoute>} />
          {/* Admin Routes */}
          <Route path="/admin/exams" element={<ProtectedRoute><Exams /></ProtectedRoute>} />
          <Route path="/admin/exams/add" element={<ProtectedRoute><AddEditExams /></ProtectedRoute>} />
          <Route path="/admin/exams/add/:id" element={<ProtectedRoute><AddEditExams /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
