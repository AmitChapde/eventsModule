import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EventCard from "../../components/EventCard/EventCard";
import { getEvents } from "../../services/eventService";

import styles from "./EventList.module.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();

        setEvents(data);
      } catch {
        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <main className={styles.eventsPage}>
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>
            Discover
          </p>

          <h1 className={styles.pageTitle}>
            Upcoming events
          </h1>

          <p className={styles.pageSubtitle}>
            Find something interesting happening around you.
          </p>
        </div>

        <Link
          className={styles.createButton}
          to="/events/create"
        >
          + Create event
        </Link>
      </div>

      {loading && (
        <div className={styles.statusMessage}>
          Loading events...
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className={styles.emptyState}>
          <h2>No events yet</h2>

          <p>
            Create the first event and get people together.
          </p>

        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className={styles.eventGrid}>
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default EventList;