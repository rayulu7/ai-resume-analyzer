import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  base: "/projects/ai-resume-analyzer/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
      '@/': path.resolve(__dirname, './'),
    },
  },
  optimizeDeps: {
    include: ['pdfjs-dist'],
  },
  ssr: {
    noExternal: ['lucide-react'],
  },
});

