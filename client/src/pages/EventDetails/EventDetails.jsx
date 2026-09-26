import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";

import {
  getEvent,
  rsvpEvent
} from "../../services/eventService";

import styles from "./EventDetails.module.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await getEvent(id);

        setEvent(data);
      } catch {
        setError("Unable to load this event.");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleRsvp = async () => {
    try {
      setRsvpLoading(true);
      setRsvpMessage("");

      const updatedEvent = await rsvpEvent(id);

      setEvent(updatedEvent);
      setRsvpMessage("You're going to this event!");
    } catch {
      setRsvpMessage("Unable to complete RSVP.");
    } finally {
      setRsvpLoading(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.pageContainer}>
        <p>Loading event...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className={styles.pageContainer}>
        <p>{error || "Event not found."}</p>

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
        to="/events"
      >
        ← Back to events
      </Link>

      <article className={styles.eventDetails}>
        <div className={styles.eventHeader}>
          <div>
            <p className={styles.eventLabel}>
              Event
            </p>

            <h1 className={styles.eventTitle}>
              {event.title}
            </h1>
          </div>

          <Link
            className={styles.editButton}
            to={`/events/${event._id}/edit`}
          >
            Edit event
          </Link>
        </div>

        <div className={styles.eventMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>
              Date
            </span>

            <span>
              {new Date(event.date).toLocaleDateString(
                "en-IN",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                }
              )}
            </span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>
              Time
            </span>

            <span>{event.time}</span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>
              Location
            </span>

            <span>{event.location}</span>
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <h2>About this event</h2>

          <p>{event.description}</p>
        </div>

        <div className={styles.rsvpSection}>
          <div>
            <strong>
              {event.rsvpCount} people are attending
            </strong>

            <p>
              Join the event if you're interested.
            </p>
          </div>

          <button
            className={styles.rsvpButton}
            onClick={handleRsvp}
            disabled={rsvpLoading}
          >
            {rsvpLoading ? "Confirming..." : "RSVP"}
          </button>
        </div>

        {rsvpMessage && (
          <div className={styles.rsvpMessage}>
            {rsvpMessage}
          </div>
        )}
      </article>
    </main>
  );
};

export default EventDetails;