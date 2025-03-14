import * as React from "react";

export const RepeatIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Repeat-Play</title>
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g>
          <rect fillRule="nonzero" x={0} y={0} width={24} height={24}></rect>
          <path
            d="M5,18.0002 L17,18.0002 C18.6569,18.0002 20,16.657 20,15.0002 L20,14"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          ></path>
          <path
            d="M16,2 L19.2929,5.29289 C19.6834,5.68342 19.6834,6.31658 19.2929,6.70711 L16,10"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          ></path>
          <path
            d="M8,14 L4.70711,17.2929 C4.31658,17.6834 4.31658,18.3166 4.70711,18.7071 L8,22"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          ></path>
          <path
            d="M19,6 L7,6 C5.34315,6 4,7.34315 4,9 L4,10"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          ></path>
        </g>
      </g>
    </svg>
  );
};
