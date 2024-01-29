
// vec4 thing = texture2D(uTexture, uv);
// int id = int(aIndex);
// ivec2 p0 = ivec2(position.x, position.y / 100.);
// vec4 tt = texelFetch(uTexture, p0, 0).rgba;

float halfWidth = uScreenWidth / 2.;
float tx = (position.x + halfWidth) / uScreenWidth;

float halfHeight = uScreenHeight / 2.;
float ty = (position.y + halfHeight) / uScreenHeight;
vec2 texCoords = vec2(tx, ty);
// vec2 texCoords = vec2(0., 1.);
//   (position.x + uScreenWidth / 2.) / uScreenWidth,
//   (position.y + uScreenHeight / 2.) / uScreenHeight
// );

vec4 tt = texture2D(uTexture, vUv);
// vec4 tt = texture2D(uTexture, vec2(100., 0.));

// gl_PointSize = uSizeMin + mod(uTime, 10.) / 10. * 8.;
// gl_PointSize = uSizeMin + 10.;
// gl_PointSize = mix(uSizeMin, uSizeMax, mod(uTime, 10.) / 10.);
// gl_PointSize = mix(uSizeMin, uSizeMax, 1.);
// gl_PointSize = cellSize * vertex.r;
// gl_PointSize = uSizeMin + 4. * tt.r;
float red = (tt.r - tt.b);
// gl_PointSize = 1. * tt[1] * 8.;
gl_PointSize = uSizeMin + texture2D(uTexture, vPosition).r * (uSizeMax - uSizeMin);