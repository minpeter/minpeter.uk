// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var { docs, meta } = defineDocs({
  dir: "content/blog"
});
var source_config_default = defineConfig({
  lastModifiedTime: "git"
});
export {
  source_config_default as default,
  docs,
  meta
};
