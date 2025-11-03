import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      exclude: ["node_modules/", "dist/", "**/*.test.ts", "**/__tests__/**"],
    },
  },
  plugins: [tsconfigPaths()]
});
