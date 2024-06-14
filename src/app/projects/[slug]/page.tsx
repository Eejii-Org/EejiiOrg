import { getProject } from "@/actions";
import { Button, GoBack, MainLayout, ShareButton } from "@/components";
import { formatPrice, toDateString, toShortDate } from "@/utils";
import Image from "next/image";

const EventPage = async ({ params }: { params: { slug: string } }) => {
  const { data } = await getProject(params.slug);
  const projectData: any = data;
  console.log(projectData);
  return (
    <MainLayout>
      <div className="container max-md:mt-5 pb-[40px] md:py-[60px] flex flex-row gap-16">
        {/* Left Section for Event Detail */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Title And Date */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-4">
              <GoBack />
              <h1 className="text-2xl font-semibold">{projectData.title}</h1>
            </div>
            <h2 className="text-lg text-tertiary">
              {toDateString(projectData.startTime) +
                " - " +
                toDateString(projectData.endTime)}
            </h2>
          </div>
          {/* Content Hero Image */}
          <div className="relative h-[448px] rounded-2xl overflow-hidden">
            <Image
              src={
                projectData.images?.[0]?.path
                  ? projectData.images?.[0]?.path
                  : "/assets/placeholder.svg"
              }
              fill
              alt={"Hero"}
              className="object-contain bg-white"
            />
          </div>
          {/* Content Categories */}
          {projectData.categories && (
            <div className="flex flex-row gap-6 flex-wrap">
              {projectData.categories.map((category: string, ind: number) => (
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
              dangerouslySetInnerHTML={{ __html: projectData.description }}
            ></div>
            {/* <p className="w-full">{projectData.description || ""}</p> */}
          </div>
          {/* Content Medias */}
          {projectData.media.length !== 0 && (
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
                    {projectData.media.map((media: any, index: number) => (
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
            <ShareButton />
          </div>
        </div>
        {/* Right Section for Event Detail */}
        <div className="w-[360px] flex flex-col gap-4">
          {/* Owner */}
          <div className="bg-white border p-5 rounded-2xl flex flex-col items-center justify-center gap-2">
            {projectData?.owner && (
              <>
                <h4 className="text-lg font-semibold">Зохион байгуулагч</h4>
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image
                    src={
                      projectData.owner.images?.[0]?.path ||
                      "/assets/placeholder.svg"
                    }
                    width={36}
                    height={36}
                    className="object-cover"
                    alt={"OwnerProfile"}
                  />
                  <h3 className="text-lg font-semibold text-black/70">
                    {projectData.owner.username}
                  </h3>
                </div>
              </>
            )}

            <Button className={`w-full ${projectData?.owner ? "mt-4" : ""}`}>
              ОРОЛЦОХ
            </Button>
          </div>
          {/* Partner and register details */}
          <div className="bg-white border p-5 rounded-2xl flex flex-col justify-center gap-3">
            {projectData.roles}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Хамтрагч байгууллага:</label>
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
            <div className="flex flex-row justify-between text-md">
              <div className="text-black/60">
                Цугласан:{" "}
                <span className="text-black font-semibold">
                  {formatPrice(projectData.currentAmount ?? 0, "MNT")}
                </span>
              </div>
              <div className="text-black/60">
                Зорилго:{" "}
                <span className="text-black font-semibold">
                  {formatPrice(projectData.goalAmount ?? 0, "MNT")}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-full bg-[#ECECEC] rounded-full h-[5px]">
                <div
                  className="bg-primary h-[5px] rounded-full"
                  style={{
                    width:
                      Math.min(
                        Math.floor(
                          (projectData.currentAmount / projectData.goalAmount) *
                            100
                        ),
                        100
                      ) + "%",
                  }}
                ></div>
              </div>
              <span className="text-md">
                {Math.min(
                  Math.floor(
                    (projectData.currentAmount / projectData.goalAmount) * 100
                  ),
                  100
                )}
                %
              </span>
            </div>
            <hr />
            {/* {projectData.address && (
              <>
                <div className="flex gap-2 flex-row">
                  <h5 className="text-black/70 font-semibold">
                    <label className="text-black font-medium">Байршил: </label>
                    {projectData.address?.address}
                  </h5>
                </div>
                <hr />
              </>
            )} */}

            <div className="flex flex-col gap-2">
              {/* <label className="font-medium">
                Өргөдөл хүлээн авах хугацаа:
              </label> */}
              <h5 className="text-black/70 font-semibold">
                {toDateString(projectData.endTime)}
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
