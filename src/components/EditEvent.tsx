import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
interface Event {
  _id: string;
  eventName: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  videoLink: string;
  bannerImage?: string;
}

interface EditEventProps {
  event: Event; 
  onSave: (updatedEvent: Event) => void; 
  onCancel: () => void; 
}

const EditEvent: React.FC<EditEventProps> = ({ event, onSave, onCancel }) => {
  const [eventName, setEventName] = useState(event.eventName);
  const [date, setDate] = useState(event.date);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [description, setDescription] = useState(event.description);
  const [videoLink, setVideoLink] = useState(event.videoLink);
  const [bannerImage, setBannerImage] = useState(event.bannerImage || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedEvent = {
      _id: event._id,
      eventName,
      date,
      startTime,
      endTime,
      description,
      videoLink,
      bannerImage,
    };

    try {
 
      const response = await axios.put(`http://localhost:9000/api/events/${event._id}`, updatedEvent);
      onSave(response.data);
      toast.success("Event Updated Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
   
    } catch (error) {console.error("Error updating event:", error);}
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Edit Event</h2>
      <div>
        <label className="block">Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="border rounded w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block">Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border rounded w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block">End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border rounded w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block">Video Link:</label>
        <input
          type="url"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="border rounded w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block">Banner Image URL:</label>
        <input
          type="text"
          value={bannerImage}
          onChange={(e) => setBannerImage(e.target.value)}
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white py-1 px-3 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditEvent;
