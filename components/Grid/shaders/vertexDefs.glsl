#ifndef HALF_PI
#define HALF_PI 1.5707963268
#endif

#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif

#ifndef TWO_PI
#define TWO_PI 6.283185307179586
#endif

float sineIn(float t) {
  return sin((t - 1.0) * HALF_PI) + 1.0;
}

float sineInOut(float t) {
  return -0.5 * (cos(PI * t) - 1.0);
}

float exponentialOut(float t) {
  return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);
}

float exponentialInOut(float t) {
  return t == 0.0 || t == 1.0 ? t : t < 0.5 ? +0.5 * pow(2.0, (20.0 * t) - 10.0) : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

float remap(float v, float inLow, float inHigh, float outLow, float outHigh) {
  float p = (v - inLow) / (inHigh - inLow);
  if(p < 0.)
    p = 0.;
  else if(p > 1.)
    p = 1.;
  return outLow + (outHigh - outLow) * p;
}

vec2 polar(float distance, float rotation) {
  float x = distance * cos(rotation * TWO_PI);
  float y = distance * sin(rotation * TWO_PI);
  
  return vec2(x, y);
}

attribute float aIndex;
attribute float aRandom;

uniform float uTime;
uniform float uScreenWidth;
uniform float uScreenHeight;
uniform float uMouseX;
uniform float uMouseY;
uniform float uMouseV;
uniform float uIntroProgress;
uniform vec3 uStrokes[60];

varying float columns;

float cellSizeMax = 18.;
float cellSizeMin = 4.;
float cellSize = 10.;


float getCellSize(vec3 point) {
  float rangeMin = max(uScreenWidth, uScreenHeight) * .1;
  float rangeMax = max(uScreenWidth, uScreenHeight) * .3;
  float rangeDiff = rangeMax - rangeMin;
  float diff = cellSizeMax - cellSizeMin;
  // float random = aRandom * 0.025;
  float smallest = 0.;
  for(int i=0; i<60; ++i) {
    vec3 strokePoint = uStrokes[i];
    float strokeDistance = distance(strokePoint, point);
    float remapped = remap(strokeDistance, 40. * uMouseV, rangeMin + rangeDiff * uMouseV, 1., 0.) * strokePoint.z;
    if (remapped > smallest) smallest = remapped;
  }

  float eased = cellSizeMin + sineInOut(smallest) * diff * uMouseV;
  // return eased;

  float waveY = sin(uTime / 2.2 + point.y / 500.) * diff + cellSizeMin; 
  float waveX = sin(uTime / 1.2 + point.x / 200.) * diff + cellSizeMin; 
  float wave = (waveY + waveX) / 2.;

  return mix(eased, wave, exponentialOut(1. - uMouseV)) * uIntroProgress;
}
