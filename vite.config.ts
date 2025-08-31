import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
// 文本压缩
import compression from 'vite-plugin-compression';

export default defineConfig({
  server: {
    host: '0.0.0.0', // 关键！允许外部访问
    port: 5173,
    strictPort: true, // 禁止自动切换端口
  },
  plugins: [
    react(),
    compression({
      // gzip 选项
      verbose: true, // 是否在控制台输出信息
      disable: false, // 是否禁用
      threshold: 10240, // 只有大于此大小的文件才会被压缩
      algorithm: 'gzip', // 使用 gzip 算法
      ext: '.gz', // 生成的压缩文件扩展名
    }),
    createStyleImportPlugin({
      // 使用 createStyleImportPlugin 创建插件，按需引入antd
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => `antd/es/${name}/style/index`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 这样 `@` 才能指向 `src`
    },
  },
  optimizeDeps: {
    // exclude:['react', 'react-dom']
  },
  build: {
    outDir: 'dist', // 确保这里是 'dist'
    target: 'es2015',
    commonjsOptions: {
      include: [/node_modules/],
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // 新增全局变量绑定
        // globals: {
        //   react: 'React',
        //   'react-dom': 'ReactDOM',
        // },
        manualChunks: {
          react: ['react', 'react-dom'],
          antd: ['antd'],
        },
      },
    },
  },
});
