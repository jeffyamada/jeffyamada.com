import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Text as TroikaText, preloadFont } from 'troika-three-text';
import {
  // Mask,
  useMask,
  // TransformControls,
  // Float,
  // Environment,
  // OrbitControls,
  // MeshDistortMaterial,
  // ContactShadows,
  // useGLTF,
} from '@react-three/drei';
// import * as THREE from 'three';

import { useAnimationFrame, useScroll } from 'framer-motion';

import { extend, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import _ from 'lodash';
import gsap, { Expo } from 'gsap';
import { ScrollPageContext } from '@/components/ScrollingPage';
import useScreenSize from '@/hooks/useScreenSize';
import Point from '@/lib/Point';

extend({ TroikaText });

export type MaskedContentProps = {
  text: string;
  index: number;
  startMaskIndex: number;
  start: number;
  end: number;
};

type Ref = THREE.Group;

const font = '/files/fonts/sohne-halbfett.ttf';

const Text = ({
  text = '',
  index,
  startMaskIndex,
  start,
  end,
}: MaskedContentProps) => {
  const stencil = useMask(startMaskIndex + index);
  const textRef = useRef<THREE.Object3D>();
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { scrollingActive, introComplete } = useContext(ScrollPageContext);

  const mouseRef = useRef({ x: 0, y: 0 });

  // const ww = global?.window?.innerWidth || 100;
  // const fontSize = Math.round((ww / 2000) * 180);

  const { screenWidth, screenHeight } = useScreenSize();
  const [fontSize, setFontSize] = useState(
    Math.round((screenWidth / 2000) * 180),
  );

  useEffect(() => {
    setFontSize(Math.round((screenWidth / 2000) * 180));
  }, [screenWidth]);

  const scrollTargetRef = useRef<HTMLElement>(
    document.getElementById('page-container'),
  );
  const { scrollYProgress, scrollY } = useScroll({
    target: scrollTargetRef,
    // offset: [`start ${start}vh`, `end ${end}vh`],
  });

  useFrame(() => {
    // if (!introComplete) return;
    if (!textRef?.current?.position) return;
    const yProgress = 1 - Point.remap(scrollYProgress.get(), 0.6, 0.9, 0, 1);
    const yOffset = -screenHeight / 2 + scrollY.get();

    gsap.to(textRef?.current?.position, {
      y: yOffset + yProgress * -(screenHeight / 2),
      duration: 0.2 * index,
    });
    gsap.to(materialRef.current, {
      opacity: !scrollingActive
        ? 0
        : Point.remap(scrollYProgress.get(), 0, 0.35, 0, 1),
      duration: 0.1,
    });
  });

  return (
    <group>
      <troikaText
        ref={textRef}
        text={text}
        font={font}
        fontSize={fontSize}
        lineHeight={0.6}
        anchorX="center"
        anchorY="middle"
        glyphGeometryDetail={10}
      >
        {/* <meshStandardMaterial color={0xff0000} {...stencil} /> */}
        <meshBasicMaterial
          color={0xffffff}
          opacity={1}
          {...stencil}
          ref={materialRef}
        />
      </troikaText>
    </group>
  );
};

export type DiagonalText = {
  startMaskIndex: number;
  columns: number;
  text: string;
  start: number;
  end: number;
};

const DiagonalText = ({
  startMaskIndex = 0,
  columns = 10,
  text,
  start,
  end,
}: DiagonalText) => {
  // const scrollTargetRef = useRef<HTMLElement>(
  //   document.getElementById('page-container'),
  // );
  // const { scrollYProgress } = useScroll({
  //   target: scrollTargetRef,
  //   offset: [`start ${start}vh`, `end ${end}vh`],
  // });

  const lines: JSX.Element[] = [];
  _.times(columns, index => {
    lines.push(
      <Text
        key={`diagonal-text-line-${index}`}
        text={text}
        index={index}
        startMaskIndex={startMaskIndex}
        start={start}
        end={end}
      />,
    );
  });

  return <group position={[0, 0, 50]}>{lines}</group>;
};

export default DiagonalText;
