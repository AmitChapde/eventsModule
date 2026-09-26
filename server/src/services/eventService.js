import Event from "../models/eventModel.js";

const getAllEvents = async () => {
  return Event.find().sort({ date: 1 });
};

const getEventById = async (eventId) => {
  return Event.findById(eventId);
};

const createEvent = async (eventData) => {
  const event = new Event(eventData);

  return event.save();
};

const updateEvent = async (eventId, eventData) => {
  return Event.findByIdAndUpdate(
    eventId,
    eventData,
    {
      new: true,
      runValidators: true
    }
  );
};

const rsvpToEvent = async (eventId) => {
  return Event.findByIdAndUpdate(
    eventId,
    {
      $inc: {
        rsvpCount: 1
      }
    },
    {
      new: true
    }
  );
};

export {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  rsvpToEvent
};