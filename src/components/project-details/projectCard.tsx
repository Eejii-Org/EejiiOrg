import { EventType } from "@/types";
import { toDateString } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export const EventCard = ({ event }: { event: EventType }) => {
  return (
    <Link
      className="flex-1 rounded-xl overflow-hidden drop-shadow bg-white shadow-teal-500"
      href={`/events/${event.slug}`}
    >
      <div className="relative h-48">
        <Image
          src={
            event.images.find((img) => img.type == "thumbnail")?.path ||
            "/assets/placeholder.svg"
          }
          fill
          onError={(event) => {
            (event.target as HTMLImageElement).src = "/assets/placeholder.svg";
          }}
          className="object-contain bg-white"
          alt={"Card" + event?.id}
        />
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="text-sm text-tertiary">
          {toDateString(event.startTime)}
        </div>
        <p className=" font-semibold text-lg">{event.title}</p>
        <div className="flex flex-row items-center gap-1">
          <Image
            src={"/assets/placeholder.svg"}
            width={28}
            height={28}
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                "/assets/placeholder.svg";
            }}
            className="object-cover"
            alt={"CardProfile" + event?.id}
          />
          <label className="text-black/70 text-md font-medium">
            {event.owner?.username || event.title}
          </label>
        </div>
      </div>
    </Link>
  );
};
