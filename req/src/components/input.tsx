/* Global Input Element */

import { excludeKeys } from "@/utils";
import { InputHTMLAttributes } from "react";

// Props
// Children, label, icon, onChange, value, min, max .... al the other input elemnt styles, disabled

interface InputPropsType extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input = (props: InputPropsType) => {
  const { label } = props;
  const inputProps = excludeKeys(props, ["label"]);
  return (
    <div className="flex flex-col w-full gap-2">
      {label && <label className="font-medium text-lg">{label}</label>}
      <div className="flex items-center w-full">
        {props?.icon || ""}
        <input
          {...inputProps}
          className={` focus:outline-primary w-full rounded-2xl py-[14px] px-4 border border-[#CCCCCC]  ${
            props.className ? props.className : ""
          }`}
        />
      </div>
    </div>
  );
};
