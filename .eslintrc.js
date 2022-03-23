module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
    UMI_ENV: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    'no-param-reassign': 1,
    'consistent-return': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
