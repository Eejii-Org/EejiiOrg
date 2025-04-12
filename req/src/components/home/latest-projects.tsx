import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "../icons";
import { Card } from "../card";

export const LatestProjects = ({
  latestProjects,
}: {
  latestProjects: any[];
}) => {
  return (
    <div className="py-16 relative">
      <Image
        src="/assets/home/backGroundImg.png"
        fill
        alt="latestProjectsBg"
        className="z-0 object-cover"
      />
      <div className="md:container flex-col sticky z-10">
        <div className="max-md:container font-bold text-2xl md:text-4xl">
          Бидний сүүлийн үеийн төслүүд
        </div>
        <div className="max-md:container pt-4 flex flex-row justify-between">
          <div className="text-black/50 font-semibold text-xl max-md:hidden">
            Хандивийн төслүүдтэй дэлгэрэнгүй танилцаарай
          </div>
          <Link
            href="/projects"
            className=" text-primary font-bold text-lg flex justify-center items-center gap-2"
          >
            Дэлгэрэнгүй
            <ArrowRight />
          </Link>
        </div>
        <div className="flex max-md:px-16 flex-row gap-16 pt-8 max-md:overflow-x-auto  max-md:snap-x max-md:snap-mandatory max-md:scroll-smooth">
          {latestProjects?.map((project, index) => (
            <div
              className="max-md:min-w-[90vw] flex-1 flex max-md:snap-always max-md:snap-center"
              key={index}
            >
              <Card
                cardData={project}
                cardSize="large"
                cardType="project"
                categoryVisible
                contain
                key={index}
              />
            </div>
          ))}
          {latestProjects.length < 3 && (
            <>
              {new Array(3 - latestProjects.length)
                .fill(null)
                .map((_, index) => (
                  <div
                    className="max-md:min-w-[90vw] flex-1 flex max-md:snap-always max-md:snap-center"
                    key={"prop" + index}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestProjects;
