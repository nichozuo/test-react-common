import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  // 自定义
  hash: true,
  antd: {},
  dva: {
    immer: true,
    hmr: false,
  },
  mfsu: false,
  webpack5: {},
  esbuild: {},
});
