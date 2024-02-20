/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingExcludes: {
      "*": [
        "node_modules/@swc/**/*",
        "node_modules/@esbuild/**/*",
        "node_modules/terser/**/*",
        "node_modules/webpack/**/*",
      ],
      "/*": ["public/static/work/**/*.png"],
      "/**": ["public/static/work/**/*.png"],
    },
  },
};

export default nextConfig;
