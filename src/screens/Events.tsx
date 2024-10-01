import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EditEvent from './../components/EditEvent';
import Modal from './../components/Modal';

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

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>('http://localhost:9000/api/events');
        setEvents(response.data);
      } catch (err) {
        const errorMessage = axios.isAxiosError(err) && err.response ? err.response.data.message : 'Failed to fetch events';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const [expandedDescription, setExpandedDescription] = useState<string | null>(null);

  const toggleReadMore = (eventId: string) => {
    setExpandedDescription((prev) => (prev === eventId ? null : eventId));
  };

  const handleSaveEvent = (updatedEvent: Event) => {
    setEvents((prev) => prev.map((event) => (event._id === updatedEvent._id ? updatedEvent : event)));
    setEditingEvent(null);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:9000/api/events/${eventId}`);
        setEvents((prev) => prev.filter((event) => event._id !== eventId));
        toast.success('Event deleted successfully');
      } catch (err) {
        const errorMessage = axios.isAxiosError(err) && err.response ? err.response.data.message : 'Failed to delete event';
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex flex-col items-start p-4 md:p-8 mt-6 md:ml-28">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="flex flex-col justify-between border rounded-lg shadow-lg overflow-hidden bg-white w-[90%] sm:w-[80%] mx-auto">
          
            {event.bannerImage && (
              <img src={event.bannerImage.replace(/\\/g, '/')} alt={event.eventName} className="w-full h-48 object-cover" />
            )}
       
            <div className="flex flex-col justify-between p-4 flex-grow">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{event.eventName}</h2>
                <p className="text-gray-500 mb-2">
                  {`Date: ${new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                </p>
                <p className="text-gray-500">{`Time: ${event.startTime} - ${event.endTime}`}</p>
              </div>
             
              <div className="mt-auto">
                <p className={`text-sm text-gray-700 overflow-hidden ${expandedDescription === event._id ? '' : 'line-clamp-2'}`}>
                  {event.description}
                </p>
                {event.description.length > 100 && (
                  <button onClick={() => toggleReadMore(event._id)} className="text-blue-600 text-sm mt-2 focus:outline-none">
                    {expandedDescription === event._id ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
           
              <div className="flex justify-between mt-4">
                <button onClick={() => handleEditEvent(event)} className="bg-yellow-500 text-white py-2 px-4 rounded">
                  Edit
                </button>
                <button onClick={() => handleDeleteEvent(event._id)} className="bg-red-500 text-white py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingEvent && (
        <Modal onClose={() => setEditingEvent(null)}>
          <EditEvent event={editingEvent} onSave={handleSaveEvent} onCancel={() => setEditingEvent(null)} />
        </Modal>
      )}
    </div>
  );
}

export default Events;
