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
import axios from "axios";

const Home = async () => {
  const {
    data: { data },
  } = await axios.get(`${process.env.BACKEND_URL}/api/home/statistics`);
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
      <Features />
      <LatestProjects />
      <MediaSection />
      <VolunteersMap
        level_1={data.level_1}
        level_2={data.level_2}
        level_3={data.level_3}
        level_4={data.level_4}
        countries={data?.countries}
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
