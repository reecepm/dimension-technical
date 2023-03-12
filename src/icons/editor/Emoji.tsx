import * as React from "react";
import { SVGProps } from "react";
const SvgEmoji = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#emoji_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.25 9a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 0 0-13.5 0ZM6.75 7.5h.006M11.25 7.5h.006" />
      <path d="M7.125 11.25a2.626 2.626 0 0 0 3.75 0" />
    </g>
    <defs>
      <clipPath id="emoji_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgEmoji;
