import { useFrame, useThree } from '@react-three/fiber';
import _ from 'lodash';
import { Engine, Runner, Bodies, Composite, Body } from 'matter-js';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useScreenSize from '@/hooks/useScreenSize';

import Bubble from './Bubble';
import { Color } from 'three';

export type Circle = {
  matter: Body;
  radius: number;
  color: Color;
  three?: THREE.Group;
};

type matterRefType = {
  engine: Engine;
  runner: Runner;
  circles: Circle[];
};

type Walls = {
  left: Body;
  right: Body;
  top: Body;
  bottom: Body;
};

export default function BubbleChart() {
  const { screenWidth: ww, screenHeight: wh } = useScreenSize();
  const { mouse, size } = useThree();
  // const { camera, mouse } = useThree();
  const [ready, setIsReady] = useState(false);

  const colors = [
    new Color(0x68667a).convertLinearToSRGB(),
    new Color(0xe84855).convertLinearToSRGB(),
    new Color(0xf9dc5c).convertLinearToSRGB(),
    new Color(0x3185fc).convertLinearToSRGB(),
    new Color(0xefbcd5).convertLinearToSRGB(),
  ];

  const rRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const wallsRef = useRef<Body[]>([]);

  const matterRef = useRef<matterRefType>({
    engine: Engine.create(),
    runner: Runner.create(),
    circles: [],
  });

  // make walls
  useEffect(() => {
    const { engine } = matterRef.current;
    Composite.remove(engine.world, [...wallsRef.current]);
    const pad = 0;
    const options = { isStatic: true, restitution: 0 };
    const left = Bodies.rectangle(-ww / 2 + pad, 0, 100, wh * 2, options);
    const right = Bodies.rectangle(ww / 2 - pad, 0, 100, wh * 2, options);
    const top = Bodies.rectangle(0, wh / 2 - pad, ww * 2, 100, options);
    const bottom = Bodies.rectangle(0, -wh / 2 + pad, ww * 2, 100, options);
    wallsRef.current = [left, right, top, bottom];
    Composite.add(engine.world, [...wallsRef.current]);
  }, [ww, wh]);

  // create engine
  useEffect(() => {
    if (matterRef.current.circles.length) return;
    const { engine } = matterRef.current;
    const bodies: Body[] = [];
    _.times(6, i => {
      const options = { restitution: 0, slop: 0.99 };
      const radius = _.random(40, 140);
      const circle = Bodies.circle(0, 0, radius);
      bodies.push(circle);
      // const composite = Composite.create();
      matterRef.current.circles.push({
        radius,
        matter: circle,
        color:
          colors[i % colors.length] ||
          new Color(0xff0000).convertLinearToSRGB(),
      });
    });

    Composite.add(engine.world, [...bodies]);

    setIsReady(true);
  }, []);

  useFrame((state, delta) => {
    // rRef.current = (rRef.current + 0.01) % 360;
    gsap.to(targetRef.current, {
      x: (mouse.x * size.width) / 2,
      y: (mouse.y * size.height) / 2,
    });

    Engine.update(matterRef.current.engine, delta);
    _.each(matterRef.current.circles, circle => {
      if (!circle?.three || !circle.matter.circleRadius) return;
      Body.applyForce(circle.matter, circle.matter.position, {
        x: (targetRef.current.x - circle.matter.position.x) * 10,
        y: (targetRef.current.y - circle.matter.position.y) * 10,
      });
    });
  });

  const Circles = () => (
    <group>
      {_.map(matterRef.current.circles, (circle, i) => {
        const setRef = (ref: THREE.Group) => (circle.three = ref);
        return <Bubble key={`sphere-${i}`} circle={circle} ref={setRef} />;
      })}
    </group>
  );

  return (
    <group rotation={[0, 0, 0]}>
      <ambientLight intensity={2} />
      <directionalLight position={[-3.3, -10.0, 4.4]} intensity={1} />
      <Circles />
    </group>
  );
}
