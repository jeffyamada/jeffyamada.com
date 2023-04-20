// {
//   "extends": [
//     "next/core-web-vitals",
//     "plugin:storybook/recommended"
//   ]
// }
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'import'],
  rules: {
    '@typescript-eslint/no-unused-vars': 2,
    'no-console': 1,
    'import/no-named-as-default': 0,
    'react/display-name': 0,
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 'off',
  },
};
