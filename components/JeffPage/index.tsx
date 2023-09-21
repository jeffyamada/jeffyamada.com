// import { useAnimationFrame, useInView, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import ThreeCanvas from '../ThreeCanvas';
import { Container } from './styles';
import MaskedText from '../three/MaskedText';
// import RingMaskImage from '../three/RingMaskImage';
// import ColumnMasks from '../three/ColumnMasks';
// import DiagonalText from '../three/DiagonalText';
// import SplitParagraph from '../SplitParagraph';
import classNames from 'classnames';
import gsap from 'gsap';
import _ from 'lodash';
// import ScrollIcon from '../ScrollIcon';
import { ScrollToPlugin } from 'lib/gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const ScrollPageContext = React.createContext({
  fontsLoaded: false,
  setFontsLoaded: (isLoaded: boolean) => {},
  introComplete: false,
  setIntroComplete: (isComplete: boolean) => {},
  scrollingActive: false,
  setScrollingActive: (isComplete: boolean) => {},
});

const JeffPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollingActive, setScrollingActive] = useState(false);

  const contextValue = {
    fontsLoaded,
    setFontsLoaded,
    introComplete,
    setIntroComplete,
    scrollingActive,
    setScrollingActive,
  };

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: [`start start`, `end end`],
  });

  useEffect(() => {
    gsap.to(global?.window, {
      scrollTo: {
        x: 0,
        y: 0,
      },
      duration: 1,
    });

    gsap.to(pageRef.current, {
      opacity: 1,
      delay: 1,
      duration: 0.5,
    });
  }, []);

  useEffect(() => {
    if (introComplete && !scrollingActive)
      _.delay(() => {
        setScrollingActive(true);
      }, 1000);
  }, [introComplete]);

  const maskedText = `jeff yamada`;

  const containerClasses = classNames({
    'intro-complete': introComplete,
    'scrolling-active': scrollingActive,
  });

  return (
    <ScrollPageContext.Provider value={contextValue}>
      <Container ref={pageRef} id="page-container" className={containerClasses}>
        <ThreeCanvas>
          <MaskedText text={maskedText} start={0} end={100} />
          {/* <RingMaskImage
            src="/files/images/apparent-office.jpeg"
            start={0}
            end={100}
          /> */}
          {/* <DiagonalText
            text="Thanks For Lunch"
            columns={10}
            startMaskIndex={0}
            start={0}
            end={100}
          /> */}
        </ThreeCanvas>
        {/* <SplitParagraph /> */}
        {/* <ScrollIcon /> */}
      </Container>
    </ScrollPageContext.Provider>
  );
};

export default JeffPage;
