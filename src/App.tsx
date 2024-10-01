// App.tsx

import React, { useState } from 'react';
import PageHeader from './components/PageHeader';
import Home from './screens/Home';
import Events from './screens/Events';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from './layouts/SideBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {setSidebarCollapsed(!isSidebarCollapsed);};

  return (
    <div className="flex flex-col h-screen">
      <PageHeader />
      <div className="flex flex-1 mt-16">
        <SideBar isSidebarCollapsed={isSidebarCollapsed} />
        <div className="flex-1 overflow-auto">
          <Router>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
