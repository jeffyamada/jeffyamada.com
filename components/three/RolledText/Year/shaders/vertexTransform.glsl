float diameter = uTextHeight;
float radius = diameter / 2.0;

// float progressRotation = -0.5 + uAnimationProgress;
float progressRotation = -0.5 + uAnimationProgress;
float skew = uVelocity * position.x * 0.001;
float rp = position.y / diameter / 4. + progressRotation + skew;

float rotation = PI * rp;

vec2 rolled = polar(radius, rp);
position.y = rolled.y;
position.z = rolled.x;

// position.y += position.x;
cp = sineOut(1.0 - abs(position.y) / radius);
cp = remap(cp, 0.0, 1.0, 0.25, 1.);
// cp = 0.;
// cp = 0.5;
// cp = 1.0;