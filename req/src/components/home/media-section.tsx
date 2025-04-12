import Link from "next/link";
import { ArrowRight } from "../icons";
import { Card } from "../card";

export const MediaSection = ({ latestMedia }: { latestMedia: any[] }) => {
  // const { data, isLoading } = api.media.findAll.useQuery({ limit: 4 });
  return (
    <div className="md:container py-16">
      <div className="max-md:container font-bold text-2xl md:text-4xl">
        Мэдээ
      </div>
      <div className="max-md:container pt-4 flex flex-row justify-between">
        <div className="text-black/50 font-semibold text-xl max-md:hidden">
          Сангийн үйл ажиллагааны талаар сүүлийн үеийн мэдээлэлтэй хамтдаа
          байгаарай
        </div>
        <Link
          href="/media"
          className="text-primary font-bold text-lg flex justify-center items-center gap-2"
        >
          Дэлгэрэнгүй
          <ArrowRight />
        </Link>
      </div>
      <div className="flex max-md:overflow-x-scroll h-full max-md:snap-x max-md:snap-mandatory flex-row max-md:px-16 gap-16 md:gap-6 pt-8">
        {latestMedia?.map((mediaData, index) => (
          <div
            key={index}
            className="max-md:min-w-[90vw] md:flex-1 md:flex max-md:snap-always max-md:snap-center overflow-hidden"
            // onClick={() => console.log(mediaData)}
          >
            <Card cardData={mediaData} cardType="media" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSection;
