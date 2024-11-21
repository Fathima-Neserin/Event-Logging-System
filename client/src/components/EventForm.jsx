import React, { useState } from "react";
import { axiosInstance } from "../Instance/axiosInstance";

const EventForm = ({ fetchEvents }) => {
  const [formData, setFormData] = useState({ 
    event: "", 
    appID: "", 
    data: "" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!formData.event && !formData.appID && !formData.data){
        alert("All fields are required!!!")
      }
      // Parse and send the data
      await axiosInstance.post("/events", {
        ...formData,
        data: JSON.parse(formData.data),
      });
  
      alert("New event created!");
  
      
      fetchEvents();
      setFormData({ event: "", appID: "", data: "" });
    } catch (error) {
      console.error("Error logging event:", error);

      alert("Failed to create event.");
    }
  };
  
  return (
    <form className="bg-gray-800 shadow-md rounded p-4 mb-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2 text-white">Log New Event</h2>
      <div className="mb-2">
        <label className="block font-medium text-white">Event Name</label>
        <input
          type="text"
          name="event"
          value={formData.event}
          onChange={handleChange}
          className="border rounded w-full p-2"
          // required
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium text-white">App ID</label>
        <input
          type="text"
          name="appID"
          value={formData.appID}
          onChange={handleChange}
          className="border rounded w-full p-2"
          // required
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium text-white">Data (JSON)</label>
        <textarea
          name="data"
          value={formData.data}
          onChange={handleChange}
          className="border rounded w-full p-2"
          rows="3"
          // required
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
        Log Event
      </button>
    </form>
  );
};

export default EventForm;
