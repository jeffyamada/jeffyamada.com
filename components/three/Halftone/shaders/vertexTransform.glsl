vUv = uv;

float gridCols = round(uScreenWidth / uSizeMax * 2.);
float col = mod(aIndex, gridCols);
float row = floor(aIndex / gridCols);
float offsetX = -uScreenWidth;
float offsetY = uScreenHeight;
float gridX = col * uSizeMax + offsetX;
float gridY = -row * uSizeMax + offsetY;

position.x = gridX + sin(gridY / uSinX) * uSinXAmount;
position.y = gridY + sin(position.x / uSinY) * uSinYAmount;

vPosition = vec2(0., 0.);
vPosition.x = (position.x + uScreenWidth * 0.5) / uScreenWidth;
vPosition.y = (position.y + uScreenHeight * 0.5) / uScreenHeight;