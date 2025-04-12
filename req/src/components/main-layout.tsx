import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <section className="pt-[100px]">{children}</section>
      <Footer />
    </>
  );
};
