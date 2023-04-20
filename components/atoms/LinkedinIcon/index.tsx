import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  padding: 0;
  margin: 0;
`;

function LinkedinIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#fff"
        d="M18.72 4H5.37A1.31 1.31 0 004 5.25v13.38A1.41 1.41 0 005.37 20h13.35A1.34 1.34 0 0020 18.63V5.25A1.23 1.23 0 0018.72 4zM9 17.34H6.67v-7.13H9v7.13zM7.89 9.13A1.18 1.18 0 016.67 7.9a1.18 1.18 0 011.24-1.23A1.18 1.18 0 019.13 7.9a1.18 1.18 0 01-1.24 1.23zm9.45 8.21H15v-3.9c0-.93-.33-1.57-1.16-1.57a1.25 1.25 0 00-1.17.84 1.431 1.431 0 00-.08.57v4.06h-2.3v-7.13h2.3v1a2.32 2.32 0 012.1-1.21c1.51 0 2.65 1 2.65 3.13v4.21z"
      ></path>
    </Svg>
  );
}

export default LinkedinIcon;
