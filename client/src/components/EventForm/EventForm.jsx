import { useState } from "react";

import styles from "./EventForm.module.css";

const emptyEvent = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: ""
};

const getLocalDate = () => {
  const now = new Date();
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

  return localNow.toISOString().slice(0, 10);
};

const EventForm = ({
  initialData,
  onSubmit,
  buttonText
}) => {
  const today = getLocalDate();
  const originalDate = initialData?.date?.slice(0, 10) || "";
  const [formData, setFormData] = useState(() => ({
    ...emptyEvent,
    ...initialData,
    date: initialData?.date?.slice(0, 10) || "",
    time: initialData?.time || (initialData?.date
      ? new Date(initialData.date).toTimeString().slice(0, 5)
      : "")
  }));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      !formData.location
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.date < today && formData.date !== originalDate) {
      setError("Event date cannot be in the past.");
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit(formData);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={styles.eventForm}
      onSubmit={handleSubmit}
      noValidate
    >
      {error && (
        <div className={styles.formError}>
          {error}
        </div>
      )}

      <div className={styles.formField}>
        <label htmlFor="title">
          Event title
        </label>

        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter event title"
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell people what this event is about"
          rows="5"
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="date">
            Date
          </label>

          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            min={today}
            required
            onChange={handleChange}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="time">
            Time
          </label>

          <input
            id="time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.formField}>
        <label htmlFor="location">
          Location
        </label>

        <input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter event location"
        />
      </div>

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : buttonText}
      </button>
    </form>
  );
};

export default EventForm;