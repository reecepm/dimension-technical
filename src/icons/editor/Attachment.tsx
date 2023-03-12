import * as React from "react";
import { SVGProps } from "react";
const SvgAttachment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#attachment_svg__a)">
      <path
        d="m11.25 5.25-4.875 4.875a1.591 1.591 0 1 0 2.25 2.25L13.5 7.5A3.182 3.182 0 1 0 9 3L4.125 7.875a4.773 4.773 0 0 0 6.75 6.75L15.75 9.75"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="attachment_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAttachment;
