import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraSettings from 'components/ThreeCanvas/CameraSettings';
import styled from 'styled-components';
import SplitParagraph from '@/components/SplitParagraph';

export interface StoryProps {
  // open?: boolean;
}

const ThreeDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: black;
`;

const SplitParagraphStory = {
  title: 'components/SplitParagraph',
  component: SplitParagraph,
};

const Template = () => {
  const dpr = global?.window?.devicePixelRatio || 1;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <SplitParagraph />;
};

export const Default = Template.bind({});

export default SplitParagraphStory;
