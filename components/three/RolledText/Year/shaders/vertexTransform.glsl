float diameter = uTextHeight;
float radius = diameter / 2.0;

float skewDistance = distance(-uTextWidth / 2.0, position.x);
float skew = skewDistance * -uVelocity * 0.0005;
// float skew = -sineInOut(abs(position.x) / uTextWidth / 2.0) * uVelocity * 1.8;

float progressRotation = -0.5 + uAnimationProgress;

float rp = position.y / diameter / 4. + progressRotation + skew;

float rotation = PI * rp;

vec2 rolled = polar(radius, rp);
position.y = rolled.y;
position.z = rolled.x;

// position.y += position.x;
cp = sineOut(1.0 - abs(position.y) / radius);
cp = remap(cp, 0.0, 1.0, 0.1, 1.);
// cp = 0.;
// cp = 0.5;
// cp = 1.0;