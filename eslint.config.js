import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.git/**',
      '*.min.js'
    ]
  },
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node
      }
    },
    plugins: {
      prettier
    },
    rules: {
      // CommonJS require() 
      'import/no-commonjs': 'off',
      'import/no-dynamic-require': 'off',
      
      'no-console': 'warn',
      'no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }],
      'no-var': 'error',
      'prefer-const': 'error',
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      
      // Prettier
      'prettier/prettier': 'error'
    }
  }
]; 