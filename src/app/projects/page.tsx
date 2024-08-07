import { getCategories, getFeaturedProjects, getProjects } from "@/actions";
import { MainLayout } from "@/components";
import { ProjectBody } from "@/components/projects";
import { EventType } from "@/types";
import Image from "next/image";

const ProjectPage = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    q: string;
    t: "fundraising" | "grant_fundraising";
    category: string;
  };
}) => {
  const { page = 1, q = "", t = "fundraising", category = "" } = searchParams;
  const { data: eventsData } = await getProjects(page, q, t, category);
  const { data: featuredProjectsData } = await getFeaturedProjects();
  const cateogories = await getCategories();
  const events: EventType[] = eventsData?.["hydra:member"];
  const featuredProjects: EventType[] = featuredProjectsData?.["hydra:member"];
  const lastPageIndex = eventsData?.["hydra:meta"].pagination.last;
  return (
    <MainLayout>
      <div className="container max-md:mt-5 pb-[40px] md:py-[60px]">
        <div className="flex max-md:flex-col gap-5 md:gap-9">
          <div className="absolute top-0 left-0 h-48 md:h-80 w-screen">
            <Image
              src="/assets/event/banner.webp"
              fill
              alt="event-banner"
              className="object-cover"
            />
          </div>
          <ProjectBody
            pageIndex={page}
            lastPageIndex={lastPageIndex}
            projects={events}
            categories={cateogories}
            featuredProjects={featuredProjects}
            t={t}
            q={q}
            category={category}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectPage;
