import * as React from "react";
import { SVGProps } from "react";
const SvgTodo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={8}
      cy={8}
      r={6.5}
      stroke="currentColor"
      strokeLinejoin="round"
      strokeDasharray="2 2"
    />
  </svg>
);
export default SvgTodo;
