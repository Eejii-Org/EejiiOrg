import { getPartners } from "@/actions";
import { Button, MainLayout, PartnerCard } from "@/components";
import Image from "next/image";

const PartnersPage = async () => {
  const partners = await getPartners();
  return (
    <MainLayout>
      <div className="container max-md:mt-5 pb-[40px] flex flex-col gap-16">
        {/* Intro */}
        <div className="flex flex-row">
          <div className="flex-1 flex flex-col gap-8 pr-16 py-24">
            <h1 className="text-3xl font-bold text-primary">Eejii Partners</h1>
            <h1 className="text-3xl font-medium">
              Сайхан ирээдүйг сайн хүн биш сайн хүмүүс бүтээдэг
            </h1>
            <h2 className="italic font-semibold">
              “Бид нэгдсэнээр зөв тусыг хэрэгтэй хүнд нь хүргэх, нийгмийн хэт
              туйлшрал, бэлэнчлэх сэтгэлгээ, ядуурал, өвчлөлөөс хүн амыг
              хамгаалан хамтдаа олон талаар хөгжүүлэх боломжтой”
            </h2>
            <h2 className="font-medium">
              ~ Ананда Диди, Бадамлянхуа асрамжийн төвийн үүсгэн байгуулагч
            </h2>
            <div className="flex justify-end">
              <Button className=" px-6">Хамтрагч болох</Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <Image
              src="/assets/partner/partner-hero.webp"
              alt="hero"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Body */}
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <div
              className={`cursor-pointer text-lg font-bold px-4 py-[14px] border-b-2 border-primary uppercase`}
            >
              Бидний хамтрагчид
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 drop-shadow-md shadow-primary">
            {partners.map((partner: any, index: number) => (
              <PartnerCard data={partner} key={index} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PartnersPage;
