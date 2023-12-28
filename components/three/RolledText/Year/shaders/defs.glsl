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

float sineOut(float t) {
  return sin(t * HALF_PI);
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

uniform float uTime;
uniform float uTextHeight;
uniform float uAnimationProgress;
uniform float uVelocity;
uniform float uTextWidth;
uniform float uOpacity;

varying float cp;