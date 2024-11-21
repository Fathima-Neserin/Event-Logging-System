import React from "react";

const EventList = ({ events }) => {
  return (
    <div className="bg-gray-800 shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-2 text-white">Event Logs</h2>
      {events.length > 0 ? (
        <ul className="divide-y">
          {events.map((event) => (
            <li key={event._id} className="p-2">
              <p className="text-white">
                <strong>Event:</strong> {event.event}
              </p>
              <p className="text-white">
                <strong>App ID:</strong> {event.appID}
              </p>
              <p className="text-white">
                <strong>Data:</strong> {JSON.stringify(event.data)}
              </p>
              <p className="text-white">
                <strong>Date:</strong> {new Date(event.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No events found.</p>
      )}
    </div>
  );
};

export default EventList;
