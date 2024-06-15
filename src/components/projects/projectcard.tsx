import { formatPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export const ProjectCard = ({ project }: { project: any }) => {
  return (
    <Link
      className="flex-1 rounded-xl overflow-hidden drop-shadow-sm bg-white shadow-teal-500 flex flex-col"
      href={`/projects/${project.slug}`}
    >
      <div className="relative h-48">
        <Image
          src={project.images[0].path}
          fill
          className="object-contain bg-white"
          alt={"Card" + project?.id}
        />
      </div>
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* <div className="text-sm text-tertiary">
          {toDateString(project.startTime)}
        </div> */}
        <p className="font-semibold text-lg max-line-2">{project.title}</p>
        <div className="flex flex-row items-center gap-1">
          <Image
            src={"/assets/placeholder.svg"}
            width={28}
            height={28}
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                "/assets/placeholder.svg";
            }}
            className="object-cover"
            alt={"CardProfile" + project?.id}
          />
          <label className="text-black/70 text-md font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            {project.owner?.username || project.title}
          </label>
        </div>
        <div className="flex-1 flex flex-col justify-end">
          <div>
            <div className="flex flex-row items-center gap-1">
              <div className="w-full bg-[#ECECEC] rounded-full h-[5px]">
                <div
                  className="bg-[#FF9900] h-[5px] rounded-full"
                  style={{
                    width:
                      Math.min(
                        Math.floor(
                          (project.currentAmount / project.goalAmount) * 100
                        ),
                        100
                      ) + "%",
                  }}
                ></div>
              </div>
              <span className="text-md">
                {Math.min(
                  Math.floor(
                    (project.currentAmount / project.goalAmount) * 100
                  ),
                  100
                )}
                %
              </span>
            </div>
            <div className="flex flex-row justify-between text-md">
              <div className="text-black/60">
                Цугласан:{" "}
                <span className=" text-[#FF9900]">
                  {formatPrice(project.currentAmount ?? 0, "MNT")}
                </span>
              </div>
              <div className="text-black/60">
                Зорилго:{" "}
                <span className=" text-primary">
                  {formatPrice(project.goalAmount ?? 0, "MNT")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
