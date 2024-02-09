module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'import'],
  settings: {
    react: { version: 'detect' },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src', 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'react/prop-types': 'off',
    // As per React 17 changes! https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    'linebreak-style': ['error', 'unix'],

    'no-unused-vars': 'off',

    // Style
    quotes: ['error', 'single', { avoidEscape: true }],

    // Require all imported dependencies are actually declared in package.json
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false, // Disallow importing optional dependencies (those shouldn't be in use in the project)
        peerDependencies: false, // Disallow importing peer dependencies (that aren't also direct dependencies)
        devDependencies: true
      }
    ],

    // Require all imported libraries actually resolve (!!required for import/no-extraneous-dependencies to work!!)
    'import/no-unresolved': ['error'],

    // Require an ordering on all imports
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external'],
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],

    // Cannot import from the same module twice
    'no-duplicate-imports': ['error'],

    // Cannot shadow names
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',

    // Required spacing in property declarations (copied from TSLint, defaults are good)
    'key-spacing': ['error'],

    // Require semicolons
    semi: ['error', 'always'],

    // Don't unnecessarily quote properties
    'quote-props': ['error', 'consistent-as-needed'],

    // No multiple empty lines
    'no-multiple-empty-lines': ['error'],

    // Max line lengths
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true, // Most common reason to disable it
        ignoreStrings: true, // These are not fantastic but necessary for error messages
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],

    // Don't leave log statements littering the premises!
    'no-console': 'off',

    // Useless diff results
    'no-trailing-spaces': ['error'],

    // Must use foo.bar instead of foo['bar'] if possible
    'dot-notation': ['error'],

    // Are you sure | is not a typo for || ?
    'no-bitwise': ['error']
  }
};
