"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { CaretDown, Close, Menu } from "./icons";
import { DonateModal } from "./home";

const links = [
  {
    link: "#1",
    label: "Платформ",
    links: [
      { link: "/projects", label: "Projects", icon: <></> },
      { link: "/events", label: "Events", icon: <></> },
      {
        link: "/volunteering",
        label: "Volunteering",
        icon: <></>,
      },
      { link: "/supporters", label: "Supporters", icon: <></> },
      { link: "/partners", label: "Partners", icon: <></> },
      { link: "/volunteers", label: "Volunteers", icon: <></> },
    ],
  },
  {
    link: "/media",
    label: "Медиа",
  },
  { link: "/about", label: "Бидний тухай" },
  {
    link: "/auth",
    label: "Нэвтрэх",
    links: [
      {
        link: "/auth",
        label: "Volunteer",
      },
      {
        link: "/auth",
        label: "Partner",
      },
    ],
  },
  { link: "/projects", label: "Donate" },
];

export const Header = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [isNavOpened, setIsNavOpened] = useState(false);
  const [isAuthOpened, setIsAuthOpened] = useState(false);

  return (
    <header className="bg-white fixed w-full z-50 shadow-sm">
      <div className="container mx-auto flex flex-row justify-between py-[12px] items-center">
        <Link href="/">
          <div className="relative w-[168px] h-[42px]">
            <Image
              src="/assets/logo.png"
              alt="foundation Logo"
              fill
              objectFit="contain"
            />
          </div>
        </Link>
        <button
          onClick={() => setIsNavOpened((prevState) => !prevState)}
          className="md:hidden transition-all"
        >
          {isNavOpened ? <Close /> : <Menu />}
        </button>
        <div className="absolute max-md:shadow-md right-0 top-[65px] w-full md:w-auto md:static">
          <div
            className={`bg-white flex-col gap-2 md:rounded border z-10 ${
              isNavOpened ? "flex" : "hidden"
            } md:flex md:flex-row md:static md:border-none md:w-auto`}
          >
            {links.map((link, index) => {
              if (link.label == "Платформ") {
                return (
                  <button
                    onClick={() =>
                      setIsDropdownOpened((prevState) => !prevState)
                    }
                    className="transition all duration-500 ease-out pl-6 pr-4 py-3 text-base font-semibold md:hover:bg-black/5 rounded-xl relative flex flex-col gap-1 text-left"
                    key={index}
                  >
                    <div className="flex flex-row items-center">
                      {link.label}
                      <div
                        className={`inline transition-all ${
                          isDropdownOpened && "rotate-180"
                        }`}
                      >
                        <CaretDown />
                      </div>
                    </div>
                    <div
                      className={`md:absolute bottom-0 pt-2 md:-bottom-3 md:p-5 md:left-1/2 md:translate-y-full transition-all duration-500 ease-out w-full md:w-[384px] md:-translate-x-1/2 rounded-xl border-none z-10 md:shadow md:bg-white ${
                        isDropdownOpened ? "grid sm:grid-cols-2" : "hidden"
                      } md:border`}
                    >
                      {link.links?.map((l, i) => (
                        <NavLink href={l.link} key={i}>
                          {l.label}
                        </NavLink>
                      ))}
                    </div>
                  </button>
                );
              }
              if (link.label == "Нэвтрэх") {
                return (
                  <button
                    onClick={() => setIsAuthOpened((prevState) => !prevState)}
                    className="transition all duration-500 ease-out pl-6 pr-4 py-3 text-base font-semibold md:hover:bg-black/5 rounded-xl relative flex flex-col gap-1 text-left"
                    key={index}
                  >
                    <div className="flex flex-row items-center">
                      {link.label}
                      <div
                        className={`inline transition-all ${
                          isAuthOpened && "rotate-180"
                        }`}
                      >
                        <CaretDown />
                      </div>
                    </div>
                    <div
                      className={`md:absolute bottom-0 pl-4 md:pl-0 md:-bottom-3 md:px-0 md:left-1/2 md:translate-y-full transition-all duration-500 ease-out w-full md:w-[160px] md:-translate-x-1/2 rounded-xl border-none z-10 md:shadow md:bg-white ${
                        isAuthOpened ? "flex flex-col" : "hidden"
                      } md:border`}
                    >
                      {link.links?.map((l, i) => (
                        <NavLink href={l.link} key={i}>
                          {l.label}
                        </NavLink>
                      ))}
                    </div>
                  </button>
                );
              }
              if (link.label === "Donate") {
                return <DonateModal key={link.label} />;
              } else
                return (
                  <NavLink href={link.link} key={index}>
                    {link.label}
                  </NavLink>
                );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

type NavLinkType = {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

const NavLink = ({ children, href, icon }: NavLinkType) => {
  return (
    <Link
      href={href}
      className="px-6 py-3 text-base font-semibold md:hover:bg-black/5 rounded-xl transition-all flex flex-row items-center"
    >
      {icon && <div className="border p-2 rounded-xl">{icon}</div>}

      {children}
    </Link>
  );
};
