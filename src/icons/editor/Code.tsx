import * as React from "react";
import { SVGProps } from "react";
const SvgCode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#code_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5.25 6-3 3 3 3M12.75 6l3 3-3 3M10.5 3l-3 12" />
    </g>
    <defs>
      <clipPath id="code_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCode;
