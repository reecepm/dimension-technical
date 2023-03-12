import * as React from "react";
import { SVGProps } from "react";

const CircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 15 15"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0 2.375 2.375 0 0 1 4.75 0Z"
    />
  </svg>
);

export default CircleIcon;
