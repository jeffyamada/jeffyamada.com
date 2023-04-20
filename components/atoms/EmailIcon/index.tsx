import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  padding: 0 0 0 1px;
  margin: 0;
  transform: translateY(-2px);
`;

function EmailIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm0 0v1.5a2.5 2.5 0 002.5 2.5v0a2.5 2.5 0 002.5-2.5V12a9 9 0 10-9 9h4"
      ></path>
    </Svg>
  );
}

export default EmailIcon;
