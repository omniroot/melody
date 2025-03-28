import * as React from "react";

export const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 4.59863L18.6021 12L7.5 19.4014V4.59863ZM9 7.40141V16.5986L15.8979 12L9 7.40141Z"
        fill="currentColor"
      />
    </svg>
  );
};
