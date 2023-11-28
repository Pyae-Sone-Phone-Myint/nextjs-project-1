import EventItem from "./event-item";
import classes from "./event-list.module.css";

export default function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          id={event.id}
          location={event.location}
          title={event.title}
          date={event.date}
          image={event.image}
          key={event.id}
        />
      ))}
    </ul>
  );
}
