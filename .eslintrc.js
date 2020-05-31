module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    // hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // underscore
    'no-underscore-dangle': 'off',
    // ++ / plusplus
    'no-plusplus': 'off',
    // for require and stuff
    'global-require': 0,
    // console.log stuff
    'no-console': 'off',
    // props validation ignoring for react navigation
    'react/prop-types': ['error', { ignore: ['navigation', 'route'] }],
    // camelcase
    camelcase: 'off',
  },
};
