import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    reporters: [
      'verbose',
      'junit',
    ],
    outputFile: './junit.xml',
  },
});