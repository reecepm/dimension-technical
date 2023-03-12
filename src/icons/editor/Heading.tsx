import * as React from "react";
import { SVGProps } from "react";
const SvgHeading = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#heading_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.25 9h7.5M5.25 3.75v10.5M12.75 3.75v10.5M11.25 14.25h3M11.25 3.75h3M3.75 14.25h3M3.75 3.75h3" />
    </g>
    <defs>
      <clipPath id="heading_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgHeading;
