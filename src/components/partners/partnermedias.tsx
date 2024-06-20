import { getMediaByPartner } from "@/actions";
import { Card } from "../card";

export const PartnerMedias = async ({ partner }: { partner: any }) => {
  const medias = await getMediaByPartner(partner, 4);
  return (
    <div className="flex-1 grid grid-cols-4 gap-8 min-h-[386px]">
      {medias.map((media: any, index: number) => (
        <Card cardType="media" cardData={media} key={index} />
      ))}
    </div>
  );
};
