import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Canvas } from '@react-three/fiber';
import CameraSettings from 'components/ThreeCanvas/CameraSettings';
import styled from 'styled-components';
import RingMaskImage from '@/components/three/RingMaskImage';

const ThreeDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: black;
`;

const RingMaskImageStory = {
  title: 'Three/RingMaskImage',
  component: RingMaskImage,
};

export const Primary: StoryFn = args => {
  const dpr = global?.window?.devicePixelRatio || 1;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <ThreeDiv>
      <Canvas dpr={[dpr, dpr]} ref={canvasRef}>
        <CameraSettings />
        <RingMaskImage src={args.src} start={0} end={100} />
      </Canvas>
    </ThreeDiv>
  );
};
Primary.args = {
  src: '/files/images/photo-1.jpg',
};

export default RingMaskImageStory;
