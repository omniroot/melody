import * as React from "react";

export const PauseIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M307.2 256h153.6v512H307.2V256zm256 512h153.6V256H563.2v512z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
