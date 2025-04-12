"use client";
import { excludeKeys } from "@/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Button = (props: ButtonPropsType) => {
  const buttonAttributes = excludeKeys(props, ["className"]);
  return (
    <button
      className={`bg-primary p-3 rounded-2xl text-white text-lg font-bold tracking-wider hover:bg-[#8AB8BB] transition-all ${
        props.className ? props.className : ""
      }`}
      {...buttonAttributes}
    >
      {props.children}
    </button>
  );
};
