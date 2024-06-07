import { getEvents, getFeaturedEvents } from "@/actions";
import { EventsBody, MainLayout } from "@/components";
import { EventType } from "@/types";

const EventsPage = async ({
  searchParams,
}: {
  searchParams: { page: number; q: string };
}) => {
  const { page = 1, q } = searchParams;
  const { data: eventsData } = await getEvents(page, q);
  const { data: featuredEventsData } = await getFeaturedEvents();
  const events: EventType[] = eventsData?.["hydra:member"];
  const featuredEvents: EventType[] = featuredEventsData?.["hydra:member"];
  const lastPageIndex = eventsData?.["hydra:meta"].pagination.last;
  return (
    <MainLayout>
      <div className="container max-md:mt-5 pb-[40px] md:py-[60px]">
        <div className="flex max-md:flex-col gap-5 md:gap-9">
          <EventsBody
            pageIndex={page}
            lastPageIndex={lastPageIndex}
            events={events}
            featuredEvents={featuredEvents}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
