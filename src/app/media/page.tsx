// "use client";

import { MainLayout } from "@/components";
import { MediaSearch } from "@/components/media";
import axios from "axios";
// import { useEffect, useState } from "react";

const Media = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media`
  );
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const getMedias = async () => {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media`
  //     );
  //     setData(res.data?.["hydra:member"]);
  //   };
  //   getMedias();
  // }, []);

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

export default Media;
