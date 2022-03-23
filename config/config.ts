import { defineConfig } from 'umi';
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';

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
  history: {
    type: 'hash',
  },
  chainWebpack(config: any) {
    config.plugin('windicss').use(WindiCSSWebpackPlugin);
  },
});
