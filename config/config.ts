import { defineConfig } from 'umi';
import env from './envs';
import proxy from './proxy';

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
  mfsu: {},
});
