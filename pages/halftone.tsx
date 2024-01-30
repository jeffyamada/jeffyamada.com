import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { createClient } from 'next-sanity';
import Project from '@/types/schemas/project';
import Halftone from '@/components/three/Halftone';
import useScreenSize from '@/hooks/useScreenSize';
import ThreeCanvas from '@/components/ThreeCanvas';
import { Scroll, ScrollControls, Text } from '@react-three/drei';
import { useControls, folder } from 'leva';
import _ from 'lodash';
import { Color, ColorRepresentation } from 'three';

const TextBox = styled.div`
  position: fixed;
  bottom: 20vh;
  left: calc(50vw - 40px);
  display: inline-block;
  background: black;
  margin-top: 20vh;
  transform: translateX(-100%);

  overflow: hidden;
  height: 2px;
  opacity: 0;

  .fonts-loaded & {
    opacity: 1;
  }
`;

const TextContent = styled.div`
  padding: 20px 28px 20px 12px;
`;

const Icons = styled.div`
  padding-left: 8px;
`;

export type HalftonePageProps = {
  projects: Project[];
};

const fonts = {
  'Aonic Air': '/files/fonts/Aeonik-Air.ttf',
  'Aeonik Bold': '/files/fonts/Aeonik-Bold.ttf',
  'Aeonik Black': '/files/fonts/Aeonik-Black.ttf',
  'DMSans Bold': '/files/fonts/DMSans-Bold.woff',
  'Soehne Extrafett': '/files/fonts/soehne-extrafett.ttf',
};

const HalftonePage = ({ projects }: HalftonePageProps) => {
  // const { fontsLoaded } = useContext(AppContext);
  const { screenWidth: ww, screenHeight: wh } = useScreenSize();
  const [doRender, setRender] = useState(false);
  const textRef = useRef<Text>(null);

  const { font, fontSize, fillColor, outlineColor } = useControls({
    Text: folder({
      font: {
        value: 'Aeonik Bold',
        options: _.keys(fonts),
      },
      fontSize: {
        value: 180,
        min: 10,
        max: 600,
        step: 5,
      },
      fillColor: '#ffffff',
      outlineColor: '#ffffff',
    }),
  });

  useEffect(() => {
    setRender(true);
  }, []);

  const perspective = 2000;
  const fov = (180 * (2 * Math.atan(wh / 2 / perspective))) / Math.PI;

  if (!doRender) return null;

  return (
    <ThreeCanvas>
      {/* <color attach="background" args={[0xffffff]} /> */}
      <ScrollControls pages={3} damping={0.1}>
        <Halftone>
          <Scroll>
            <Text
              ref={textRef}
              font={_.get(fonts, font)}
              fontSize={fontSize}
              color={new Color(fillColor as ColorRepresentation)}
              anchorX="center"
              anchorY="middle"
              outlineWidth={8}
              outlineBlur={40}
              outlineColor={new Color(outlineColor as ColorRepresentation)}
            >
              POSSIBLE
            </Text>
          </Scroll>
        </Halftone>
      </ScrollControls>
    </ThreeCanvas>
    // <Canvas
    //   camera={{
    //     fov,
    //     aspect: ww / wh,
    //     near: 1,
    //     far: perspective * 10,
    //     position: [0, 0, perspective],
    //   }}
    //   style={{ width: ww, height: wh, background: 'white' }}
    // >
    //   <Suspense fallback={null}>
    //     <Halftone />
    //   </Suspense>
    // </Canvas>
  );
};

const client = createClient({
  projectId: '9i6kbmf2',
  dataset: 'production',
  apiVersion: '2023-09-08',
  useCdn: false,
});

export async function getStaticProps() {
  // const projects = await client.fetch(`*[_type == "project"]`);

  return {
    props: {
      projects: [],
    },
  };
}

export default HalftonePage;
