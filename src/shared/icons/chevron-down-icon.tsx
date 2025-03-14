import * as React from "react";

export const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={24} height={24} fill="white" />
      <path
        d="M17 9.5L12 14.5L7 9.5"
        stroke="currentColot"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
