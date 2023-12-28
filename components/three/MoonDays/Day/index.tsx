import { Circle, Ring } from '@react-three/drei';
import React from 'react';
import { Moon } from 'lunarphase-js';
import Point from '@/lib/Point';

export type DayProps = {
  date: Date;
  size: number;
  props?: object;
  position?: object;
};

type Ref = THREE.Group;

const Day = React.forwardRef<Ref, DayProps>(({ date, size, props }, ref) => {
  const phase = Moon.lunarPhase(date);
  const phasePercent = Moon.lunarAgePercent(date);

  const p = Point.remap(phasePercent, 0, 1, -1, 1);
  const half = Math.PI;
  const full = Math.PI * 2;

  const start = 0;
  const end = full - full * Math.abs(p);
  let opacity = Point.remap(end / full, 0, 1, 0.1, 1);

  const sideRotation = phasePercent > 0.5 ? 0 : Math.PI;
  const r = -end / 2 + sideRotation;

  const onCircleClick = () => {
    console.log(date.toLocaleString());
  };

  return (
    <group ref={ref} {...props}>
      <Circle args={[22, 38]} onPointerOver={onCircleClick}>
        <meshBasicMaterial color={0xff0000} opacity={0} transparent />
      </Circle>
      <Ring args={[size - 1, size, 20, 1, start, end]} rotation={[0, 0, r]}>
        <meshBasicMaterial color={0xffffff} opacity={opacity} transparent />
      </Ring>
    </group>
  );
});

export default Day;
