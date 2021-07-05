import typescript from "@wessberg/rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./stealer.ts",
  output: {
    file: "./index.js",
    format: "cjs",
  },
  external: ["spiral", "os", "tty", "util"],
  plugins: [
    typescript(),
    commonjs(),
  ],
};
