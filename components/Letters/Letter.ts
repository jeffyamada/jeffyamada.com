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
  Body,
} from 'matter-js';

class Letter {
  body: Body;

  constructor(letter, svg) {
    const point = Vector.create(0, 0);
  }

  loadSvg = url => {
    return fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (raw) {
        return new window.DOMParser().parseFromString(raw, 'image/svg+xml');
      });
  };

  createBody = () => {};

  greet() {
    return 'Hello, ' + this.greeting;
  }
}

export default Letter;
