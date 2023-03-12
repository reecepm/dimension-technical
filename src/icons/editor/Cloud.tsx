import * as React from "react";
import { SVGProps } from "react";
const SvgCloud = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cloud_svg__a)">
      <path fill="transparent" d="M0 0h16v16H0z" />
      <path
        d="M4.438 12c-1.715 0-3.105-1.338-3.105-2.989 0-1.65 1.39-2.988 3.105-2.988C4.7 4.85 5.634 3.89 6.888 3.508c1.253-.381 2.637-.129 3.63.667.991.793 1.44 2.004 1.18 3.179h.66c1.275 0 2.309 1.04 2.309 2.324a2.317 2.317 0 0 1-2.31 2.325h-7.92"
        fill="currentColor"
      />
      <path
        d="M4.438 12c-1.715 0-3.105-1.338-3.105-2.989 0-1.65 1.39-2.988 3.105-2.988C4.7 4.85 5.634 3.89 6.888 3.508c1.253-.381 2.637-.129 3.63.667.991.793 1.44 2.004 1.18 3.179h.66c1.275 0 2.309 1.04 2.309 2.324a2.317 2.317 0 0 1-2.31 2.325h-7.92"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="cloud_svg__a">
        <path fill="transparent" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCloud;
