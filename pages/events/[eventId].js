// import { getEventById } from "@/dummy-data";
// import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";
import { getAllEvents, getEventById, getFeaturedEvents } from "@/helpers/api-util";
import Head from "next/head";

export default function EventDetailPage({ selectedEvent }) {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  // const selectedEvent = getEventById(eventId);
  if (!selectedEvent) {
    return (
      <>
        <ErrorAlert>
          <p>No Event Found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const eventId = params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 1800
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
