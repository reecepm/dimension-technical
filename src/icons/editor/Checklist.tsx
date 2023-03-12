import * as React from "react";
import { SVGProps } from "react";
const SvgChecklist = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#checklist_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.625 4.125 3.75 5.25l1.875-1.875M2.625 8.625 3.75 9.75l1.875-1.875M2.625 13.125 3.75 14.25l1.875-1.875M8.25 4.5H15M8.25 9H15M8.25 13.5H15" />
    </g>
    <defs>
      <clipPath id="checklist_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgChecklist;
