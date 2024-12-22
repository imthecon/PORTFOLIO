import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      three: 'https://unpkg.com/three@0.154.0/build/three.module.js',
      GLTFLoader:'https://unpkg.com/three@0.154.0/examples/jsm/loaders/GLTFLoader.js',
    },
  },
});