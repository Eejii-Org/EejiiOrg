import { IconPropsType } from "./index";

export const ArrowLeft = ({
  color = "white",
  width = 24,
  height = 24,
}: IconPropsType) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Arrow / Arrow_Left_MD">
      <path
        id="Vector"
        d="M19 12H5M5 12L11 18M5 12L11 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
