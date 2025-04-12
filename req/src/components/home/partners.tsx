import Image from "next/image";

export const PartnersHome = () => {
  const partnersLogo: any = [
    { name: "M Trip", src: "/assets/partner/mtrip.png", height: 50 },
    {
      name: "TTR Mongolia",
      src: "/assets/partner/ttrmongolialogo.png",
      height: 50,
    },
    {
      name: "Gegeenten Cinema",
      src: "/assets/partner/gegeentencinema.png",
      height: 50,
    },
    { name: "Pick Pack", src: "/assets/partner/pickpack.png", height: 50 },
    { name: "M Trip", src: "/assets/partner/mtrip.png", height: 50 },
    {
      name: "TTR Mongolia",
      src: "/assets/partner/ttrmongolialogo.png",
      height: 50,
    },
    {
      name: "Gegeenten Cinema",
      src: "/assets/partner/gegeentencinema.png",
      height: 50,
    },
    { name: "Pick Pack", src: "/assets/partner/pickpack.png", height: 50 },
    { name: "M Trip", src: "/assets/partner/mtrip.png", height: 50 },
    {
      name: "TTR Mongolia",
      src: "/assets/partner/ttrmongolialogo.png",
      height: 50,
    },
    {
      name: "Gegeenten Cinema",
      src: "/assets/partner/gegeentencinema.png",
      height: 50,
    },
    { name: "Pick Pack", src: "/assets/partner/pickpack.png", height: 50 },
    { name: "M Trip", src: "/assets/partner/mtrip.png", height: 50 },
    {
      name: "TTR Mongolia",
      src: "/assets/partner/ttrmongolialogo.png",
      height: 50,
    },
    {
      name: "Gegeenten Cinema",
      src: "/assets/partner/gegeentencinema.png",
      height: 50,
    },
    { name: "Pick Pack", src: "/assets/partner/pickpack.png", height: 50 },
  ];

  return (
    <div className="container py-12 flex flex-col justify-start items-center gap-12 md:gap-16 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <div className="font-semibold text-2xl md:text-4xl">Манай хамрагчид</div>
      <div className="relative w-full cursor-pointer overflow-hidden h-10">
        <div className="flex flex-row items-center w-min gap-16 partner-scroll">
          {partnersLogo.map((partner: any, i: number) => (
            <Image
              key={i}
              src={partner.src}
              alt={partner.name}
              height={partner.height}
              width={100}
              className={`saturate-0 object-contain w-fit h-[${partner.height}px]`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersHome;
