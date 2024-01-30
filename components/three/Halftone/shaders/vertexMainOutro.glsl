float halfWidth = uScreenWidth / 2.;
float tx = (position.x + halfWidth) / uScreenWidth;
float halfHeight = uScreenHeight / 2.;
float ty = (position.y + halfHeight) / uScreenHeight;
vec2 texCoords = vec2(tx, ty);
vec4 tt = texture2D(uTexture, vUv);
float red = (tt.r - tt.b);

gl_PointSize = uSizeMin + texture2D(uTexture, vPosition).r * (uSizeMax - uSizeMin);