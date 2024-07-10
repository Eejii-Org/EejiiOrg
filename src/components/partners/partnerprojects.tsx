"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CharityIcon,
  EventsIcon,
  FundraisingIcon,
  VolunteeringIcon,
} from "../icons";
import axios from "axios";
import { ProjectCard } from "../projects/projectcard";
import { EventCard } from "../events/eventcard";

type TabType = "events" | "volunteeringEvents" | "charity" | "fundraise";

export const PartnerProjects = ({ partner }: { partner: any }) => {
  // Projects
  const [tab, setTab] = useState<TabType>("volunteeringEvents");
  const [volunteeringEventPage, setVolunteeringEventPage] = useState(1);
  const [eventsPage, setEventsPage] = useState(1);
  const [handivAvahPage, setHandivAvahPage] = useState(1);
  const [handivUguhPage, setHandivUguhPage] = useState(1);
  const [volunteeringEvents, setVolunteeringEvents] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [handivAvah, setHandivAvah] = useState<any[]>([]);
  const [handivUguh, setHandivUguh] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentItems = useMemo(() => {
    if (tab == "events") {
      return events.slice((eventsPage - 1) * 6, eventsPage * 6);
    }
    if (tab == "volunteeringEvents") {
      return volunteeringEvents.slice(
        (volunteeringEventPage - 1) * 6,
        volunteeringEventPage * 6
      );
    }
    if (tab == "fundraise") {
      return handivAvah.slice((handivAvahPage - 1) * 6, handivAvahPage * 6);
    }
    return handivUguh.slice((handivUguhPage - 1) * 6, handivUguhPage * 6);
  }, [
    tab,
    volunteeringEventPage,
    eventsPage,
    handivAvahPage,
    handivUguhPage,
    events,
    volunteeringEvents,
    handivAvah,
    handivUguh,
  ]);
  const loadNextPage = async (t: TabType, page: number) => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${
        t == "volunteeringEvents" || t == "events" ? "events" : "projects"
      }?state=new&isEnabled=true&limit=6&page=${page}&type=${
        t == "events"
          ? "event"
          : t == "volunteeringEvents"
          ? "volunteering_event"
          : t == "fundraise"
          ? "fundraising"
          : "grant_fundraising"
      }&owner.id=${partner.id}`
    );
    if (t == "events") {
      setEvents([...events, ...res.data["hydra:member"]]);
      setLoading(false);
      return;
    }
    if (t == "volunteeringEvents") {
      setVolunteeringEvents([
        ...volunteeringEvents,
        ...res.data["hydra:member"],
      ]);
      setLoading(false);
      return;
    }
    if (t == "fundraise") {
      setHandivAvah([...handivAvah, ...res.data["hydra:member"]]);
      setLoading(false);
      return;
    }
    if (t == "charity") {
      setHandivUguh([...handivUguh, ...res.data["hydra:member"]]);
      setLoading(false);
      return;
    }

    console.log(res.data);
  };
  useEffect(() => {
    if (tab == "volunteeringEvents") {
      if (volunteeringEvents.length / 6 < volunteeringEventPage) {
        // Load
        if (
          volunteeringEventPage == 1 &&
          volunteeringEvents.length != 0 &&
          volunteeringEvents.length < 6
        ) {
          return;
        }
        loadNextPage(tab, volunteeringEventPage + 1);
      }
      return;
    }
    if (tab == "events") {
      if (events.length / 6 < eventsPage) {
        // Load
        if (eventsPage == 1 && events.length != 0 && events.length < 6) {
          return;
        }
        loadNextPage(tab, eventsPage + 1);
      }
      return;
    }
    if (tab == "fundraise") {
      if (handivAvah.length / 6 < handivAvahPage) {
        // Load
        if (
          handivAvahPage == 1 &&
          handivAvah.length != 0 &&
          handivAvah.length < 6
        ) {
          return;
        }
        loadNextPage(tab, handivAvahPage + 1);
      }
      return;
    }
    if (tab == "charity") {
      if (handivUguh.length / 6 < handivUguhPage) {
        // Load
        if (
          handivUguhPage == 1 &&
          handivUguh.length != 0 &&
          handivUguh.length < 6
        ) {
          return;
        }
        loadNextPage(tab, handivUguhPage + 1);
      }
      return;
    }
  }, [tab]);
  return (
    <div className="flex flex-col gap-8 pb-8">
      <div className="flex flex-row bg-[#F0F4F8] rounded-xl relative text-sm md:text-xl">
        <div
          className="absolute w-1/4 h-full p-1 md:p-2 flex transition-all ease-in-out"
          style={{
            left:
              tab == "volunteeringEvents"
                ? 0
                : tab == "events"
                ? "25%"
                : tab == "fundraise"
                ? "50%"
                : "75%",
          }}
        >
          <div className="bg-primary flex-1 rounded-lg" />
        </div>
        <button
          className={`flex-1 py-5 flex flex-col md:flex-row gap-2 items-center justify-center ${
            tab == "volunteeringEvents" ? "text-white" : "text-[#8E8E93]"
          } relative z-10`}
          onClick={() => setTab("volunteeringEvents")}
        >
          <VolunteeringIcon
            color={tab == "volunteeringEvents" ? "white" : "#3C888D"}
          />
          Сайн дурын арга хэмжээ
        </button>
        <button
          className={`flex-1 py-5 flex flex-col md:flex-row gap-2 items-center justify-center ${
            tab == "events" ? "text-white" : "text-[#8E8E93]"
          } relative z-10`}
          onClick={() => setTab("events")}
        >
          <EventsIcon color={tab == "events" ? "white" : "#3C888D"} />
          Арга хэмжээ
        </button>
        <button
          className={`flex-1 py-5 flex flex-col md:flex-row gap-2 items-center justify-center ${
            tab == "fundraise" ? "text-white" : "text-[#8E8E93]"
          } relative z-10`}
          onClick={() => setTab("fundraise")}
        >
          <FundraisingIcon color={tab == "fundraise" ? "white" : "#3C888D"} />
          Хандив авах төслүүд
        </button>
        <button
          className={`flex-1 py-5 flex flex-col md:flex-row gap-2 items-center justify-center ${
            tab == "charity" ? "text-white" : "text-[#8E8E93]"
          } relative z-10`}
          onClick={() => setTab("charity")}
        >
          <CharityIcon color={tab == "charity" ? "white" : "#3C888D"} />
          Хандив өгөх төслүүд
        </button>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols2 lg:grid-cols-4 gap-8 min-h-[386px]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center col-span-4 text-black/50 font-medium">
            Уншиж байна
          </div>
        ) : (
          <>
            {currentItems.length == 0 && (
              <div className="w-full h-full flex items-center justify-center col-span-4 text-black/50 font-medium">
                Байхгүй
              </div>
            )}
            {currentItems.map((item, index) => (
              <>
                {tab == "events" || tab == "volunteeringEvents" ? (
                  <EventCard event={item} key={index} />
                ) : (
                  <ProjectCard project={item} key={index} />
                )}
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PartnerProjects;
