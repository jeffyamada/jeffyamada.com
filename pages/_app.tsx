import '@/styles/globals.css';
import '../styles/fonts.css';
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import FontFaceObserver from 'fontfaceobserver';
import fonts from 'styles/fonts';
import classNames from 'classnames';

export const AppContext = React.createContext({
  fontsLoaded: false,
  setFontsLoaded: (on: boolean) => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loading: any[] = [];
    Object.keys(fonts).forEach(key => {
      loading.push(
        new FontFaceObserver((fonts as any)[key], {}).load(null, 3000),
      );
    });
    Promise.all(loading).then(() => {
      setFontsLoaded(true);
    });
  }, []);

  const appContextValue = {
    fontsLoaded,
    setFontsLoaded,
  };

  const classes = classNames({ 'fonts-loaded': fontsLoaded });

  return (
    <div className={classes}>
      <AppContext.Provider value={appContextValue}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </div>
  );
}
