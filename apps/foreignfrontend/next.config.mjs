function getCmsImagePattern() {
  const cmsApiUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
  if (!cmsApiUrl) return null;

  try {
    const url = new URL(cmsApiUrl);
    return {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      port: url.port,
      pathname: "/**",
    };
  } catch {
    console.warn(
      "NEXT_PUBLIC_CMS_API_URL is not a valid URL; remote CMS images will not be optimized.",
    );
    return null;
  }
}

const cmsImagePattern = getCmsImagePattern();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
      },
      ...(cmsImagePattern ? [cmsImagePattern] : []),
    ],
  },
};

export default nextConfig;
