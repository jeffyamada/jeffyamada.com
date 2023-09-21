import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ScrollingPage from '.';

const RingMaskImageStory = {
  title: 'ScrollingPage',
  component: ScrollingPage,
};

export const Primary: StoryFn = args => {
  const dpr = global?.window?.devicePixelRatio || 1;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return <ScrollingPage></ScrollingPage>;
};
Primary.args = {
  src: '/files/images/photo-1.jpg',
};

export default RingMaskImageStory;
