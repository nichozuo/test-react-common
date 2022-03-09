// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.ENV': 'dev',
    'process.env.BASE_URL': '/api/admin/',
    'process.env.TOKEN_NAME': 'TEST-REACT-COMMON',
  },
  proxy: {
    '/api/': {
      target: 'https://pulin-test.vankeservice.com/newfang/services/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  plugins: ['react-dev-inspector/plugins/umi/react-inspector'],
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
});
