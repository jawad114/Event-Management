import React from 'react';
import logo from './logo.svg';
import './App.css';
import PageHeader from './components/PageHeader';
import Home from './screens/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import SideBar from './layouts/SideBar';

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex flex-col h-screen">
      <PageHeader />
      <div className="flex flex-1 mt-16">
        <SideBar isSidebarCollapsed={isSidebarCollapsed} />
        <div className="flex-1 overflow-auto">
          <Home />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
