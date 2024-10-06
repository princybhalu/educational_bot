module.exports = {
  env: {
    node: true, // Enable Node.js global variables
    // other environments can be added here if needed
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17 doesn't require import of React
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
