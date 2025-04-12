import { IconPropsType } from "./index";

export const CaretDown = ({
  width = 24,
  height = 24,
  color = "black",
}: IconPropsType) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Arrow / Caret_Down_MD">
      <path
        id="Vector"
        d="M16 10L12 14L8 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
