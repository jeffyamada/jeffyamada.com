import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    screenWidth: global?.window?.innerWidth || 100,
    screenHeight: global?.window?.innerHeight || 100,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        screenWidth: global?.window?.innerWidth || 100,
        screenHeight: global?.window?.innerHeight || 100,
      });
    };

    global?.window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      global?.window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
