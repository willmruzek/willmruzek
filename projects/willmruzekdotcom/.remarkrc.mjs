export default {
  plugins: [
    "remark-lint",
    ["remark-frontmatter", ["yaml"]],
    "remark-mdx",
    [
      "remark-lint-frontmatter-schema",
      [
        "error",
        {
          schemas: {
            "content/schemas/main.json": ["content/**/*.mdx"],
          },
        },
      ],
    ],
  ],
};
