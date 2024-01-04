import {
  OrthographicCamera,
  RenderTexture,
  Sphere,
  Text,
} from '@react-three/drei';
import { Body } from 'matter-js';
import { useFrame } from '@react-three/fiber';
import _ from 'lodash';
import React, { useCallback, useRef } from 'react';
import { Mesh } from 'three';
import { Circle } from '..';
import gsap, { Sine } from 'gsap';
import Point from '@/lib/Point';

const font = '/files/fonts/soehne-extrafett.ttf';

interface Props {
  circle: Circle;
}

export type Ref = THREE.Group;

const Bubble = React.forwardRef<Ref, Props>(({ circle }, ref) => {
  const sphereRef = useRef<Mesh>(null!);
  const allRef = useRef<THREE.Group>(null!);
  const xRef = useRef<THREE.Group>(null!);
  const yRef = useRef<THREE.Group>(null!);
  const textRef = useRef();

  const { radius } = circle;
  const currentRadius = useRef<number>(radius);
  const isOverProgress = useRef<number>(0);

  useFrame((state, delta, xrFrame) => {
    if (!circle.matter?.circleRadius) return;
    const paddedRadius = Math.max(circle.matter.circleRadius - 10, 10);
    sphereRef.current.scale.set(paddedRadius, paddedRadius, paddedRadius);

    allRef.current.position.x = circle.matter.position.x;
    allRef.current.position.y = circle.matter.position.y;
    // allRef.current.position.z = paddedRadius;

    const circ = 2 * Math.PI * paddedRadius;
    const yr = Point.mix(
      isOverProgress.current,
      (circle.matter.position.x / circ) * Math.PI * 2,
      yRef.current.rotation.y + 0.02,
    );
    const xr = Point.mix(
      isOverProgress.current,
      -(circle.matter.position.y / circ) * Math.PI * 2,
      0,
    );

    yRef.current.rotation.y = yr;
    xRef.current.rotation.x = xr;
  });

  const onPointerOver = useCallback(() => {
    gsap.to(isOverProgress, {
      current: 1,
      duratin: 2,
      onUpdate: () => {
        if (!circle.matter?.circleRadius) return;
        currentRadius.current = Point.remap(
          Sine.easeInOut(isOverProgress.current),
          0,
          1,
          radius,
          radius * 1.5,
        );
        const scale = currentRadius.current / circle.matter.circleRadius;
        Body.scale(circle.matter, scale, scale);
      },
    });
    circle.matter.isStatic = true;
  }, [circle]);

  const onPointerOut = useCallback(() => {
    gsap.to(isOverProgress, {
      current: 0,
      duratin: 1,
      onUpdate: () => {
        if (!circle.matter?.circleRadius) return;
        currentRadius.current = Point.remap(
          Sine.easeInOut(isOverProgress.current),
          0,
          1,
          radius,
          radius * 1.5,
        );
        const scale = currentRadius.current / circle.matter.circleRadius;
        Body.scale(circle.matter, scale, scale);
      },
    });
    circle.matter.isStatic = false;
  }, [circle]);

  return (
    <group ref={ref} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      <group ref={allRef}>
        <group ref={xRef}>
          <group ref={yRef}>
            <Sphere
              args={[1, 64, 64]}
              rotation={[0, -Math.PI / 2, 0]}
              ref={sphereRef}
            >
              <meshToonMaterial color={circle.color}>
                <RenderTexture attach="map">
                  <OrthographicCamera makeDefault position={[0, 0, 0.1]} />
                  <color attach="background" args={[0x999999]} />
                  <ambientLight intensity={2.5} />
                  <directionalLight
                    position={[-3.3, -10.0, 4.4]}
                    intensity={2}
                  />
                  <Text
                    ref={textRef}
                    font={font}
                    fontSize={40}
                    color={0x000000}
                    anchorX="center"
                    anchorY="middle"
                    scale={[2, 2.4, 2]}
                  >
                    BITCOIN $34,000 - 45%
                  </Text>
                </RenderTexture>
              </meshToonMaterial>
            </Sphere>
          </group>
        </group>
      </group>
    </group>
  );
});

export default Bubble;
