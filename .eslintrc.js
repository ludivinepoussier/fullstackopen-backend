module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2020': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-console': 0
    }
}
