import * as React from "react";
import { type SVGProps } from "react";

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m9.08 13.88-.56-.56L11.84 10 8.52 6.68l.56-.56L12.96 10l-3.88 3.88Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronRightIcon;
