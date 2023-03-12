import * as React from "react";
import { SVGProps } from "react";
const SvgUnorderedlist = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#unorderedlist_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.75 4.5H15M6.75 9H15M6.75 13.5H15M3.75 4.5v.006M3.75 9v.006M3.75 13.5v.006" />
    </g>
    <defs>
      <clipPath id="unorderedlist_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgUnorderedlist;
