import { getSupporters } from "@/actions";
import { Button, MainLayout, SupportersTable } from "@/components";
import Image from "next/image";

const Supporters = async () => {
  const data = await getSupporters("");
  return (
    <MainLayout>
      <div className="h-[440px] relative flex items-center justify-center">
        <Image
          src={"/assets/volunteer/volunteer_hero.webp"}
          fill
          alt="VolunteerHero"
          className="object-cover absolute"
        />
        <div className="flex flex-col gap-5 z-10 text-white text-center items-center">
          <h1 className="text-3xl lg:text-5xl font-semibold">
            Eejii volunteers
          </h1>
          <h2 className="font-medium text-xl">
            Let’s create an earth full of love together
          </h2>
          <Button className="ripple !px-6">Дэмжигч Болох</Button>
        </div>
      </div>
      <SupportersTable supporters={data} />
    </MainLayout>
  );
};

export default Supporters;
