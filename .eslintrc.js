module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [`google`, `eslint:recommended`, `prettier`],
  plugins: [`prettier`, `babel`],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: `module`,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'arrow-body-style': `off`,
    'object-shorthand': [`error`, `properties`], // methods are optional so you can specify a name if you want
    'prefer-arrow-callback': [
      `error`,
      { allowNamedFunctions: true, allowUnboundThis: true },
    ],
    'prefer-destructuring': `off`, // nah, I like it, but not that much...
    'sort-imports': `off`,
    'babel/camelcase': `off`,
    'new-cap': `off`,
    'babel/new-cap': [
      `error`,
      {
        newIsCap: true,
        capIsNew: true,
      },
    ],
    'no-invalid-this': `off`,
    'babel/no-invalid-this': `error`,
    'no-class-assign': `error`,
    'no-duplicate-imports': `error`,
    'no-restricted-exports': `off`, // not applicable for a config preset (should be configured only in projects)
    'no-restricted-imports': `off`, // not applicable for a config preset (should be configured only in projects)
    'no-useless-computed-key': `error`,
    'no-useless-constructor': `error`,
    'no-useless-rename': `error`,
    'no-var': `error`,
    'prefer-const': `error`,
    'prefer-numeric-literals': `error`,
    'prefer-rest-params': `error`,
    'prefer-spread': `error`,
    'prefer-template': `error`,
    'require-yield': `error`,
    'symbol-description': `error`,
    'constructor-super': `error`,
    'no-const-assign': `error`,
    'no-dupe-class-members': `error`,
    'no-new-symbol': `error`,
    'no-this-before-super': `error`,
    'no-unsafe-optional-chaining': `error`,
    'no-unused-expressions': `off`,
    'no-unused-vars': [
      `warn`,
      {
        varsIgnorePattern: `^_`,
        argsIgnorePattern: `^_`,
        ignoreRestSiblings: true,
      },
    ],
    'babel/no-unused-expressions': `error`,
    'valid-typeof': `off`,
    'babel/valid-typeof': `error`,
    'require-jsdoc': `off`,
    'valid-jsdoc': `off`,
  },
  overrides: [
    {
      files: [`**/*.ts?(x)`],
      parser: `@typescript-eslint/parser`,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: `module`,
      },
      plugins: [`@typescript-eslint/eslint-plugin`],
      extends: [`plugin:@typescript-eslint/recommended`],
      rules: {
        'babel/no-invalid-this': `off`,
        '@typescript-eslint/no-invalid-this': `error`,
        'no-var': `error`, // ts transpiles let/const to var, so no need for vars any more
        'prefer-const': `error`, // ts provides better types with const
        'prefer-rest-params': `error`, // ts provides better types with rest args over arguments
        'prefer-spread': `error`, // ts transpiles spread to apply, so no need for manual apply
        'no-duplicate-imports': `off`,
        '@typescript-eslint/no-duplicate-imports': `error`,
        'no-useless-constructor': `off`,
        '@typescript-eslint/no-useless-constructor': `error`,
        'constructor-super': `off`, // ts(2335) & ts(2377)
        'no-const-assign': `off`, // ts(2588)
        'no-new-symbol': `off`, // ts(2588)
        'no-this-before-super': `off`, // ts(2376)
        'babel/valid-typeof': `off`, // ts(2367)
        'no-dupe-class-members': `off`,
        '@typescript-eslint/no-dupe-class-members': `off`, // ts(2393) & ts(2300)
        'babel/no-unused-expressions': `off`,
        '@typescript-eslint/no-unused-expressions': `error`,
        '@typescript-eslint/explicit-module-boundary-types': [
          `warn`,
          {
            allowArgumentsExplicitlyTypedAsAny: true,
          },
        ],
        '@typescript-eslint/no-empty-function': `off`,
        '@typescript-eslint/no-explicit-any': `off`,
        '@typescript-eslint/ban-types': [
          `error`,
          {
            extendDefaults: true,
            types: {
              '{}': {
                fixWith: `Record<string, unknown>`,
              },
              object: {
                fixWith: `Record<string, unknown>`,
              },
            },
          },
        ],
        camelcase: `off`,
        '@typescript-eslint/naming-convention': [
          `error`,
          {
            selector: `default`,
            format: [`camelCase`],
          },
          {
            selector: `variable`,
            format: [`camelCase`, `UPPER_CASE`, `PascalCase`],
            leadingUnderscore: `allowSingleOrDouble`,
            trailingUnderscore: `allowSingleOrDouble`,
          },
          {
            selector: `function`,
            format: [`camelCase`, `PascalCase`],
            leadingUnderscore: `allow`,
          },
          {
            selector: `parameter`,
            format: [`camelCase`, `PascalCase`, `snake_case`],
            leadingUnderscore: `allowSingleOrDouble`,
          },
          {
            selector: `enumMember`,
            format: [`camelCase`, `UPPER_CASE`, `PascalCase`],
          },
          {
            selector: `typeLike`,
            format: [`PascalCase`],
          },
          {
            selector: `typeAlias`,
            format: [`camelCase`, `PascalCase`],
          },
          {
            selector: `property`,
            format: [`PascalCase`, `UPPER_CASE`, `camelCase`, `snake_case`],
            leadingUnderscore: `allowSingleOrDouble`,
          },
          {
            selector: `objectLiteralProperty`,
            format: [`PascalCase`, `UPPER_CASE`, `camelCase`, `snake_case`],
            leadingUnderscore: `allowSingleOrDouble`,
            trailingUnderscore: `allowSingleOrDouble`,
          },
          {
            selector: `enum`,
            format: [`PascalCase`, `UPPER_CASE`],
          },
          {
            selector: `method`,
            format: [`PascalCase`, `camelCase`],
            leadingUnderscore: `allowSingleOrDouble`,
          },
        ],
      },
    },
  ],
};
