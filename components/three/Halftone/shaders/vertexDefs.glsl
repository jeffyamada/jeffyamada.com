in vec2 texCoordinate;

attribute float aIndex;

uniform float uTime;
uniform float uScreenWidth;
uniform float uScreenHeight;
uniform float uSizeMax;
uniform float uSizeMin;
uniform float uSinX;
uniform float uSinY;
uniform float uSinXAmount;
uniform float uSinYAmount;
uniform sampler2D uTexture;

float cellSizeMax = 8.;
float cellSizeMin = 1.;
float cellSize = 4.;

varying vec2 vUv;
varying vec2 vPosition;
