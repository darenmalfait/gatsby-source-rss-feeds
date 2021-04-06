module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [`google`, `eslint:recommended`, `prettier`],
  plugins: [`prettier`, `react`],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    before: true,
    after: true,
    spyOn: true,
    NodeJS: true,
    JSX: true,
    NodeRequire: true,
    TimerHandler: true,
    __PATH_PREFIX__: true,
    __BASE_PATH__: true,
    __ASSET_PREFIX__: true,
  },
  rules: {
    'no-unused-expressions': `off`,
    'no-invalid-this': `off`,
    'arrow-body-style': [
      `error`,
      `as-needed`,
      { requireReturnForObjectLiteral: true },
    ],
    'new-cap': `off`,
    'no-unused-vars': [
      `warn`,
      {
        varsIgnorePattern: `^_`,
        argsIgnorePattern: `^_`,
        ignoreRestSiblings: true,
      },
    ],
    'consistent-return': [`error`],
    'no-console': `off`,
    'no-inner-declarations': `off`,
    quotes: [`error`, `backtick`],
    'react/display-name': `off`,
    'react/jsx-key': `warn`,
    'react/no-unescaped-entities': `off`,
    'react/prop-types': `off`,
    'require-jsdoc': `off`,
    'valid-jsdoc': `off`,
    'prefer-promise-reject-errors': `warn`,
    'no-prototype-builtins': `warn`,
    'guard-for-in': `warn`,
    'spaced-comment': [
      `error`,
      `always`,
      { markers: [`/`], exceptions: [`*`, `+`] },
    ],
    camelcase: [
      `error`,
      {
        properties: `never`,
        ignoreDestructuring: true,
        allow: [`^unstable_`],
      },
    ],
  },
  overrides: [
    {
      files: [`*.ts`, `*.tsx`],
      parser: `@typescript-eslint/parser`,
      plugins: [`@typescript-eslint/eslint-plugin`],
      extends: [`plugin:@typescript-eslint/recommended`],
      rules: {
        // We should absolutely avoid using ts-ignore, but it's not always possible.
        // particular when a dependencies types are incorrect.
        '@typescript-eslint/ban-ts-comment': [
          `warn`,
          { 'ts-ignore': `allow-with-description` },
        ],
        // This rule is great. It helps us not throw on types for areas that are
        // easily inferrable. However we have a desire to have all function inputs
        // and outputs declaratively typed. So this let's us ignore the parameters
        // inferrable lint.
        '@typescript-eslint/no-inferrable-types': [
          `error`,
          { ignoreParameters: true },
        ],
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
        // This rule tries to prevent using `require()`. However in node code,
        // there are times where this makes sense. And it specifically is causing
        // problems in our tests where we often want this functionality for module
        // mocking. At this point it's easier to have it off and just encourage
        // using top-level imports via code reviews.
        '@typescript-eslint/no-var-requires': `off`,
        '@typescript-eslint/no-extra-semi': `off`,
        // This rule ensures that typescript types do not have semicolons
        // at the end of their lines, since our prettier setup is to have no semicolons
        // e.g.,
        // interface Foo {
        // -  baz: string;
        // +  baz: string
        // }
        '@typescript-eslint/no-empty-function': `off`,
        // This ensures that we always type the return type of functions
        // a high level focus of our TS setup is typing fn inputs and outputs.
        '@typescript-eslint/explicit-function-return-type': `off`,
        '@typescript-eslint/explicit-module-boundary-types': [
          `warn`,
          {
            allowArgumentsExplicitlyTypedAsAny: true,
          },
        ],
        '@typescript-eslint/no-explicit-any': `off`,
        // This forces us to use interfaces over types aliases for object definitions.
        // Type is still useful for opaque types
        // e.g.,
        // type UUID = string
        '@typescript-eslint/consistent-type-definitions': [
          `error`,
          `interface`,
        ],
        '@typescript-eslint/no-use-before-define': [
          `error`,
          { functions: false },
        ],
        // Allows us to write unions like `type Foo = "baz" | "bar"`
        // otherwise eslint will want to switch the strings to backticks,
        // which then crashes the ts compiler
        quotes: `off`,
        '@typescript-eslint/quotes': [
          2,
          `backtick`,
          {
            avoidEscape: true,
          },
        ],
        '@typescript-eslint/array-type': [`error`, { default: `generic` }],
      },
    },
  ],
};
