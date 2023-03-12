import * as React from "react";
import { SVGProps } from "react";
const SvgAi = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#ai_svg__a)">
      <path
        d="M13.333 15A1.666 1.666 0 0 1 15 16.667 1.666 1.666 0 0 1 16.667 15 1.666 1.666 0 0 1 15 13.333 1.666 1.666 0 0 1 13.333 15Zm0-10A1.666 1.666 0 0 1 15 6.667 1.667 1.667 0 0 1 16.667 5 1.666 1.666 0 0 1 15 3.333 1.667 1.667 0 0 1 13.333 5ZM7.5 15a5 5 0 0 1 5-5 5 5 0 0 1-5-5 5 5 0 0 1-5 5 5 5 0 0 1 5 5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="ai_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAi;
