float gridCols = round(uScreenWidth * 1.5 / cellSizeMax);

float col = mod(aIndex, gridCols);
float row = floor(aIndex / gridCols);

float offsetX = -uScreenWidth / 2.;
float offsetY = uScreenHeight / 2. + mod(col, 2.) * cellSizeMax / 2.;

float gridX = col * cellSizeMax + offsetX;
float gridY = -row * cellSizeMax + offsetY;

position.x = gridX;
position.y = gridY;

float random = aRandom * 0.025;
float mouseDistance = distance(vec2(gridX, gridY), vec2(uMouseX, -uMouseY));
float remapped = remap(mouseDistance, 60. + random, 800., 1., 0.);
float eased = cellSizeMin + sineInOut(remapped) * (cellSizeMax - cellSizeMin);


// cellSize = eased;
cellSize = getCellSize(vec3(gridX, gridY, 0.));