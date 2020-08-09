module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2020': true,
    'node': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 11
  },
  'rules': {
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'eqeqeq': 'error',
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'no-console': 0,
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [ 'error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
  }
}
