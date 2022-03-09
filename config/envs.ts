export default {
  dev: {
    'process.env.BASE_URL': '/api/admin/',
    'process.env.TOKEN_NAME': 'TEST-REACT-COMMON',
  },
  test: {
    'process.env.BASE_URL': 'testAPI',
  },
  uat: {
    'process.env.BASE_URL': 'uatAPI',
  },
  prod: {
    'process.env.BASE_URL': 'prodAPI',
  },
} as Record<string, any>;
