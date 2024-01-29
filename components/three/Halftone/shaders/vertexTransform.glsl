vUv = uv;

float gridCols = round(uScreenWidth / uSizeMax * 2.);
// float gridRows = round()

float col = mod(aIndex, gridCols);
float row = floor(aIndex / gridCols);

float offsetX = -uScreenWidth;
// float offsetX = 0.;
// float offsetY = uScreenHeight / 2. + mod(col, 2.) * uSizeMax / 2.;
float offsetY = uScreenHeight;
// float offsetY = 0.;

float gridX = col * uSizeMax + offsetX;
float gridY = -row * uSizeMax + offsetY;

position.x = gridX + sin(gridY / uSinX) * uSinXAmount;
position.y = gridY + sin(position.x / uSinY) * uSinYAmount;

// float random = aRandom * 0.025;
// float mouseDistance = distance(vec2(gridX, gridY), vec2(uMouseX, -uMouseY));
// float remapped = remap(mouseDistance, 60. + random, 800., 1., 0.);
// float eased = cellSizeMin + sineInOut(remapped) * (cellSizeMax - cellSizeMin);

vPosition = vec2(0., 0.);
vPosition.x = (position.x + uScreenWidth * 0.5) / uScreenWidth;
vPosition.y = (position.y + uScreenHeight * 0.5) / uScreenHeight;

// // cellSize = eased;
// cellSize = getCellSize(vec3(gridX, gridY, 0.));