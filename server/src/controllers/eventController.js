import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  rsvpToEvent
} from "../services/eventService.js";

const getEvents = async (req, res) => {
  try {
    const events = await getAllEvents();

    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await getEventById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event"
    });
  }
};

const createNewEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const event = await createEvent({
      title,
      description,
      date,
      time,
      location
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create event"
    });
  }
};

const editEvent = async (req, res) => {
  try {
    const event = await updateEvent(
      req.params.id,
      req.body
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update event"
    });
  }
};

const rsvpEvent = async (req, res) => {
  try {
    const event = await rsvpToEvent(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "RSVP successful",
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to RSVP"
    });
  }
};

export {
  getEvents,
  getSingleEvent,
  createNewEvent,
  editEvent,
  rsvpEvent
};