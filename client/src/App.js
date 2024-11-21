import React, { useState, useEffect } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import EventFilter from "./components/EventFilter";
import { axiosInstance } from "./Instance/axiosInstance";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
     startDate: "",
     endDate: "", 
     event: "", 
     appID: "" 
    });

  // Fetch events
  const fetchEvents = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axiosInstance.get(`/events?${query}`);
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events when filters change
  useEffect(() => {
    fetchEvents();
  }, [filters]);

  return (
    <>
    <Toaster/>
    <div className=" bg-gray-900 container mx-auto p-4">
      <h1 className="text-white text-2xl font-bold mb-4">Event Logging System</h1>
      <EventForm fetchEvents={fetchEvents} />
      <EventFilter filters={filters} setFilters={setFilters} />
      <EventList events={events} />
    </div>
    </>
  );
};

export default App;
