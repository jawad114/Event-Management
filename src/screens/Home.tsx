import { AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Home() {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [timeZone, setTimeZone] = useState('PST');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [videoError, setVideoError] = useState('');
  const [bannerImage, setBannerImage] = useState<File | null>(null); 

  
  const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setVideoLink(link);
    if (!link.startsWith('https')) {
      setVideoError('Video link must start with https');
    } else {
      setVideoError('');
    }
  };

 
  const handleEventCreation = async () => {
  
    if (videoError) {
      toast.error(videoError);
      return;
    }

    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('date', date);
    formData.append('timeZone', timeZone);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('description', description);
    formData.append('videoLink', videoLink);
    if (bannerImage) {
      formData.append('bannerImage', bannerImage);
    }

    try {
      const response = await fetch('http://localhost:9000/api/events/createEvent', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const eventDate = new Date().toLocaleDateString(); 
      toast.success(
        <div className='w-96 flex items-center justify-between'>
          <span>
            Event created on <strong>{eventDate}</strong>
            <a href="/edit-event" className="text-green-600 ml-1 mr-2 whitespace-nowrap">Edit Event</a>
          </span>
        </div>,
        {
          className: 'bg-white',
          bodyClassName: 'text-black',
          closeButton: false,
          progressClassName: 'bg-green-600',
        }
      );

     
      setEventName('');
      setDate('');
      setTimeZone('PST');
      setStartTime('');
      setEndTime('');
      setDescription('');
      setVideoLink('');
      setVideoError('');
      setBannerImage(null);
    }  catch (error) {
      if (error instanceof Error) {
        toast.error(error.message); 
      } else {
        toast.error('An unknown error occurred'); 
      }
    }
    
  };

  return (
    <div className="flex flex-col items-start p-8 md:ml-28 mt-9">
  
      <div className="flex items-center mb-4">
        <AlertCircle className="text-red-600 mr-2" />
        <span className="text-sm text-red-600">Error Messages here</span>
      </div>

   
      <h1 className="text-2xl font-bold mb-2">Create Event</h1>
      <p className="text-sm text-gray-600 mb-4">Fill in the details to create your event.</p>

      <label className="text-sm font-semibold mb-2">Event Name</label>
      <input
        type="text"
        className="border p-2 mb-4 w-full max-w-md rounded-lg"
        placeholder="Enter event name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4 mb-4 max-w-md">
        <div>
          <label className="text-sm font-semibold">Select Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Select Time Zone</label>
          <select
            className="border p-2 w-full rounded-lg"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          >
            <option value="PST">PST</option>
            <option value="EST">EST</option>
            <option value="UTC">UTC</option>
            <option value="CST">CST</option>
            <option value="MST">MST</option>
          </select>
        </div>
      </div>

  
      <div className="grid grid-cols-2 gap-4 mb-4 max-w-md">
        <div>
          <label className="text-sm font-semibold">Start Time</label>
          <input
            type="time"
            className="border p-2 w-full rounded-lg"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">End Time</label>
          <input
            type="time"
            className="border p-2 w-full rounded-lg"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

    
      <label className="text-sm font-semibold mb-2">Description</label>
      <textarea
        className="border p-2 mb-4 w-full max-w-md rounded-lg"
        placeholder="Enter event description"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

  
      <label className="text-sm font-semibold mb-2">Video Link</label>
      <input
        type="text"
        className={`border p-2 w-full rounded-lg max-w-md ${videoError ? 'border-red-600' : ''}`}
        value={videoLink}
        onChange={handleVideoLinkChange}
        placeholder="Enter video link (must start with https)"
      />
      {videoError && <p className="text-sm text-red-600">{videoError}</p>}

      <label className="text-sm font-semibold mb-2 mt-4">Banner Image</label>
      <input
        type="file"
        className="border p-2 mb-4 rounded-lg w-full max-w-md"
        onChange={(e) => {
          if (e.target.files) {
            setBannerImage(e.target.files[0]);
          }
        }}
      />

      <div className="flex space-x-4 mt-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={handleEventCreation}>
          Create Event
        </button>
        <button className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
      </div>
    </div>
  );
}

export default Home;
