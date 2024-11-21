import React from "react";

const EventFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-800 shadow-md rounded p-4 mb-4">
      <h2 className="text-white text-xl font-bold mb-2">Filter Events</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-white block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="text-white block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="text-white block font-medium">Event Name</label>
          <input
            type="text"
            name="event"
            value={filters.event}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="text-white block font-medium">App ID</label>
          <input
            type="text"
            name="appID"
            value={filters.appID}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
