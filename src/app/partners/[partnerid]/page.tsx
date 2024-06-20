import { getPartner } from "@/actions";
import { MainLayout, PartnerMedias, PartnerProjects } from "@/components";
import Image from "next/image";
const PartnerPage = async (props: any) => {
  const mediaId = props.params?.["partnerid"];
  const partner = await getPartner(mediaId);
  const aboutImage =
    partner.images.find((img: any) => img.type == "about")?.path ||
    "/assets/placeholder.svg";
  const mainImage =
    partner.images.find((img: any) => img.type == "main")?.path ||
    "/assets/placeholder.svg";
  const coverImage =
    partner.images.find((img: any) => img.type == "cover")?.path ||
    "/assets/placeholder.svg";
  return (
    <MainLayout>
      <div
        className="bg-white"
        style={{
          boxShadow: `0px 4px 8px rgba(60, 136, 141, 0.16)`,
        }}
      >
        <div className="container max-md:mt-5 flex flex-col gap-16 ">
          <div className="flex flex-row py-16 ">
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
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-semibold pb-4">
                    {partner.username}
                  </h1>
                  <h2 className="text-black/50">{partner.organizationType}</h2>
                  <h3 className="text-black/50 font-semibold">
                    {partner.address.address}
                  </h3>
                </div>
              </div>
              <p className="text-[18px]">{partner.bio}</p>
            </div>
            <div className="min-w-[480px] min-h-[400px] rounded-2xl overflow-hidden relative">
              <Image
                src={aboutImage}
                alt="AboutImage"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-16 pt-12">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center">
            <div
              className={`cursor-pointer text-xl font-bold px-4 py-[14px] border-b-2 border-primary uppercase`}
            >
              Төсөл хөтөлбөрүүд
            </div>
          </div>
          <PartnerProjects partner={partner} />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center">
            <div
              className={`cursor-pointer text-xl font-bold px-4 py-[14px] border-b-2 border-primary uppercase`}
            >
              Мэдээ мэдээлэл
            </div>
          </div>
          <PartnerMedias partner={partner} />
        </div>
      </div>
    </MainLayout>
  );
};

export default PartnerPage;
