/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      loader: 'webpack-glsl-loader',
    });

    return config;
  },
}

module.exports = nextConfig


// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: false,
//   swcMinify: false,
//   compiler: {
//     styledComponents: true,
//   },
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.glsl$/,
//       loader: 'webpack-glsl-loader',
//     });

//     return config;
//   },
//   images: {
//     domains: ['downloads.ctfassets.net', 'images.ctfassets.net'],
//   },
// };
