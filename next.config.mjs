/** Static export: the whole site is prebuilt HTML + JSON, deployable on any static host.
 *  Served at the root of cleanslate-unlearning.github.io, so BASE_PATH stays unset. */
const basePath = process.env.BASE_PATH || "";
const nextConfig = { output: "export", images: { unoptimized: true }, basePath, trailingSlash: true };
export default nextConfig;
