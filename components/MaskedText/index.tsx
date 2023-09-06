import React, { useEffect, useRef, useState } from 'react';
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

import { extend, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import _ from 'lodash';
import gsap, { Expo } from 'gsap';

extend({ TroikaText });

export type MaskedContentProps = {
  text: string;
  index: number;
};

type Ref = THREE.Group;

const font = '/files/fonts/sohne-halbfett.ttf';
const MaskedContent = React.forwardRef<Ref, MaskedContentProps>(
  ({ text = '', index = 1 }, ref) => {
    /* The useMask hook has to refer to the mask id defined below, the content
     * will then be stamped out.
     */
    const stencil = useMask(index + 1);
    const textRef = useRef<THREE.Object3D>();
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const [introComplete, setIntroComplete] = useState(false);

    const mouseRef = useRef({ x: 0, y: 0 });

    const ww = global?.window?.innerWidth || 100;
    const fontSize = Math.round((ww / 1200) * 180);

    const onMouseMove = (event: MouseEvent) => {
      const ww = global?.window?.innerWidth || 100;
      const wh = global?.window?.innerHeight || 100;
      gsap.to(mouseRef.current, {
        x: event.clientX - ww / 2,
        y: event.clientY - wh / 2,
        duration: 0.2,
      });
    };

    useEffect(() => {
      gsap.to(materialRef.current, {
        opacity: 1,
        delay: 2,
        duration: 2,
      });

      _.delay(() => {
        setIntroComplete(true);
        console.log('INTRO COMPLETE');
      }, 5000);

      global?.window.addEventListener('mousemove', onMouseMove);

      return () => {
        global?.window.removeEventListener('mousemove', onMouseMove);
      };
    }, []);

    useFrame(() => {
      if (!introComplete) return;
      if (!textRef?.current?.position) return;
      gsap.to(textRef?.current?.position, {
        x: mouseRef.current.x * -0.3,
        y: mouseRef.current.y * 0.3,
        duration: 0.2 * index,
      });
    });

    return (
      <group ref={ref}>
        <troikaText
          ref={textRef}
          text={text}
          font={font}
          fontSize={fontSize}
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
  invert = false,
  colorWrite = false,
  depthWrite = false,
}) => {
  const contentRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!contentRef?.current) return;
    gsap.fromTo(
      contentRef.current.position,
      {
        x: 2500,
      },
      {
        x: 0,
        duration: 1.25,
        // delay: index * 0.05,
        delay: 0.5,
        ease: Expo.easeOut,
      },
    );
    gsap.fromTo(
      contentRef.current.position,
      {
        z: 1500,
      },
      {
        z: 0,
        duration: 1.25,
        delay: 2 + index * 0.05,
        ease: Expo.easeInOut,
      },
    );
    gsap.to(contentRef.current.rotation, {
      z: Math.PI * 2,
      duration: 1.25,
      delay: 2 + index * 0.05,
      ease: Expo.easeOut,
    });
  }, []);

  // useFrame(() => {
  // gsap.to(maskRef?.current?.position, {
  //   x: mouseRef.current.x * -0.3,
  //   y: mouseRef.current.y * 0.3,
  //   duration: 0.2 * index,
  // });
  // });

  return (
    <group>
      <Mask
        id={index + 1}
        colorWrite={colorWrite}
        depthWrite={depthWrite}
        position={[0, 0, 0]}
        // scale={200}
        // ref={maskRef}
      >
        <ringGeometry args={[inner, outter, 64]} />
      </Mask>
      <MaskedContent text={text} ref={contentRef} index={index} />
    </group>
  );
};

const MaskedText = () => {
  // const { invert, colorWrite, depthWrite, text } = useControls({
  //   invert: false,
  //   colorWrite: false,
  //   depthWrite: false,
  //   text: 'jeffyamada™',
  // });

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
        <MaskText
          text={'jeffyamada™'}
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

export default MaskedText;
