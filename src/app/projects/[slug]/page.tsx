import { getProject } from "@/actions";
import { Ad, Button, GoBack, MainLayout, ShareButton } from "@/components";
import { DonateButton } from "@/components/projects";
import { formatPrice, toDateString, toShortDate } from "@/utils";
import Image from "next/image";

const EventPage = async ({ params }: { params: { slug: string } }) => {
  const { data } = await getProject(params.slug);
  const projectData: any = data;
  const isFeatured = projectData?.isFeatured || false;
  if (!projectData) {
    return (
      <MainLayout>
        <div className="container max-md:mt-5 pb-[40px] md:py-[60px] flex flex-row gap-16">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4">
                <GoBack />
                <h1 className="text-2xl font-semibold">Project Not Found</h1>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  if (isFeatured) {
    return (
      <MainLayout>
        <div className="container max-md:mt-5 pb-[40px] md:py-[40px] flex flex-col">
          {/* Hero Section for Event Detail */}
          <div className="relative h-[448px] rounded-2xl overflow-hidden">
            <div className="absolute left-4 top-4 z-30">
              <GoBack />
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-20 max-lg:w-full max-lg:px-4 flex items-center justify-center bg-black/30">
              {/* Title And Date */}
              <div className="flex flex-col items-center justify-center gap-2 z-20">
                <div className="flex flex-row items-center gap-4">
                  <h1 className="text-white text-xl md:text-3xl font-semibold">
                    {projectData.title}
                  </h1>
                </div>
                <h2 className="text-sm md:text-lg text-white">
                  {toDateString(projectData.startTime) +
                    " - " +
                    toDateString(projectData.endTime)}
                </h2>
                {/* Progress */}
                <div className="w-full md:w-[694px]">
                  <div className="flex flex-row justify-between text-md">
                    <div className="text-[#c1c1c1] font-medium">
                      Цугласан:{" "}
                      <span className="text-white font-semibold">
                        {formatPrice(projectData.currentAmount ?? 0, "MNT")}
                      </span>
                    </div>
                    <div className="text-[#c1c1c1] font-medium">
                      Зорилго:{" "}
                      <span className="text-white font-semibold">
                        {formatPrice(projectData.goalAmount ?? 0, "MNT")}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-1 text-white">
                    <div className="w-full bg-[#ECECEC] rounded-full h-[5px] lg:h-[10px]">
                      <div
                        className="bg-[#F3C98B] h-[5px] lg:h-[10px] rounded-full"
                        style={{
                          width:
                            Math.min(
                              Math.floor(
                                ((projectData?.currentAmount || 0) /
                                  (projectData.goalAmount / 100)) *
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
                          ((projectData?.currentAmount || 0) /
                            (projectData.goalAmount / 100)) *
                            100
                        ),
                        100
                      )}
                      %
                    </span>
                  </div>
                </div>
                <div className="mt-6 w-60">
                  <DonateButton slug={params.slug} />
                </div>
              </div>
            </div>
            <Image
              src={
                projectData.images?.[0]?.path
                  ? projectData.images?.[0]?.path
                  : "/assets/placeholder.svg"
              }
              fill
              alt={"Hero bg"}
              className="object-cover bg-[#c1c1c1] blur-md z-0"
            />
            <Image
              src={
                projectData.images?.[0]?.path
                  ? projectData.images?.[0]?.path
                  : "/assets/placeholder.svg"
              }
              fill
              alt={"Hero"}
              className="object-contain z-10"
            />
          </div>
          {/* Body Section for Event Detail */}
          <div className="flex flex-1 flex-col gap-6">
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
                className="text-md md:text-[18px] leading-normal w-full"
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
                                media.images[0].path ||
                                "/assets/placeholder.svg"
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
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="container max-md:mt-5 pb-[40px] md:py-[60px] flex flex-col md:flex-row gap-16">
        {/* Left Section for Event Detail */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Title And Date */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-4">
              <GoBack />
              <h1 className="text-lg md:text-2xl font-semibold">
                {projectData.title}
              </h1>
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
              className="text-md md:text-[18px] leading-normal w-full"
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
        <div className="md:w-[360px] flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row md:flex-col gap-4">
            {/* Owner */}
            <div className="bg-white border p-5 rounded-2xl flex-1 flex flex-col items-center justify-center gap-2">
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
              <DonateButton slug={params.slug} />
            </div>
            {/* Partner and register details */}
            <div className="bg-white border p-5 rounded-2xl flex flex-col justify-center gap-3">
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
                            (projectData.currentAmount /
                              projectData.goalAmount) *
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
          </div>
          <div className="min-h-[512px] bg-white rounded-2xl flex overflow-hidden">
            <Ad position="ad_project_detail_3x2" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventPage;
