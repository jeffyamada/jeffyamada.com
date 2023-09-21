import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import _ from 'lodash';
import { ScrollPageContext } from '../ScrollingPage';
import { useAnimationFrame, useScroll } from 'framer-motion';
import useScreenSize from '@/hooks/useScreenSize';

import DrawSVGPlugin from '@/lib/gsap/DrawSVGPlugin';
gsap.registerPlugin(DrawSVGPlugin);

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: calc(50vw + 6px);
  top: 80vh;
  opacity: 0;

  .scrolling-active & {
    opacity: 1;
  }
`;

const Svg = styled.svg`
  transform: translate(-65px, -189px);
`;

function ScrollIcon() {
  const [show, setShow] = useState(false);

  const { scrollingActive } = useContext(ScrollPageContext);

  const { screenHeight } = useScreenSize();

  // const circlePathRef = useRef(null);
  // const glowRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(null);
  const wheelRef = useRef(null);
  // const topLineRef = useRef(null);
  // const bottomLineRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timer>();

  const offsetRef = useRef(screenHeight * 3);

  const scrollTargetRef = useRef<HTMLElement>(
    global?.document ? global?.document.getElementById('page-container') : null,
  );
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  useAnimationFrame(() => {
    if (!containerRef.current) return;
    gsap.set(containerRef.current, {
      y: scrollY.get(),
    });
  });

  useEffect(() => {
    animate();
    return () => {
      clearInterval(intervalRef.current);
      // gsap.killTweensOf(topLineRef.current);
      // gsap.killTweensOf(bottomLineRef.current);
      // gsap.killTweensOf(circlePathRef.current);
      gsap.killTweensOf(mouseRef.current);
    };
  }, []);

  useEffect(() => {
    gsap.to(offsetRef, {
      current: scrollingActive ? 0 : 1,
      duration: 0.6,
    });

    if (scrollingActive && !show) setShow(true);
  }, [scrollingActive]);

  useEffect(() => {
    animate();
  }, [show]);

  const animate = useCallback(() => {
    // const startDrawSVG = !show ? '0 100%' : '0 0';
    // const endDrawSVG = show ? '0 100%' : '0 0';
    // gsap.set(circlePathRef.current, { drawSVG: startDrawSVG });
    // gsap.to(circlePathRef.current, { drawSVG: endDrawSVG, duration: 1 });

    // gsap.fromTo(
    //   glowRef.current,
    //   { opacity: show ? 0 : 1 },
    //   { opacity: show ? 1 : 0, duration: 1 },
    // );

    resetWheel();
    // animateLines();
    animateMouse();
  }, [show]);

  // const animateLines = () => {
  //   const startOpacity = !show ? 0.3 : 1;
  //   const endOpacity = show ? 0.3 : 1;

  //   const topLineSvgStart = !show ? '0 100%' : '100% 100%';
  //   const topLineSvgEnd = show ? '0 100%' : '100% 100%';
  //   gsap.set(topLineRef.current, {
  //     drawSVG: topLineSvgStart,
  //     opacity: startOpacity,
  //   });
  //   gsap.to(topLineRef.current, {
  //     drawSVG: topLineSvgEnd,
  //     opacity: endOpacity,
  //     duration: 1,
  //   });

  //   const bottomLineSvgStart = !show ? '0 100%' : '0 0';
  //   const bottomLineSvgEnd = show ? '0 100%' : '0 0';
  //   gsap.set(bottomLineRef.current, {
  //     drawSVG: bottomLineSvgStart,
  //     opacity: startOpacity,
  //   });
  //   gsap.to(bottomLineRef.current, {
  //     drawSVG: bottomLineSvgEnd,
  //     opacity: endOpacity,
  //     duration: 1,
  //   });
  // };

  const animateMouse = () => {
    const mouseSvgStart = !show ? '0 100%' : '100% 100%';
    const mouseSvgEnd = show ? '0 100%' : '100% 100%';
    gsap.killTweensOf(wheelRef.current);
    gsap.fromTo(
      mouseRef.current,
      {
        drawSVG: mouseSvgStart,
      },
      {
        drawSVG: mouseSvgEnd,
        duration: 1,
      },
    );
    gsap.fromTo(
      wheelRef.current,
      {
        drawSVG: mouseSvgStart,
      },
      {
        drawSVG: mouseSvgEnd,
        duration: 1,
      },
    );

    intervalRef.current = setInterval(bounceWheel, 1000);
  };

  const bounceWheel = () => {
    gsap.set(wheelRef.current, {
      y: 0,
    });
    gsap.to(wheelRef.current, {
      opacity: 1,
      duration: 0.1,
    });
    gsap.to(wheelRef.current, {
      y: 5,
      duration: 0.6,
    });
    gsap.to(wheelRef.current, {
      opacity: 0,
      duration: 0.2,
      delay: 0.5,
    });
    gsap.set(wheelRef.current, {
      y: 0,
      delay: 0.6,
    });
    gsap.to(wheelRef.current, {
      opacity: 1,
      duration: 0.1,
      delay: 0.8,
    });
  };

  const resetWheel = () => {
    clearInterval(intervalRef.current);
    gsap.killTweensOf(wheelRef.current);
    gsap.set(wheelRef.current, {
      opacity: 1,
      y: 0,
    });
  };

  return (
    <Container ref={containerRef}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="130"
        height="379"
        fill="none"
        viewBox="0 0 130 379"
      >
        {/* <path
          ref={bottomLineRef}
          stroke="#FFFFFF"
          d="M59.5 291L59.5 379"
          opacity="0.3"
        ></path> */}
        {/* <path
          ref={topLineRef}
          stroke="#FFFFFF"
          d="M59.5 0L59.5 88"
          opacity="0.3"
        ></path> */}
        <rect
          ref={mouseRef}
          width="16.45"
          height="28.45"
          x="50.775"
          y="175.775"
          stroke="#FFFFFF"
          strokeWidth="1.55"
          rx="8.225"
        ></rect>
        <rect
          ref={wheelRef}
          width="1"
          height="5"
          x="58.5"
          y="181.5"
          stroke="#FFFFFF"
          rx="0.5"
        ></rect>
        {/* <path
          stroke="#FFFFFF"
          strokeWidth="0.484"
          d="M53.366 250.814l.026.006h11.215l.026-.006 10.764-2.395.021-.005.02-.008 12.358-5.191.031-.012.026-.021 15.548-12.377.027-.022.021-.029 6.378-9.183.013-.02.01-.021 5.581-12.777.008-.017.005-.019 2.79-10.78.008-.029v-13.237l-.008-.03-2.79-10.78-.006-.02-.008-.019-5.581-12.377-.008-.018-.011-.016-6.379-9.582-.021-.032-.029-.023-15.946-12.776-.028-.023-.033-.013-11.96-4.791-.018-.007-.019-.005-10.764-2.395-.025-.006H53.392l-.026.006-10.763 2.395-.02.005-.018.007-11.96 4.791-.032.013-.029.023L14.6 151.774l-.03.023-.02.032-6.379 9.582-.01.016-.009.018-5.581 12.377-.009.019-.005.02-2.79 10.78-.008.03v13.235l.007.029 2.79 11.179.006.022.009.019 5.581 12.377.01.02.012.019 6.378 9.183.021.03.03.023 15.945 12.377.024.018.028.012 11.96 5.191.021.009.023.005 10.763 2.395z"
          opacity="0.11"
        ></path> */}
        {/* <path
          ref={circlePathRef}
          stroke="#FFFFFF"
          strokeWidth="0.484"
          d="M54.54 240.403l.026.005H63.812l.026-.005 8.864-1.975.02-.005.02-.008 10.178-4.279.03-.013.027-.021 12.804-10.203.027-.022.02-.03 5.253-7.57.014-.019.009-.022 4.597-10.533.007-.017.005-.019 2.298-8.887.008-.029V185.827l-.008-.029-2.298-8.887-.005-.02-.009-.019-4.596-10.203-.008-.018-.011-.017-5.253-7.899-.02-.032-.03-.023-13.132-10.532-.028-.023-.033-.013-9.849-3.95-.018-.007-.02-.005-8.863-1.974-.026-.006H54.566l-.026.006-8.864 1.974-.02.005-.018.007-9.849 3.95-.033.013-.028.023-13.132 10.532-.03.023-.02.032-5.253 7.899-.01.017-.009.018-4.596 10.203-.009.019-.005.02-2.298 8.887-.007.029v10.923l.007.028 2.298 9.216.005.021.009.02 4.596 10.204.01.02.012.018 5.253 7.57.02.031.03.022 13.132 10.204.024.019.028.012 9.85 4.279.02.009.023.005 8.864 1.975z"
        ></path> */}
        {/* <g filter="url(#filter0_d_46_9320)">
          <path
            ref={glowRef}
            fill="#000"
            fillOpacity="0.01"
            d="M54.593 240.166h9.192l8.864-1.974 10.177-4.279 12.804-10.204 5.253-7.57 4.596-10.532 2.298-8.887v-10.862l-2.298-8.886-4.596-10.204-5.253-7.899-13.132-10.533-9.849-3.949-8.864-1.975h-9.192l-8.865 1.975-9.849 3.949-13.131 10.533-5.253 7.899-4.596 10.204-2.298 8.886v10.862l2.298 9.216 4.596 10.203 5.253 7.57 13.131 10.204 9.85 4.279 8.864 1.974z"
            shapeRendering="crispEdges"
          ></path>
        </g> */}
        <defs>
          <filter
            id="filter0_d_46_9320"
            width="139.768"
            height="140.346"
            x="-10.695"
            y="121.116"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset></feOffset>
            <feGaussianBlur stdDeviation="10.648"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix values="0 0 0 0 0.729412 0 0 0 0 0.619608 0 0 0 0 0.368627 0 0 0 0.3 0"></feColorMatrix>
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_46_9320"
            ></feBlend>
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_46_9320"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </Svg>
    </Container>
  );
}

export default ScrollIcon;
