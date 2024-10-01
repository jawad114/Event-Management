import { Bell, Settings, ArrowLeft, Home, BookDashed, LayoutDashboard, Calendar, CalendarClock, HandPlatter, Settings2, LogOut } from 'lucide-react'; 
import React, { useState } from 'react';
import SmallSideBar from './SmallSideBar';
import LargeSideBarSection from './LargeSideBarSection';
import LargeSideBarItems from './LargeSideBarItems';
import { ToastContainer,toast  } from 'react-toastify';

function PageHeader() {
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
   
    toast.success("Logout successful!"); 
  };

  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between lg:mt-4 mt-14'>

      <div className='flex items-center justify-between w-full md:hidden'>
   
        <button onClick={toggleSidebar} className='flex items-center bg-gray-300 rounded-md p-1'>
          <ArrowLeft className='h-5 w-5 text-gray-800' />
        </button>
        

        <button onClick={toggleMenu} className='mr-4 mt-2'>
          <div className='h-7 w-7 flex flex-col justify-between'>
            <div className='h-1 bg-gray-800'></div>
            <div className='h-1 bg-gray-800'></div>
            <div className='h-1 bg-gray-800'></div>
          </div>
        </button>
      </div>

      <div className='flex items-center hidden md:flex flex-shrink-0'>
       
       <Settings className='ml-3 mt-4 md:mt-0' />
       
       <h1 className='text-xl text-center ml-2 mt-3 md:mt-0'>ShowOps</h1>
     </div>

      <div className='mt-4 md:mt-0 flex flex-shrink-0 lg:ml-[-1000px] md:ml-[1000px] w-full md:w-auto'>
  <div className='relative w-full lg:mr-60 ml-60'>
    <input
      type="search"
      placeholder="Search ShowOps"
      className='hidden md:block transition-all duration-300 w-full text-sm bg-white pl-10 pr-10 py-1 shadow-sm border border-gray-200 rounded-sm '
      style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}
    />
    <button className="absolute inset-y-0 right-0 flex items-center pr-2 hidden md:block">
      <img
        src={`${process.env.PUBLIC_URL}/assets/srchIcon.png`}
        className="w-5 h-5"
        alt="Search Icon"
      />
    </button>
  </div>
</div>

 
      <div className='relative flex justify-end items-center md:flex-none hidden md:flex'>
        <Bell className='bg-slate-200 h-7 rounded-sm w-7' />
        <img
          src={`${process.env.PUBLIC_URL}/assets/Avatar.png`} 
          alt="User"
          className='h-7 w-7 rounded-sm ml-2 mr-3'
        />
      </div>

      {isMenuOpen && (
        <div className='absolute right-0 bg-white shadow-md rounded-md p-2'>
          <div className='flex items-center mb-2' onClick={toggleMenu}>
            <Bell className='bg-slate-200 h-7 rounded-sm w-7' />
            <span className='ml-2'>Notifications</span>
          </div>
          <div className='flex items-center mb-2' onClick={toggleMenu}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/Avatar.png`} 
              alt="User"
              className='h-7 w-7 rounded-sm'
            />
            <span className='ml-2'>Profile</span>
          </div>

          <div className='flex items-center mb-2' onClick={toggleSearch}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/srchIcon.png`}
              className="w-5 h-5"
              alt="Search Icon"
            />
            <span className='ml-2'>Search</span>
          </div>
          {isSearchOpen && (
          <div className='mt-2 '>
          <input
            type="search"
            placeholder="Search ShowOps"
            className='transition-all duration-300 w-full text-sm bg-white pl-10 pr-10 py-1 shadow-sm border border-gray-200 rounded-sm'
            style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}
          />
        </div>
        
         
          )}
        </div>
      )}


      {isSidebarOpen && (
        <div className='fixed left-0 top-0 h-full bg-white shadow-md w-48 p-4 z-10'>
   
          <div className='flex justify-between items-center'>
            <h1 className='text-xl'>ShowOps</h1>
            <Settings className='mr-11 mt-1' /> 
          </div>
          <div className='mt-16'>
            <LargeSideBarSection>
              <LargeSideBarItems Icon={LayoutDashboard} title="Dashboard" url="/home" isActive={true} /> 
              <LargeSideBarItems Icon={Calendar} title="Calendar" url="/" isActive={false} /> 
              <LargeSideBarItems Icon={CalendarClock} title="Events" url="/events" isActive={false} /> 
              <LargeSideBarItems Icon={HandPlatter} title="Offer & Deals" url="/" isActive={false} /> 
              <LargeSideBarItems Icon={Settings2} title="Settings" url="/" isActive={false} /> 
              
              <LargeSideBarItems 
            Icon={LogOut} 
            title="Logout" 
            url="/" 
            isActive={false} 
            onClick={handleLogout} 
          />

            </LargeSideBarSection>
          </div>
          <button onClick={toggleSidebar} className='mt-2 text-gray-600'>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default PageHeader;
 