import {
  getHomeData,
  getHomeStatistics,
  getVolunteersCountry,
} from "@/actions";
import {
  Banner,
  UserTypeExplain,
  Features,
  LatestProjects,
  MediaSection,
  PartnersHome,
  EmailCta,
  MainLayout,
} from "@/components";
import VolunteersMap from "@/components/home/volunteers-map";

const Home = async () => {
  const {
    data: { data },
  } = await getHomeStatistics();
  const volunteersbyCountry = await getVolunteersCountry();
  const { features, latestProjects, latestMedia } = await getHomeData();
  return (
    <MainLayout>
      <Banner
        totalProjects={(data?.totalProjects as number) ?? 0}
        totalVolunteeringEvents={(data?.totalVolunteeringEvents as number) ?? 0}
        volunteersPercentage={(data?.volunteersPercentage as number) ?? 0}
        totalDonations={(data?.totalDonation as number) ?? 0}
        thisMonthProjectsAndEvents={
          (data?.thisMonthProjectsAndEvents as number) ?? 0
        }
      />
      <UserTypeExplain />
      <Features features={features} />
      <LatestProjects latestProjects={latestProjects} />
      <MediaSection latestMedia={latestMedia} />
      <VolunteersMap
        level_1={
          volunteersbyCountry?.totalVolunteersByLevel.find(
            ({ level }: { level: number }) => level == 1
          )?.total
        }
        level_2={
          volunteersbyCountry?.totalVolunteersByLevel.find(
            ({ level }: { level: number }) => level == 2
          )?.total
        }
        level_3={
          volunteersbyCountry?.totalVolunteersByLevel.find(
            ({ level }: { level: number }) => level == 3
          )?.total
        }
        level_4={
          volunteersbyCountry?.totalVolunteersByLevel.find(
            ({ level }: { level: number }) => level == 4
          )?.total
        }
        countries={volunteersbyCountry?.totalVolunteersByCountry || []}
      />
      <PartnersHome />
      <EmailCta />
      {/* <UsertypeExplain />
      <Features />
      <LatestProjects />
      <MediaSection />
      <VolunteersMap
        level_1={data?.level_1 ?? 0}
        level_2={data?.level_2 ?? 0}
        level_3={data?.level_3 ?? 0}
        level_4={data?.level_4 ?? 0}
        countries={data?.countries as unknown as Country[]}
      />
      <PartnersHome />
      <EmailCta /> */}
    </MainLayout>
  );
};

export default Home;
