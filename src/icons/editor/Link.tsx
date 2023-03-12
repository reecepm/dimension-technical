import * as React from "react";
import { SVGProps } from "react";
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#link_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.5 10.5a2.626 2.626 0 0 0 3.75 0l3-3a2.652 2.652 0 0 0-3.75-3.75l-.375.375" />
      <path d="M10.5 7.5a2.625 2.625 0 0 0-3.75 0l-3 3a2.652 2.652 0 1 0 3.75 3.75l.375-.375" />
    </g>
    <defs>
      <clipPath id="link_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLink;
