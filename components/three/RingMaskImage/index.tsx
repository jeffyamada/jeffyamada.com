import React, { useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Text as TroikaText } from 'troika-three-text';
import { Mask, useMask } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
// import { useControls } from 'leva';
import { useTexture } from '@react-three/drei';
import _ from 'lodash';
import gsap, { Expo } from 'gsap';
import { useAnimationFrame, useScroll } from 'framer-motion';
import useScreenSize from '@/hooks/useScreenSize';
import Point from '@/lib/Point';
import { ScrollPageContext } from '@/components/ScrollingPage';

extend({ TroikaText });

export type MaskedContentProps = {
  src: string;
  index: number;
};

type Ref = THREE.Group;

const MaskedContent = React.forwardRef<Ref, MaskedContentProps>(
  ({ src = '/files/images/photo-1.jpg', index = 1 }, ref) => {
    const stencil = useMask(index + 1);
    const imageRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    // const [introComplete, setIntroComplete] = useState(false);
    const texture = useTexture(src);

    // const mouseRef = useRef({ x: 0, y: 0 });

    const ww = global?.window?.innerWidth || 100;
    // const fontSize = Math.round((ww / 1200) * 180);

    // useEffect(() => {
    //   gsap.to(materialRef.current, {
    //     opacity: 1,
    //     delay: 1 + index * 0.15,
    //     duration: 1,
    //   });

    //   if (imageRef.current) {
    //     gsap.set(imageRef.current.position, { y: -1000 });
    //     gsap.to(imageRef.current.position, {
    //       y: 0,
    //       duration: 2,
    //       delay: 2 * index * 0.1,
    //     });
    //   }
    // }, []);

    return (
      <group ref={ref}>
        <mesh ref={imageRef}>
          <planeBufferGeometry attach="geometry" args={[900, 600]} />
          <meshBasicMaterial
            attach="material"
            map={texture}
            {...stencil}
            ref={materialRef}
            transparent={true}
            opacity={1}
          />
        </mesh>
      </group>
    );
  },
);

const MaskedImage = ({
  src = '',
  inner = 80,
  outter = 160,
  index = 0,
  start = 0,
  end = 100,
}) => {
  const contentRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const { scrollingActive } = useContext(ScrollPageContext);

  const { screenWidth, screenHeight } = useScreenSize();
  const stencil = useMask(index + 1);
  const texture = useTexture(src);

  const aspectRatio = texture.image.width / texture.image.height;
  const imageWidth = screenWidth * 1.1;
  const imageHeight = imageWidth / aspectRatio;

  const scrollTargetRef = useRef<HTMLElement>(
    document.getElementById('page-container'),
  );
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: [`start ${start}vh`, `end ${end}vh`],
  });

  useEffect(() => {
    if (!contentRef?.current) return;
    gsap.set(contentRef.current.position, { z: 0 });
    gsap.to(contentRef.current.position, {
      z: 0,
      duration: 4,
      delay: 1 + index * 0.15,
      ease: Expo.easeInOut,
    });
  }, []);

  useAnimationFrame(() => {
    if (!meshRef?.current) return;
    const wh = global?.window.innerHeight || 100;
    const opacity = scrollingActive
      ? Point.remap(scrollYProgress.get(), 0, 0.5, 0, 0.4)
      : 0;

    gsap.to(meshRef?.current.position, {
      y: Math.min(0, scrollYProgress.get() * wh - wh / 2),
      duration: index * 0.1,
    });
    gsap.to(materialRef.current, {
      opacity,
      duration: 0.1,
    });
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <planeBufferGeometry
          attach="geometry"
          args={[imageWidth, imageHeight]}
        />
        <meshBasicMaterial
          attach="material"
          map={texture}
          {...stencil}
          ref={materialRef}
          transparent={true}
          opacity={0}
        />
      </mesh>
    </group>
  );
};

export type RingMaskImageProps = {
  src: string;
  start: number;
  end: number;
};

const RingMaskImage = ({ src, start = 0, end = 0 }: RingMaskImageProps) => {
  const renderRings = () => {
    const ww = global?.window?.innerWidth || 100;
    const wh = global?.window?.innerHeight || 100;
    const ringSize = (ww / 1200) * 60;
    const screenMax = Math.max(ww, wh);
    const totalRings = Math.ceil(screenMax / ringSize + 1);
    const masks: JSX.Element[] = [];

    _.times(totalRings, r => {
      const inner = r * ringSize;
      const outter = r * ringSize + ringSize;
      const key = `mask-text-${r}`;
      masks.push(
        <MaskedImage
          src={src}
          inner={inner}
          outter={outter}
          index={r}
          key={key}
        />,
      );
    });

    return masks;
  };

  return <group>{renderRings()}</group>;
};

export default RingMaskImage;
