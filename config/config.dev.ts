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
      target: 'https://hjy-test.mengyawa.com/services/',
      // target: 'http://127.0.0.1:8000/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
});
