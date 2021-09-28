/* global module */

module.exports = {

    parser: '@typescript-eslint/parser',

    parserOptions: {
        project: 'tsconfig.eslint.json'
    },

    plugins: ['@typescript-eslint'],

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],

    rules: {
        'quotes': ['error', 'single'],
        'require-await': 'error',
        'prefer-const': 'error',
        'no-var': 'error',
        'semi': 'off',
        'eqeqeq': ['error', 'always', { null: 'ignore' }],
        'curly': ['error', 'multi-or-nest'],
        'no-multi-spaces': 'warn',
        'no-multiple-empty-lines': ['warn', { max: 1 }],
        'max-len': ['error', 100],
        'no-return-assign': 'error',
        'nonblock-statement-body-position': ['warn', 'below'],

        '@typescript-eslint/brace-style': 'error',
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-parens': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': ['warn', { args: 'all', argsIgnorePattern: '^_' }],
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/member-delimiter-style': ['error', {
            'multiline': {
                'delimiter': 'none',
                'requireLast': false
            },
            'singleline': {
                'delimiter': 'comma',
                'requireLast': false
            }
        }]
    }
}
