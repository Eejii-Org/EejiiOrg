import Link from "next/link";
import { PersonIcon, PartnerIcon, VolunteerIcon } from "../icons";

export const UserSelect = () => {
  const userTypes = [
    {
      icon: <PersonIcon />,
      type: "Дэмжигч",
      href: "/auth/sign-in?user=supporter",
      disabled: true,
    },
    {
      icon: <PartnerIcon />,
      type: "Хамтрагч",
      href: "https://www.partner.eejii.org",
      disabled: true,
    },
    {
      icon: <VolunteerIcon />,
      type: "Сайн дурын ажилтан",
      href: "/auth/sign-in?user=volunteer",
      disabled: false,
    },
  ];
  return (
    <section className="container flex flex-col flex-1 justify-center h-full pb-48">
      <h2 className="text-2xl font-semibold text-black/65 text-center pb-16">
        Та доорх хэрэглэгчдийн төрлөөс сонгон цааш үргэлжлүүлнэ үү.
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-center justify-center">
        {userTypes.map(({ icon, type, href, disabled }, index) =>
          disabled ? (
            <div
              className="flex flex-col gap-1.5 bg-white drop-shadow-card py-4 md:py-16 flex-1 items-center justify-center rounded-2xl border transition-all w-full md:w-auto opacity-50"
              key={index}
            >
              {icon}
              <h3 className="capitalize">{type}</h3>
            </div>
          ) : (
            <Link
              href={href}
              className="flex flex-col gap-1.5 bg-white drop-shadow-card py-4 md:py-16 flex-1 items-center justify-center rounded-2xl border hover:bg-black/5 transition-all cursor-pointer w-full md:w-auto"
              key={index}
            >
              {icon}
              <h3 className="capitalize">{type}</h3>
            </Link>
          )
        )}
      </div>
    </section>
  );
};
