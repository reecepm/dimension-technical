import * as React from "react";
import { SVGProps } from "react";
const SvgProject = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#project_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.667 3.333a.667.667 0 0 1 .666-.666H6a.667.667 0 0 1 .667.666V6A.667.667 0 0 1 6 6.667H3.333A.667.667 0 0 1 2.667 6V3.333ZM9.333 3.333A.667.667 0 0 1 10 2.667h2.667a.667.667 0 0 1 .666.666V6a.667.667 0 0 1-.666.667H10A.667.667 0 0 1 9.333 6V3.333ZM2.667 10a.667.667 0 0 1 .666-.667H6a.667.667 0 0 1 .667.667v2.667a.667.667 0 0 1-.667.666H3.333a.667.667 0 0 1-.666-.666V10ZM9.333 10A.667.667 0 0 1 10 9.333h2.667a.667.667 0 0 1 .666.667v2.667a.667.667 0 0 1-.666.666H10a.667.667 0 0 1-.667-.666V10Z" />
    </g>
    <defs>
      <clipPath id="project_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgProject;
