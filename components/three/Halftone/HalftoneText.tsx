import { Text as TroikaText, useScroll } from '@react-three/drei';
import { Text } from 'troika-three-text';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useControls, folder } from 'leva';
import { Color, ColorRepresentation, Group } from 'three';
import _ from 'lodash';
import useScreenSize from '@/hooks/useScreenSize';
import Point from '@/lib/Point';

const fonts = {
  'Aonic Air': '/files/fonts/Aeonik-Air.ttf',
  'Aeonik Bold': '/files/fonts/Aeonik-Bold.ttf',
  'Aeonik Black': '/files/fonts/Aeonik-Black.ttf',
  'DMSans Bold': '/files/fonts/DMSans-Bold.woff',
  'Soehne Extrafett': '/files/fonts/soehne-extrafett.ttf',
};

export default function HalftoneText() {
  const { screenWidth: ww, screenHeight: wh } = useScreenSize();
  const scroll = useScroll();
  const groupRef = useRef<Group>(null);
  const textRef = useRef<Text>(null);

  const { font, fontSize, fillColor, outlineColor } = useControls({
    Text: folder({
      font: {
        value: 'Aeonik Bold',
        options: _.keys(fonts),
      },
      fontSize: {
        value: 129,
        min: 10,
        max: 1200,
        step: 5,
      },
      fillColor: '#ffffff',
      outlineColor: '#ffffff',
    }),
  });

  useFrame(() => {
    if (!groupRef?.current) return;
    if (!textRef?.current) return;

    const progress = scroll.range(0, 1 / 3);
    // const { position } = groupRef.current;

    // position.y = Point.remap(progress, 0, 1, -wh * 0.25, wh * 0.25);

    // if (progress < 0.15) position.x = Point.remap(progress, 0, 0.1, ww, 0);
    // if (progress > 0.85) position.x = Point.remap(progress, 0.9, 1, 0, -ww);

    // textRef.current.fontSize = 200;
    // textRef.current.
    _.set(
      textRef.current,
      'fontSize',
      Point.remap(progress, 0, 1, 30, fontSize),
    );

    _.set(textRef.current, 'fillOpacity', Point.remap(progress, 0, 0.5, 0, 1));
    _.set(
      textRef.current,
      'outlinelOpacity',
      Point.remap(progress, 0, 0.5, 0, 1),
    );

    // _.set(textRef.current, 'fillOpacity', Point.remap(progress, 0, 0.2, 0, 1));

    // textRef.current.fontSize = Point.remap(
    //   progress,
    //   0,
    //   1,
    //   fontSize * 0.25,
    //   fontSize,
    // );
  });

  return (
    <group ref={groupRef}>
      <TroikaText
        ref={textRef}
        font={_.get(fonts, font)}
        // fontSize={Point.remap(progress, 0, 1, fontSize * 0.25, fontSize)}
        color={new Color(fillColor as ColorRepresentation)}
        anchorX="center"
        anchorY="middle"
        outlineWidth={8}
        outlineBlur={40}
        outlineColor={new Color(outlineColor as ColorRepresentation)}
        // position={[0, -wh / 4, 0]}
        fillOpacity={0}
      >
        POSSIBLE
      </TroikaText>
    </group>
  );
}
