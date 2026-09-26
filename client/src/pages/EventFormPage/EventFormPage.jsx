import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import EventForm from "../../components/EventForm/EventForm";

import {
  createEvent,
  getEvent,
  updateEvent
} from "../../services/eventService";

import styles from "./EventFormPage.module.css";

const EventFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const loadEvent = async () => {
      try {
        const data = await getEvent(id);

        setEvent(data);
      } catch {
        setError("Unable to load event.");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, isEditMode]);

  const handleSubmit = async (formData) => {
    if (isEditMode) {
      await updateEvent(id, formData);

      navigate(`/events/${id}`);
      return;
    }

    const createdEvent = await createEvent(formData);

    navigate(`/events/${createdEvent._id}`);
  };

  if (loading) {
    return (
      <main className={styles.pageContainer}>
        <p>Loading event...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.pageContainer}>
        <p>{error}</p>

        <Link to="/events">
          Back to events
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.pageContainer}>
      <Link
        className={styles.backLink}
        to={isEditMode ? `/events/${id}` : "/events"}
      >
        ← Back
      </Link>

      <div>
        <p className={styles.eventLabel}>
          {isEditMode ? "Manage event" : "New event"}
        </p>

        <h1 className={styles.eventTitle}>
          {isEditMode
            ? "Edit event"
            : "Create an event"}
        </h1>

        <p>
          {isEditMode
            ? "Update the event details below."
            : "Add the details for your upcoming event."}
        </p>
      </div>

      <EventForm
        initialData={event}
        onSubmit={handleSubmit}
        buttonText={
          isEditMode
            ? "Save changes"
            : "Create event"
        }
      />
    </main>
  );
};

export default EventFormPage;