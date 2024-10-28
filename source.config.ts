import {
  defineDocs,
  defineConfig,
  type DefaultMDXOptions,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const { docs, meta } = defineDocs({
  dir: "content/blog",
  docs: {
    schema: frontmatterSchema.extend({
      date: z
        .string()
        .or(z.date())
        .transform((value, context) => {
          try {
            return new Date(value);
          } catch {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid date",
            });
            return z.NEVER;
          }
        }),
    }),
  },
});

const mdxOptions: DefaultMDXOptions = {};

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: mdxOptions,
  generateManifest: true,
});
