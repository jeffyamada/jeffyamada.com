import _ from 'lodash';
import { Container, Paragraph, Word, Span } from './styles';
import { useContext, useRef } from 'react';
import gsap from 'gsap';
import { useAnimationFrame, useScroll } from 'framer-motion';
import Point from '@/lib/Point';
import { ScrollPageContext } from '../ScrollingPage';

const SplitParagraph = () => {
  const wordsRef = useRef<HTMLDivElement[]>([]);
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const progressRef = useRef(0);
  const { scrollingActive } = useContext(ScrollPageContext);

  const scrollTargetRef = useRef<HTMLElement>(
    global?.document ? global?.document.getElementById('page-container') : null,
  );
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
  });

  useAnimationFrame(() => {
    const progress = Point.remap(scrollYProgress.get(), 0.35, 0.8, 0, 1);

    _.each(wordsRef.current, (word, i) => {
      const wordProgress = i / wordsRef.current.length;
      const showWord = wordProgress < progress;
      const x = showWord ? 0 : 50;
      const y = showWord ? 0 : 50;
      const opacity = showWord && scrollingActive ? 1 : 0;

      const span = spansRef.current[i];

      gsap.to(span, {
        y,
        opacity,
        duration: 0.45,
      });
    });
  });

  const renderWords = () => {
    const text = `Thank you. I've really enjoyed meeting you all and getting a glimpse of what the next chapter of my career could look like working with the team at Apparent. The opportunity work with you has me so excited I've had to build this page to occupy myself. I know some people are built to approach their job as ‘just a job’, but for better or worse I was born with one setting: all in. That said, I'd love to make this happen - so I can go all in doing what I do, with people like you. Also, I hope you have copywriters, because I'm not a copywriter.`;

    return _.map(text.split(' '), (word, index) => {
      return (
        <Word
          key={`word-${index}`}
          ref={element => {
            if (element) wordsRef.current[index] = element;
          }}
        >
          <Span
            ref={element => {
              if (element) spansRef.current[index] = element;
            }}
          >
            {word}
            {'\u00A0'}
          </Span>
        </Word>
      );
    });
  };

  return (
    <Container>
      <Paragraph>{renderWords()}</Paragraph>
    </Container>
  );
};

export default SplitParagraph;
