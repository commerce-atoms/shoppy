import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "countdown/getCountdownString": "src/countdown/getCountdownString.ts",
    "diff/getTimeUntil": "src/diff/getTimeUntil.ts",
    "expire/isDateExpired": "src/expire/isDateExpired.ts",
    "types/timeDifference": "src/types/timeDifference.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});
