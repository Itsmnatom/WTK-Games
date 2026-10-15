import { defineConfig } from 'vite';
import path from 'node:path';
export default defineConfig({
  root: path.resolve(import.meta.dirname), base: '/pixel/',
  build: { outDir: path.resolve(import.meta.dirname,'../public/pixel'), emptyOutDir: true, sourcemap: true },
  server: {host:'127.0.0.1',port:5173,fs:{allow:[path.resolve(import.meta.dirname,'..')]},proxy:{'/api':'http://localhost:3001','/art':'http://localhost:3001','/fonts':'http://localhost:3001'}},
});
