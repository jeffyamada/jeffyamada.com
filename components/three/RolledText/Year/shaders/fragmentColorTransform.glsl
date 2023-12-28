gl_FragColor.a *= cp;
// gl_FragColor.a = 0.;

if (uAnimationProgress == 0.0) gl_FragColor *= 0.0;
if (uAnimationProgress == 1.0) gl_FragColor *= 0.0;

gl_FragColor *= uOpacity;