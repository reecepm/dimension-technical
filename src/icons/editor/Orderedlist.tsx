import * as React from "react";
import { SVGProps } from "react";
const SvgOrderedlist = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#orderedlist_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.25 4.5H15M8.25 9H15M9 13.5h6M3 12a1.5 1.5 0 0 1 3 0c0 .443-.375.75-.75 1.125L3 15h3M4.5 7.5V3L3 4.5" />
    </g>
    <defs>
      <clipPath id="orderedlist_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgOrderedlist;
