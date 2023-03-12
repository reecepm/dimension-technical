import * as React from "react";
import { SVGProps } from "react";
const SvgTag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#tag_svg__a)"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M5.667 6.333a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333Z"
        fill="currentColor"
      />
      <path d="M2.667 4.667v2.572c0 .358.142.702.395.955l5.41 5.41a1.352 1.352 0 0 0 1.91 0l3.223-3.222a1.35 1.35 0 0 0 0-1.91l-5.412-5.41a1.35 1.35 0 0 0-.954-.395H4.667a2 2 0 0 0-2 2Z" />
    </g>
    <defs>
      <clipPath id="tag_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTag;
