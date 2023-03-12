import * as React from "react";
import { type SVGProps } from "react";

const EnterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.667 4a.667.667 0 0 0-.667.667v2.666a.667.667 0 0 1-.667.667H4.94l.867-.86a.67.67 0 1 0-.947-.947l-2 2a.667.667 0 0 0-.14.22.667.667 0 0 0 0 .507c.032.082.08.157.14.22l2 2a.666.666 0 0 0 .947 0 .667.667 0 0 0 0-.947l-.867-.86h6.393a2 2 0 0 0 2-2V4.667A.667.667 0 0 0 12.667 4Z"
      fill="currentColor"
    />
  </svg>
);

export default EnterIcon;
