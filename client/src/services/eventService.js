const API_URL = import.meta.env.VITE_API_URL;

const getEvents = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const result = await response.json();

  return result.data;
};

const getEvent = async (eventId) => {
  const response = await fetch(`${API_URL}/${eventId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  const result = await response.json();

  return result.data;
};

const createEvent = async (eventData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  const result = await response.json();

  return result.data;
};

const updateEvent = async (eventId, eventData) => {
  const response = await fetch(`${API_URL}/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  });

  if (!response.ok) {
    throw new Error("Failed to update event");
  }

  const result = await response.json();

  return result.data;
};

const rsvpEvent = async (eventId) => {
  const response = await fetch(
    `${API_URL}/${eventId}/rsvp`,
    {
      method: "POST"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to RSVP");
  }

  const result = await response.json();

  return result.data;
};

export {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  rsvpEvent
};