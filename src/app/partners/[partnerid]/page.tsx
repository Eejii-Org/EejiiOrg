import { getPartner } from "@/actions";
import { MainLayout, PartnerMedias, PartnerProjects } from "@/components";
import Image from "next/image";
const PartnerPage = async (props: any) => {
  const mediaId = props.params?.["partnerid"];
  const partner = await getPartner(mediaId);
  const isBasic = partner.subscriptionCode === "basic";
  const aboutImage =
    partner.images.find((img: any) => img.type == "about")?.path ||
    "/assets/placeholder.svg";
  const mainImage =
    partner.images.find((img: any) => img.type == "main")?.path ||
    "/assets/placeholder.svg";
  const coverImage =
    partner.images.find((img: any) => img.type == "cover")?.path ||
    "/assets/placeholder.svg";
  const historyImages = partner.images
    .filter((img: any) => img.type == "history")
    .map((img: any) => img.path);
  // "/assets/placeholder.svg"
  // const historyImages = new Array(1).fill(
  //   "https://d2mstmber8qwm7.cloudfront.net/uploads/67/b8/3216b5e9b1804c553b3e11652255.jpg"
  // );
  return (
    <MainLayout>
      {!isBasic && (
        <div className="h-64 md:h-[440px] relative">
          <Image
            src={coverImage}
            fill
            alt="PartnerCoverImage"
            className="object-cover"
          />
        </div>
      )}

      <div
        className={`bg-white ${
          isBasic ? "" : "md:container rounded-2xl -mt-24 relative"
        }`}
        style={{
          boxShadow: `0px 4px 8px rgba(60, 136, 141, 0.16)`,
        }}
      >
        <div className="container flex flex-col gap-16">
          <div
            className={`flex flex-row ${
              isBasic ? "py-4 md:py-16" : "py-0 md:py-8"
            }`}
          >
            <div className="flex-1 pr-8 flex flex-col gap-6">
              <div className="flex flex-row items-center gap-4">
                {/* Profile */}
                <div className="w-36 h-36 relative">
                  <Image
                    src={mainImage}
                    fill
                    alt="PartnerProfilePicture"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col md:gap-2">
                  <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold md:pb-4">
                    {partner.username}
                  </h1>
                  <h2 className="text-black/50 text-sm md:text-lg">
                    {partner.organizationType}
                  </h2>
                  <h3 className="text-black/50 font-semibold text-sm md:text-xl">
                    {partner.address.address}
                  </h3>
                </div>
              </div>
              {isBasic && (
                <p className="text-md md:text-[18px]">{partner.bio}</p>
              )}
            </div>
            {isBasic && (
              <div className="min-w-[480px] min-h-[400px] rounded-2xl overflow-hidden relative max-md:hidden">
                <Image
                  src={aboutImage}
                  alt="AboutImage"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-16 max-md:px-2 pt-12 pb-24">
        {!isBasic && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center">
              <div
                className={`cursor-pointer text-lg md:text-xl font-bold px-4 py-[14px] border-b-2 border-primary uppercase`}
              >
                Бидний тухай
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 rounded-2xl overflow-hidden relative min-h-56 md:max-w-[480px] md:min-h-[400px]">
                <Image
                  src={aboutImage}
                  alt="AboutImage"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-md md:text-[18px]">{partner.bio}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center">
            <div
              className={`cursor-pointer text-lg md:text-xl font-bold px-4 py-[14px] border-b-2 border-primary uppercase`}
            >
              Төсөл хөтөлбөрүүд
            </div>
          </div>
          <PartnerProjects partner={partner} />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center">
            <div
              className={`cursor-pointer text-lg md:text-xl font-bold px-4 py-[14px] border-b-2 border-primary uppercase`}
            >
              Мэдээ мэдээлэл
            </div>
          </div>
          <PartnerMedias partner={partner} />
        </div>
        {!isBasic && partner.historyDescription && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center">
              <div
                className={`cursor-pointer text-lg md:text-xl font-bold px-4 py-[14px] border-b-2 border-primary uppercase`}
              >
                Бидний түүх
              </div>
            </div>
            <div className="flex flex-row gap-8">
              <div className="flex-1">
                <p className="text-[18px]">{partner.historyDescription}</p>
              </div>
              {historyImages.length !== 0 && (
                <div
                  className={`flex-1 grid ${
                    historyImages.length > 4
                      ? "grid-cols-3"
                      : historyImages.length == 1
                      ? "grid-cols-1"
                      : "grid-cols-2"
                  } gap-4 justify-center`}
                >
                  {historyImages.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="rounded-2xl overflow-hidden relative aspect-square"
                    >
                      <Image
                        src={image}
                        alt="AboutImage"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PartnerPage;
