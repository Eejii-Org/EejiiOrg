import { getMediaByPartner } from "@/actions";
import { Card } from "../card";

export const PartnerMedias = async ({ partner }: { partner: any }) => {
  const medias = await getMediaByPartner(partner, 4);
  return (
    <div className="flex max-md:overflow-x-scroll h-full max-md:snap-x max-md:snap-mandatory flex-row md:gap-6 flex-1 min-h-[386px]">
      {medias.map((media: any, index: number) => (
        <div
          key={index}
          className="max-md:min-w-[90vw] md:flex-1 md:flex max-md:snap-always max-md:snap-center overflow-hidden max-md:px-4"
          // onClick={() => console.log(mediaData)}
        >
          <Card cardType="media" cardData={media} key={index} />
        </div>
      ))}
    </div>
  );
};
