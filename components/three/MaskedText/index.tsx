import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Text as TroikaText, preloadFont } from 'troika-three-text';
import {
  Mask,
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

extend({ TroikaText });

export type MaskedContentProps = {
  text: string;
  index: number;
  start: number;
  end: number;
};

type Ref = THREE.Group;

const font = '/files/fonts/sohne-halbfett.ttf';
const MaskedContent = React.forwardRef<Ref, MaskedContentProps>(
  ({ text = '', index = 1, start = 0, end = 100 }, ref) => {
    const stencil = useMask(index + 1);
    const heyTextRef = useRef<THREE.Object3D>();
    const textRef = useRef<THREE.Object3D>();
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const heyMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
    const { introComplete } = useContext(ScrollPageContext);

    const mouseRef = useRef({ x: 0, y: 0 });

    const ww = global?.window?.innerWidth || 100;
    const fontSize = Math.round((ww / 1200) * 180);

    const onMouseMove = useCallback(
      (event: MouseEvent) => {
        if (!introComplete) return;
        const ww = global?.window?.innerWidth || 100;
        const wh = global?.window?.innerHeight || 100;
        gsap.to(mouseRef.current, {
          x: event.clientX - ww / 2,
          y: event.clientY - wh / 2,
          duration: 0.2,
        });
      },
      [introComplete],
    );

    const { screenWidth } = useScreenSize();

    const scrollTargetRef = useRef<HTMLElement>(
      document.getElementById('page-container'),
    );
    const { scrollYProgress } = useScroll({
      target: scrollTargetRef,
      offset: [`start ${start}vh`, `end ${end}vh`],
    });

    const heyPositionY = fontSize / 2;
    const heyPositionX = -screenWidth / 10;

    useEffect(() => {
      if (introComplete) {
        global?.window.addEventListener('mousemove', onMouseMove);
        gsap.to(heyMaterialRef.current, {
          opacity: 0,
          delay: 2,
          duration: 2,
        });
      }

      return () => {
        global?.window.removeEventListener('mousemove', onMouseMove);
      };
    }, [introComplete]);

    useEffect(() => {
      gsap.to(materialRef.current, {
        opacity: 1,
        delay: 2.2,
        duration: 2,
      });

      gsap.to(heyMaterialRef.current, {
        opacity: 1,
        delay: 2,
        duration: 2,
      });
    }, []);

    useFrame(() => {
      if (!introComplete) return;
      if (!textRef?.current?.position) return;
      if (!heyTextRef?.current?.position) return;
      gsap.to(textRef?.current?.position, {
        x: mouseRef.current.x * -0.3,
        y: mouseRef.current.y * 0.3,
        duration: 0.2 * index,
      });
      gsap.to(heyTextRef?.current?.position, {
        x: mouseRef.current.x * -0.3 + heyPositionX,
        y: mouseRef.current.y * 0.3 + heyPositionY,
        duration: 0.2 * index,
      });
      gsap.to(materialRef.current, {
        opacity: 1 - scrollYProgress.get() * 2,
        duration: 0.1,
      });
    });

    const showHey = text !== 'jeff yamada';

    return (
      <group ref={ref}>
        {showHey && (
          <troikaText
            ref={heyTextRef}
            position={[heyPositionX, heyPositionY, 0]}
            text={'hey'}
            font={font}
            fontSize={fontSize / 4}
            lineHeight={0.6}
            anchorX="center"
            anchorY="middle"
            glyphGeometryDetail={10}
          >
            {/* <meshStandardMaterial color={0xff0000} {...stencil} /> */}
            <meshBasicMaterial
              color={0xffffff}
              opacity={0}
              {...stencil}
              ref={heyMaterialRef}
            />
          </troikaText>
        )}
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
            opacity={0}
            {...stencil}
            ref={materialRef}
          />
        </troikaText>
      </group>
    );
  },
);

const MaskText = ({
  text = '',
  inner = 80,
  outter = 160,
  index = 0,
  start = 0,
  end = 0,
}) => {
  const contentRef = useRef<THREE.Group>(null);
  const { introComplete } = useContext(ScrollPageContext);

  const scrollTargetRef = useRef<HTMLElement>(
    document.getElementById('page-container'),
  );
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: [`start ${start}vh`, `end ${end}vh`],
  });

  useAnimationFrame(() => {
    if (!contentRef?.current || !introComplete) return;
    const wh = global?.window?.innerHeight || 100;
    gsap.to(contentRef.current.position, {
      z: (index + 1) * 800 * scrollYProgress.get(),
      y: scrollYProgress.get() * wh,
      duration: 0.1,
    });
  });

  useEffect(() => {
    if (!contentRef?.current) return;
    gsap.fromTo(
      contentRef.current.position,
      {
        z: 1500,
      },
      {
        z: 0,
        duration: 4,
        delay: 2 + index * 0.15,
        ease: Expo.easeInOut,
      },
    );
    gsap.fromTo(
      contentRef.current.rotation,
      {
        z: Math.PI,
      },
      {
        z: 0,
        duration: 2,
        delay: 2 + index * 0.15,
        ease: Expo.easeOut,
      },
    );
  }, []);

  return (
    <group>
      <Mask id={index + 1} position={[0, 0, 0]}>
        <ringGeometry args={[inner, outter, 64]} />
      </Mask>
      <MaskedContent
        text={text}
        ref={contentRef}
        index={index}
        start={0}
        end={100}
      />
    </group>
  );
};

export type MaskedTextProps = {
  text: string;
  start: number;
  end: number;
};

const MaskedText = ({ text, start, end }: MaskedTextProps) => {
  const { setIntroComplete } = useContext(ScrollPageContext);

  // const { invert, colorWrite, depthWrite, text } = useControls({
  //   invert: false,
  //   colorWrite: false,
  //   depthWrite: false,
  //   text: 'jeffyamada™',
  // });

  useEffect(() => {
    _.delay(() => {
      setIntroComplete(true);
    }, 7000);
  }, []);

  const renderRings = () => {
    const ww = global?.window?.innerWidth || 100;
    const wh = global?.window?.innerHeight || 100;
    const ringSize = (ww / 1200) * 160;
    const screenMax = Math.max(ww, wh);
    const totalRings = Math.ceil(screenMax / ringSize + 1);
    const masks: JSX.Element[] = [];

    _.times(totalRings, r => {
      const inner = r * ringSize;
      const outter = r * ringSize + ringSize;
      const key = `aa-mask-text-${r}`;
      masks.push(
        <MaskText
          text={text}
          inner={inner}
          outter={outter}
          index={r}
          key={key}
          start={start}
          end={end}
        />,
      );
    });

    return masks;
  };

  return <group>{renderRings()}</group>;
};

export default MaskedText;
