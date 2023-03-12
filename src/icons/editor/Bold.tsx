import * as React from "react";
import { SVGProps } from "react";
const SvgBold = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#bold_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.25 3.75h4.5a2.625 2.625 0 0 1 0 5.25h-4.5V3.75ZM9.75 9h.75a2.625 2.625 0 0 1 0 5.25H5.25V9" />
    </g>
    <defs>
      <clipPath id="bold_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBold;
