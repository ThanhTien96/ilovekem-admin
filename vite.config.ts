import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
  envPrefix: "REACT_APP_",
   build: {
    outDir: "dist",
  },
   resolve: {
    alias: [{ find: /^~/, replacement: "" }],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    open: true,
    host: true,
    port: 3030,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
})
