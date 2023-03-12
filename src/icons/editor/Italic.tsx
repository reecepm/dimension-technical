import * as React from "react";
import { SVGProps } from "react";
const SvgItalic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#italic_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.25 3.75h4.5M5.25 14.25h4.5M10.5 3.75l-3 10.5" />
    </g>
    <defs>
      <clipPath id="italic_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgItalic;
