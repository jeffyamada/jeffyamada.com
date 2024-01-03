type PointType = {
  x: number;
  y: number;
  z?: number;
};

export default class Point {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static distance = (p1: PointType, p2: PointType) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  static distanceNum = (n1: number, n2: number) => {
    const distance = Point.distance({ x: n1, y: 0 }, { x: n2, y: 0 });
    return distance;
  };

  static polarRads = (distance: number, radians: number) => {
    const x = distance * Math.cos(radians);
    const y = distance * Math.sin(radians);
    return new Point(x, y);
  };

  static polarDegrees = (distance: number, degrees: number) => {
    const rads = (Math.PI / 180) * degrees;
    return Point.polarRads(distance, rads);
  };

  static lerp = (ratio: number, p1: PointType, p2: PointType) => {
    const x = p1.x + (p2.x - p1.x) * ratio;
    const y = p1.y + (p2.y - p1.y) * ratio;
    const z = p1?.z && p2?.z ? p1.z + (p2.z - p1.z) * ratio : 0;
    return new Point(x, y, z);
  };

  static mix = (ratio: number, a: number, b: number) => {
    const num = a + (b - a) * ratio;
    return num;
  };

  static clamp = (x: number, min: number, max: number) => {
    const clamped = Math.min(max, Math.max(min, x));
    return clamped;
  };

  static angle = (p1: PointType, p2: PointType) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const radians = Math.atan2(dy, dx);
    return {
      degrees: (radians / (Math.PI * 2)) * 360,
      radians,
    };
  };

  static remap = (
    value: number,
    inputLowerBound: number,
    inputUpperBound: number,
    outputLowerBound = 0,
    outputUpperBound = 1,
    clamp = true,
  ) => {
    let p = (value - inputLowerBound) / (inputUpperBound - inputLowerBound);
    if (clamp) {
      if (p < 0) p = 0;
      else if (p > 1) p = 1;
    }
    return outputLowerBound + (outputUpperBound - outputLowerBound) * p;
  };
}
