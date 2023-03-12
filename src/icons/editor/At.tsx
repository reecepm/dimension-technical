import * as React from "react";
import { SVGProps } from "react";
const SvgAt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#at_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
      <path d="M12 9v1.125a1.875 1.875 0 1 0 3.75 0V9a6.75 6.75 0 1 0-4.125 6.21" />
    </g>
    <defs>
      <clipPath id="at_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAt;
