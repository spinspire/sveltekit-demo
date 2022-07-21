import { defineMDSveXConfig as defineConfig } from "mdsvex";
import remarkAttr from "remark-attr";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [remarkAttr],
  rehypePlugins: [],
  layout: {
    _: "./src/lib/layouts/default.svelte",
  },
});

export default config;