// gl_PointSize = 30.;
// gl_PointSize = 2.;
// gl_FragColor.a *= uIntroProgress;
// gl_FragColor.a *= (1. - texture2D(uTexture, vUv).b);
// gl_FragColor.r = 1.;
// vec2 p = 
// gl_FragColor.r = texture2D(uTexture, vPosition).r;
// gl_FragColor.g = texture2D(uTexture, vPosition).r;
gl_FragColor.rgb = texture2D(uTexture, vPosition).rgb;
// gl_FragColor = vec4(1.,1.,1.,1.);