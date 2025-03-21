import * as React from "react";

export const InPlaylistIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M3 7a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM4 10a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2H4ZM21.707 13.707a1 1 0 0 0-1.414-1.414L17 15.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4ZM4 14a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H4Z"
        fill="currentColor"
      />
    </svg>
  );
};
