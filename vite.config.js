import { sveltekit } from "@sveltejs/kit/vite";
import { isoImport } from "vite-plugin-iso-import";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), isoImport()],
  build: {
    assetsInlineLimit: 0, // don't inline anything
  }
};

export default config;
