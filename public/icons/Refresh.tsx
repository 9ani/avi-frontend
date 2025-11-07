import * as React from "react";
const Refresh = ({
  w = 26,
  h = 26,
  strokeColor = "#7E7D78",
}: {
  w?: number;
  h?: number;
  strokeColor?: string;
}) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 14.5C25 11.3174 23.7357 8.26516 21.4853 6.01472C19.2348 3.76428 16.1826 2.5 13 2.5C9.64527 2.51262 6.42529 3.82163 4.01333 6.15333L1 9.16667"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 1V7.66667H7.66667M1 13C1 16.1826 2.26428 19.2348 4.51472 21.4853C6.76516 23.7357 9.8174 25 13 25C16.3547 24.9874 19.5747 23.6784 21.9867 21.3467L25 18.3333"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3334 18.3333H25V24.9999"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Refresh;
