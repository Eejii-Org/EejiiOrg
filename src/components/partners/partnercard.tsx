import Image from "next/image";
import { Verified } from "../icons";
import Link from "next/link";
export const PartnerCard = ({ data }: { data: any }) => {
  const mainImage =
    data.images.find((img: any) => img.type == "main")?.path ||
    "/assets/placeholder.svg";
  return (
    <Link
      className="flex-1 flex flex-col p-5 bg-white rounded-lg gap-3"
      href={`/partners/${data.id}`}
    >
      <div className="w-20 h-20 rounded-2xl overflow-hidden relative">
        <Image src={mainImage} fill alt={"card-" + data.username} />
      </div>
      <h3 className="font-semibold">
        {data.username}
        <span className="inline-block h-4 pt-[2px] pl-1">
          <Verified />
        </span>
      </h3>

      <p className="max-line-2 text-black/60">{data.introduction}</p>
    </Link>
  );
};
