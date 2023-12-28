import React, {
  useCallback,
  // useCallback,
  // useContext,
  useEffect,
  useRef,
  useState,
  // useState,
} from 'react';
import * as THREE from 'three';
// import { Text as TroikaText, preloadFont } from 'troika-three-text';
import InertiaPlugin from '@/lib/gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

import { useScroll } from 'framer-motion';

// import { extend, useFrame, useThree } from '@react-three/fiber';
// import { useFrame } from '@react-three/fiber';
// import { useControls } from 'leva';
import useScreenSize from '@/hooks/useScreenSize';
import _ from 'lodash';
import gsap from 'gsap';
import Day from './Day';
import { setRevalidateHeaders } from 'next/dist/server/send-payload';

type Ref = THREE.Group;

const MoonDays = React.forwardRef<Ref>(({}, ref) => {
  const { screenWidth } = useScreenSize();
  const [dates, setDates] = useState<Date[]>([]);

  const [grid, setGrid] = useState({
    colWidth: 40,
  });

  const daysInYear = (year: number) => {
    return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
  };

  const createDays = () => {
    const totalDays = daysInYear(2023);
    const start = new Date(2023, 0, 1);
    return _.map(_.range(0, totalDays), i => {
      const d = new Date(start.valueOf());
      d.setDate(d.getDate() + i);
      return new Date(d.valueOf());
    });
  };

  useEffect(() => {
    setDates(createDays());
  }, [screenWidth]);

  const Days = useCallback(() => {
    return (
      <>
        {_.map(dates, (date, i) => {
          const key = `date-${i}`;
          const col = date.getDate() - 1;
          const row = date.getMonth();

          const x = col * grid.colWidth;
          const y = -row * grid.colWidth;
          return (
            <group position={[x, y, 0]} key={key}>
              <Day date={date} size={grid.colWidth * 0.35} />
            </group>
          );
        })}
      </>
    );
  }, [dates, grid.colWidth]);

  const getLocale = () => {
    return navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  };

  const getMonthString = (date: Date, length: 'long' | 'short' = 'long') => {
    const locale = getLocale();
    console.log('//// locale:', locale);
    return new Intl.DateTimeFormat(locale, { month: length }).format(date);
  };

  getMonthString(new Date());

  const groupX = -(30 * grid.colWidth) / 2;
  const groupY = (11 * grid.colWidth) / 2;

  return (
    <group position={[groupX, groupY, 0]} ref={ref}>
      {dates.length && <Days />}
    </group>
  );
});

export default MoonDays;
