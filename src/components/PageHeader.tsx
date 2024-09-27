import { Bell, Settings, ArrowLeft } from 'lucide-react'; // Import ArrowLeft from lucide-react
import React, { useState } from 'react';

function PageHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar visibility

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between mt-4'>
      {/* Left Side: Settings Icon and Left Arrow Button */}
      <div className='flex items-center'>
        {/* Left Arrow Button for Small Screens */}
        <button onClick={toggleSidebar} className='md:hidden mr-2 flex items-center bg-gray-300 rounded-md p-1'>
          <ArrowLeft className='h-5 w-5 text-gray-800' />
        </button>
        <Settings className='ml-3 mt-4 md:mt-0' />
        {/* ShowOps title only on larger screens */}
        <h1 className='hidden md:block text-xl text-center ml-2 mt-3 md:mt-0'>ShowOps</h1>
      </div>

      {/* Center: Search Bar (Only in Hamburger for Small Screens) */}
      <div className='relative mt-4 md:mt-0'>
        {/* Search Bar for Large Screens */}
        <input
          type="search"
          placeholder="Search ShowOps"
          className='hidden md:block transition-all duration-300 w-full text-sm bg-white pl-10 pr-10 py-1 shadow-sm border border-gray-200 rounded-sm'
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

      {/* Right Side: Hamburger and Icons */}
      <div className='relative flex justify-end items-center md:flex-none'>
        <button onClick={toggleMenu} className='md:hidden mr-4 mt-2'>
          <div className='h-7 w-7 flex flex-col justify-between'>
            <div className='h-1 bg-gray-800'></div>
            <div className='h-1 bg-gray-800'></div>
            <div className='h-1 bg-gray-800'></div>
          </div>
        </button>

        <div className='hidden md:flex items-center mr-4'>
          <Bell className='bg-slate-200 h-7 rounded-sm w-7' />
          <img
            src={`${process.env.PUBLIC_URL}/assets/Avatar.png`} // Replace with the actual image path
            alt="User"
            className='h-7 w-7 rounded-sm ml-2'
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
                src={`${process.env.PUBLIC_URL}/assets/Avatar.png`} // Replace with the actual image path
                alt="User"
                className='h-7 w-7 rounded-sm'
              />
              <span className='ml-2'>Profile</span>
            </div>

            {/* Search Button inside Hamburger Menu */}
            <div className='flex items-center mb-2' onClick={toggleSearch}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/srchIcon.png`}
                className="w-5 h-5"
                alt="Search Icon"
              />
              <span className='ml-2'>Search</span>
            </div>
            {isSearchOpen && (
              <div className='mt-2'>
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
      </div>

      {/* Sidebar to show ShowOps title when the arrow is clicked */}
      {isSidebarOpen && (
        <div className='fixed left-0 top-0 h-full bg-white shadow-md w-48 p-4 z-10'>
          <h1 className='text-xl text-center'>ShowOps</h1>
          <button onClick={toggleSidebar} className='mt-2 text-gray-600'>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default PageHeader;
