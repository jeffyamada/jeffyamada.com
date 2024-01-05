// import pathseg from 'pathseg';
// pathseg;
import decomp from 'poly-decomp';
decomp;

import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Common,
  Vertices,
  Svg,
  Vector,
} from 'matter-js';
import { useEffect, useRef } from 'react';
import { Wrapper } from './styles';

const Letters = () => {
  Common.setDecomp(decomp);

  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Engine.create({ gravity: { scale: 0.001 } }));
  const renderRef = useRef<Render>();

  const select = (root: Document, selector: string) => {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
  };

  const loadSvg = function (url: string) {
    return fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (raw) {
        return new window.DOMParser().parseFromString(raw, 'image/svg+xml');
      });
  };

  const addLetters = () => {
    [
      '/files/shapes/Vector.svg', // J
      '/files/shapes/Vector-1.svg', // e
      '/files/shapes/f.svg', // f
      '/files/shapes/f.svg', // f
      '/files/shapes/Vector-4.svg', // Y
      '/files/shapes/a.svg', // a
      '/files/shapes/m.svg', // m
      '/files/shapes/a.svg', // a
      '/files/shapes/d.svg', // d
      '/files/shapes/a.svg', // a
    ].forEach((path, i) => {
      loadSvg(path).then(root => {
        var color = Common.choose([
          '#f19648',
          '#f5d259',
          '#f55a3c',
          '#063e7b',
          '#ececd1',
        ]);

        const point = Vector.create(0, 0);
        var vertexSets = select(root, 'path').map(path => {
          return Vertices.scale(Svg.pathToVertices(path, 5), 8, 8, point);
        });

        // const vertexSets = [Svg.pathToVertices(path, 10)];

        const letterBodies = Bodies.fromVertices(
          100 + i * 100,
          -window.innerHeight - i * 200,
          vertexSets,
          {
            render: {
              fillStyle: color,
              strokeStyle: color,
              lineWidth: 1,
            },
          },
          true,
        );

        console.log('letterBodies:', letterBodies);

        Composite.add(engineRef.current?.world, letterBodies);
      });
    });
  };

  useEffect(() => {
    if (!sceneRef.current) return;

    // create a renderer
    renderRef.current = Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width: global?.window?.innerWidth,
        height: global?.window?.innerHeight,
      },
    });

    // create two boxes and a ground
    // var boxA = Bodies.rectangle(400, 200, 80, 80);
    // var boxB = Bodies.rectangle(450, 50, 80, 80);
    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight,
      window.innerWidth,
      60,
      {
        isStatic: true,
      },
    );

    const leftWall = Bodies.rectangle(
      0,
      window.innerHeight / 2,
      60,
      window.innerHeight,
      {
        isStatic: true,
      },
    );

    const rightWall = Bodies.rectangle(
      window.innerWidth,
      window.innerHeight / 2,
      60,
      window.innerHeight,
      {
        isStatic: true,
      },
    );

    // add all of the bodies to the world
    // Composite.add(engineRef.current.world, [boxA, boxB, ground]);
    Composite.add(engineRef.current.world, [ground, leftWall, rightWall]);

    addLetters();

    // run the renderer
    Render.run(renderRef.current);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engineRef.current);

    return () => {
      // destroy Matter
      if (!renderRef.current) return;
      Render.stop(renderRef.current);
      Composite.clear(engineRef.current.world, false);
      Engine.clear(engineRef.current);
      renderRef.current.canvas.remove();
      renderRef.current.textures = {};
    };
  }, []);

  return <Wrapper ref={sceneRef} />;
};

export default Letters;
