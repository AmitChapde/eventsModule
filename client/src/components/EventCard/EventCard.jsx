import { Link } from "react-router-dom";

import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  return (
    <article className={styles.eventCard}>
      <div className={styles.eventDate}>
        <span className={styles.eventMonth}>
          {new Date(event.date).toLocaleDateString("en-IN", {
            month: "short"
          })}
        </span>

        <strong className={styles.eventDay}>
          {new Date(event.date).getDate()}
        </strong>
      </div>

      <div className={styles.eventContent}>
        <h2 className={styles.eventTitle}>
          {event.title}
        </h2>

        <p className={styles.eventDescription}>
          {event.description}
        </p>

        <div className={styles.eventInfo}>
          <span>
            {event.time}
          </span>

          <span>
            {event.location}
          </span>
        </div>

        <div className={styles.eventFooter}>
          <span className={styles.rsvpCount}>
            {event.rsvpCount} attending
          </span>

          <Link
            className={styles.viewButton}
            to={`/events/${event._id}`}
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;