import * as THREE from 'three';
import _ from 'lodash';
import { StrokePoint } from '.';
import polynomial from 'interpolating-polynomial';
import { pointsOnBezierCurves, Point } from 'points-on-curve';
import PointLib from '@/lib/Point';

class SignatureCurve extends THREE.Curve<any> {
  points: StrokePoint[];
  poly: any;
  // curvePoints: Point[];

  constructor(points: StrokePoint[]) {
    super();
    this.points = points;
    // this.curvePoints = this.interpolatePoints();
    // console.log('this.curvePoints:', this.curvePoints);
  }

  // interpolatePoints = () => {
  //   const curve = _.map(this.points, ({ x, y }) => [x, y] as Point);
  //   const pobc = pointsOnBezierCurves(curve, 0.0001);
  //   console.log('/// pobc.length:', pobc.length);
  //   return pobc;
  // };

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    // test sine wave
    // const tx = t * 3 - 1.5;
    // const ty = Math.sin(2 * Math.PI * t);
    // const tz = 0;
    // optionalTarget.set(tx, ty, tz).multiplyScalar(100);
    // console.log('optionalTarget:', optionalTarget);
    // return optionalTarget;

    const decimalIndex = t * (this.points.length - 1);
    const low = Math.floor(decimalIndex);
    const high = Math.ceil(decimalIndex);
    const ratio = decimalIndex - low;

    const p1 = this.points[low];
    const p2 = this.points[high];

    const point1 = new PointLib(p1.x, -p1.y, 0);
    const point2 = new PointLib(p2.x, -p2.y, 0);

    const interped = PointLib.lerp(ratio, point1, point2);

    optionalTarget.x = interped.x;
    optionalTarget.y = interped.y;
    optionalTarget.z = 0;
    return optionalTarget;
  }
}

export default SignatureCurve;
