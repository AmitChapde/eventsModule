import express from "express";

import {
  getEvents,
  getSingleEvent,
  createNewEvent,
  editEvent,
  rsvpEvent
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getSingleEvent);

router.post("/", createNewEvent);

router.put("/:id", editEvent);

router.post("/:id/rsvp", rsvpEvent);

export default router;