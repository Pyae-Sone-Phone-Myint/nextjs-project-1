import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helpers/api-util";
// import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

function AllEventsPage({events}) {
  // const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60
  };
}

export default AllEventsPage;
