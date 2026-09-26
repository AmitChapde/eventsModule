import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    rsvpCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;