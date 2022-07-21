import { defineMDSveXConfig as defineConfig } from "mdsvex";
import remarkAttr from "remark-attr";
import remarkExtLinks from 'remark-external-links'

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [remarkAttr, remarkExtLinks],
  rehypePlugins: [],
  layout: {
    _: "./src/lib/layouts/default.svelte",
  },
});

export default config;