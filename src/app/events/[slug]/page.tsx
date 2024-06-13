import { getEvent } from "@/actions";
import {
  Button,
  FacebookColored,
  GmailColored,
  GoBack,
  InstagramColored,
  MainLayout,
  XColored,
} from "@/components";
import { toDateString, toShortDate } from "@/utils";
import Image from "next/image";

const EventPage = async ({ params }: { params: { slug: string } }) => {
  const { data } = await getEvent(params.slug);
  const eventData: any = data;
  console.log(eventData);
  return (
    <MainLayout>
      <div className="container max-md:mt-5 pb-[40px] md:py-[60px] flex flex-row gap-16">
        {/* Left Section for Event Detail */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Title And Date */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-4">
              <GoBack />
              <h1 className="text-2xl font-semibold">{eventData.title}</h1>
            </div>
            <h2 className="text-lg text-tertiary">
              {toDateString(eventData.startTime) +
                " - " +
                toDateString(eventData.endTime)}
            </h2>
          </div>
          {/* Content Hero Image */}
          <div className="relative h-[448px] rounded-2xl overflow-hidden">
            <Image
              src={
                eventData.images?.[0]?.path
                  ? eventData.images?.[0]?.path
                  : "/assets/placeholder.svg"
              }
              fill
              alt={"Hero"}
              className="object-contain bg-white"
            />
          </div>
          {/* Content Categories */}
          {eventData.categories && (
            <div className="flex flex-row gap-6 flex-wrap">
              {eventData.categories.map((category: string, ind: number) => (
                <div
                  className=" px-3 py-[2px] rounded-full border border-primary text-primary"
                  key={ind}
                >
                  {category}
                </div>
              ))}
            </div>
          )}

          {/* Content Body */}
          <div className="flex flex-col gap-8 items-start">
            <div className="text-lg font-bold text-primary px-4 py-[14px] border-b border-primary">
              Танилцуулга
            </div>
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: eventData.description }}
            ></div>
            {/* <p className="w-full">{eventData.description || ""}</p> */}
          </div>
          {/* Content Medias */}
          {eventData.media.length !== 0 && (
            <div className="flex flex-col gap-5 pt-8">
              <h3 className="text-2xl font-semibold">Арга хэмжээний мэдээ</h3>
              <div className="flex bg-white rounded-2xl p-4">
                <table className="flex-1">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 text-left">Нийтлэгч</th>
                      <th className="pb-3 text-left">Огноо</th>
                      <th className="pb-3 text-left">Гарчиг</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData.media.map((media: any, index: number) => (
                      <tr className="border-b" key={index}>
                        <td className="flex flex-row items-center gap-3 py-3 font-semibold">
                          <Image
                            src={
                              media.images[0].path || "/assets/placeholder.svg"
                            }
                            width={40}
                            height={40}
                            alt={"User-Image"}
                            className="object-cover"
                          />
                          {media.title}
                        </td>
                        <td className="text-md py-3">
                          {toShortDate(media.createdAt)}
                        </td>
                        <td className="text-md py-3">{media.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Share Content */}
          <div className="pt-6 flex flex-col gap-6">
            <h4 className="font-medium text-xl">Бусадтай хуваалцаарай!</h4>
            <div className="flex flex-row gap-6">
              <div className="p-3 bg-white rounded-full border cursor-pointer">
                <FacebookColored />
              </div>
              <div className="p-3 bg-white rounded-full border cursor-pointer">
                <InstagramColored />
              </div>
              <div className="p-3 bg-white rounded-full border cursor-pointer">
                <XColored />
              </div>
              <div className="p-3 bg-white rounded-full border cursor-pointer flex items-center justify-center">
                <GmailColored />
              </div>
            </div>
          </div>
        </div>
        {/* Right Section for Event Detail */}
        <div className="w-[360px] flex flex-col gap-4">
          <div className="border border-primary rounded-full font-semibold text-center">
            {eventData.type == "volunteering_event"
              ? "Сайн дурын арга хэмжээ"
              : "Арга хэмжээ"}
          </div>
          {/* Owner */}
          <div className="bg-white border p-5 rounded-2xl flex flex-col items-center justify-center gap-2">
            {eventData?.owner && (
              <>
                <h4 className="text-lg font-semibold">Зохион байгуулагч</h4>
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image
                    src={
                      eventData.owner.images?.[0]?.path ||
                      "/assets/placeholder.svg"
                    }
                    width={36}
                    height={36}
                    className="object-cover"
                    alt={"OwnerProfile"}
                  />
                  <h3 className="text-lg font-semibold text-black/70">
                    {eventData.owner.username}
                  </h3>
                </div>
              </>
            )}

            <Button className={`w-full ${eventData?.owner ? "mt-4" : ""}`}>
              ОРОЛЦОХ
            </Button>
          </div>
          {/* Partner and register details */}
          <div className="bg-white border p-5 rounded-2xl flex flex-col justify-center gap-3">
            {eventData.roles}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Хамтрагч байгуулга:</label>
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src={"/assets/placeholder.svg"}
                  width={36}
                  height={36}
                  className="object-cover"
                  alt={"OwnerProfile"}
                />
                <h3 className="text-lg font-semibold text-black/70">
                  Mother Earth NGO
                </h3>
              </div>
            </div>
            <hr className="mt-2" />
            {eventData.address && (
              <>
                <div className="flex gap-2 flex-row">
                  <h5 className="text-black/70 font-semibold">
                    <label className="text-black font-medium">Байршил: </label>
                    {eventData.address?.address}
                  </h5>
                </div>
                <hr />
              </>
            )}

            <div className="flex flex-col gap-2">
              <label className="font-medium">
                Өргөдөл хүлээн авах хугацаа:
              </label>
              <h5 className="text-black/70 font-semibold">
                {toDateString(eventData.endTime)}
              </h5>
            </div>
          </div>
          <div className="min-h-[512px] bg-primary rounded-2xl flex items-center justify-center text-white font-bold">
            Ad Space
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventPage;
