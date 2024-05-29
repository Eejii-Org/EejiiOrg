import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight } from "../icons";
import { Card } from "../card";

export const Features = () => {
  const isVolunteeringEventLoading = true;
  const isEventLoading = true;
  const isProjectLoading = true;
  // const {
  //   data: lastVolunteeringEventData,
  //   isLoading: isVolunteeringEventLoading,
  // } = api.event.findAll.useQuery({
  //   page: 1,
  //   limit: 1,
  //   type: EventType.VOLUNTEERING,
  // });

  // const { data: lastEventData, isLoading: isEventLoading } =
  //   api.event.findAll.useQuery({
  //     page: 1,
  //     limit: 1,
  //     type: EventType.EVENT,
  //   });

  // const { data: lastProjectData, isLoading: isProjectLoading } =
  //   api.project.findAll.useQuery({
  //     page: 1,
  //     limit: 1,
  //   });

  const featuresData = useMemo(() => {
    return {
      event: null,
      volunteeringEvent: null,
      project: null,
    };
  }, []);

  return (
    <div className="container py-16 items-center">
      <h1 className="text-2xl md:text-4xl font-semibold pb-16">
        <span className="text-primary">Eejii.org</span>-ийн онцлог
      </h1>
      <div className="flex w-full flex-col md:flex-row gap-16 items-start">
        <div className="w-full flex-1 flex flex-col gap-6 ">
          <h2 className="font-semibold text-2xl pl-[28px]">
            Төсөл хөтөлбөрүүд
          </h2>
          <div className="w-full flex-1 flex">
            <Card
              showHighlight
              cardType="event"
              cardData={featuresData.project}
              loading={isProjectLoading}
              cardSize="small"
            />
          </div>

          <Link
            href="/projects"
            className="flex items-end justify-end text-primary font-bold"
          >
            Бүгд
            <ArrowRight />
          </Link>
        </div>
        <div className="flex-1 flex flex-col w-full gap-6 md:pt-16">
          <h2 className="font-semibold text-2xl pl-[28px]">Арга хэмжээ</h2>
          <div className="w-full flex-1 flex">
            <Card
              showHighlight
              cardType="event"
              cardData={featuresData.event}
              loading={isEventLoading}
              highlightColor="#C99FFF"
              cardSize="small"
            />
          </div>
          <Link
            href="/events"
            className="flex items-end justify-end text-primary font-bold"
          >
            Бүгд <ArrowRight />
          </Link>
        </div>
        <div className="flex-1 flex flex-col w-full gap-6 md:pt-32 overflow-hidden">
          <h2 className="font-semibold text-2xl pl-[28px]">Сайн дурын ажил</h2>
          <div className="w-full flex-1 flex">
            <Card
              showHighlight
              cardType="event"
              cardData={featuresData.volunteeringEvent}
              loading={isVolunteeringEventLoading}
              highlightColor="#BFE88C"
              cardSize="small"
            />
          </div>
          <Link
            href="/events"
            className="flex items-end justify-end text-primary font-bold"
          >
            Бүгд
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
