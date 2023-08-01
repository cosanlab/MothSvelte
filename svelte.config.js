import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    env: {
      dir: "./",
    },
    adapter: adapter(),
  },
  preprocess: vitePreprocess(),
};
export default config;
