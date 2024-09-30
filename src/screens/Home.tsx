import { AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Home() {
  const [videoLink, setVideoLink] = useState('');
  const [videoError, setVideoError] = useState('');

  // Function to validate video link
  const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setVideoLink(link);
    if (!link.startsWith('https')) {
      setVideoError('Video link must start with https');
    } else {
      setVideoError('');
    }
  };

  // Function to handle event creation and show toast
  const handleEventCreation = () => {
    const eventDate = new Date().toLocaleDateString(); // Get today's date
    toast.success(
        <div className='w-96 flex items-center justify-between'>
        <span>
          Event created on <strong>{eventDate}</strong>
          <a href="/edit-event" className="text-green-600 ml-1 mr-2 whitespace-nowrap">Edit Event</a>
        </span>
  
      </div>
      
      , 
      {
        className: 'bg-white', // Custom class for white background
        bodyClassName: 'text-black', // Custom class for text color
        closeButton: false, // Optionally disable close button
        progressClassName: 'bg-green-600', // Custom class for progress bar
        
      }
    );
  };
  return (
    <div className="flex flex-col items-start p-8 md:ml-28 mt-9">
      {/* Warnings or error messages */}
      <div className="flex items-center mb-4">
        <AlertCircle className="text-red-600 mr-2" />
        <span className="text-sm text-red-600">Error Messages here</span>
      </div>

      {/* Title and description */}
      <h1 className="text-2xl font-bold mb-2">Create Event</h1>
      <p className="text-sm text-gray-600 mb-4">Fill in the details to create your event.</p>

      {/* Event Name */}
      <label className="text-sm font-semibold mb-2">Event Name</label>
      <input
        type="text"
        className="border p-2 mb-4 w-full max-w-md rounded-lg"
        placeholder="Enter event name"
      />

      {/* Date and Time Zone */}
      <div className="grid grid-cols-2 gap-4 mb-4 max-w-md">
        <div>
          <label className="text-sm font-semibold">Select Date</label>
          <input type="date" className="border p-2 w-full rounded-lg" />
        </div>
        <div>
          <label className="text-sm font-semibold">Select Time Zone</label>
          <select className="border p-2 w-full rounded-lg">
            <option value="PST">PST</option>
            <option value="EST">EST</option>
            <option value="UTC">UTC</option>
            <option value="CST">CST</option>
            <option value="MST">MST</option>
          </select>
        </div>
      </div>

      {/* Start and End Time */}
      <div className="grid grid-cols-2 gap-4 mb-4 max-w-md">
        <div>
          <label className="text-sm font-semibold">Start Time</label>
          <input type="time" className="border p-2 w-full rounded-lg" />
        </div>
        <div>
          <label className="text-sm font-semibold ml-10 ">End Time</label>
          <input type="time" className="border p-2 w-full rounded-lg" />
        </div>
      </div>

      {/* Description */}
      <label className="text-sm font-semibold mb-2">Description</label>
      <textarea
        className="border p-2 mb-4 w-full max-w-md rounded-lg"
        placeholder="Enter event description"
        rows={4}
      />

      {/* Video Link */}
      <label className="text-sm font-semibold mb-2">Video Link</label>
      <input
        type="text"
        className={`border p-2 w-full rounded-lg max-w-md ${videoError ? 'border-red-600' : ''}`}
        value={videoLink}
        onChange={handleVideoLinkChange}
        placeholder="Enter video link (must start with https)"
      />
      {videoError && <p className="text-sm text-red-600">{videoError}</p>}

      {/* Banner Image */}
      <label className="text-sm font-semibold mb-2 mt-4">Banner Image</label>
      <input type="file" className="border p-2 mb-4 rounded-lg w-full max-w-md" />

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={handleEventCreation}>Create Event</button>
        <button className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
      </div>
    </div>
  );
}

export default Home;
