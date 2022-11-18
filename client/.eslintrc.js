module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
  ],
  globals: {
    shallow: true,
    render: true,
    mount: true,
    toJson: true,
  },
  rules: {
    'no-param-reassign': 0,
    'no-console': 'error',
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx'],
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['ConditionalExpression'],
      },
    ],
    'template-curly-spacing': 'off',
    semi: 2,
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
      },
    ],
    'import/prefer-default-export': 'off',
    camelcase: 'off',
    quotes: [
      'error',
      'single',
    ],
    'jsx-quotes': [
      'error',
      'prefer-double',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'object-curly-newline': ['error', {
      ObjectExpression: 'always',
      ObjectPattern: {
        multiline: true,
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true, minProperties: 3,
      },
    }],
    'operator-linebreak': [
      'error',
      'before',
      {
        overrides: {
          '=': 'none',
        },
      },
    ],
  },
};
