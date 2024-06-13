import { getMedias } from "@/actions";
import { MainLayout } from "@/components";
import { MediaSearch } from "@/components/media";
const Medias = async ({
  searchParams,
}: {
  searchParams: { page: number; q: string };
}) => {
  const { page = 1, q = "" } = searchParams;
  const { data } = await getMedias(page, q);
  return (
    <MainLayout>
      <div className="container max-md:mt-5 pb-[40px] md:py-[60px]">
        <div className="flex max-md:flex-col gap-5 md:gap-9">
          <MediaSearch medias={data?.["hydra:member"] || []} />
          {/* <div className="max-md:hidden"> */}
          {/* <MediaSidebar /> */}
          {/* </div> */}
        </div>
      </div>
    </MainLayout>
  );
};

export default Medias;
