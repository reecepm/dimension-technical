import * as React from "react";
import { type SVGProps } from "react";

const FrontendIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M8.667 2v4.667h4L7.333 14V9.333h-4L8.667 2Z"
        fill="#3FBC77"
        stroke="#3FBC77"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default FrontendIcon;
