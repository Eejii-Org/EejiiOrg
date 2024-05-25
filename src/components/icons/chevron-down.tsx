import { IconPropsType } from "./index";

export const ChevronDown = ({
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
    <g id="Arrow / Chevron_Down">
      <path
        id="Vector"
        d="M19 9L12 16L5 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
