import { getCategories, getEvents, getFeaturedEvents } from "@/actions";
import { EventsBody, MainLayout, FeaturedSlider } from "@/components";
import { EventType } from "@/types";
import Image from "next/image";
import { Carousel, Typography } from "antd";

const { Title } = Typography;

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const EventsPage = async ({
  searchParams,
}: {
  searchParams: { page: number; q: string; t: string; category: string };
}) => {
  const { page = 1, q = "", t = "event", category = "" } = searchParams;
  const { data: eventsData } = await getEvents(page, q, t, category);
  const { data: featuredEventsData } = await getFeaturedEvents();
  const categories = await getCategories();
  const events: EventType[] = eventsData?.["hydra:member"];
  const featuredEvents: EventType[] = featuredEventsData?.["hydra:member"];
  const lastPageIndex = eventsData?.["hydra:meta"].pagination.last;

  console.log("categories", categories);
  return (
    <MainLayout>
      <FeaturedSlider />

      {/* <div className="container max-md:mt-5 pb-[40px] md:py-[60px]">
        <div className="flex max-md:flex-col gap-5 md:gap-9">
          <div className="absolute top-0 left-0 h-48 md:h-80 w-screen">
            <Image
              src="/assets/event/banner.webp"
              fill
              alt="event-banner"
              className="object-cover"
            />
          </div>
          <EventsBody
            pageIndex={page}
            lastPageIndex={lastPageIndex}
            events={events}
            featuredEvents={featuredEvents}
            t={t}
            q={q}
            categories={categories}
            category={category}
          />
        </div>
      </div> */}
    </MainLayout>
  );
};

export default EventsPage;
