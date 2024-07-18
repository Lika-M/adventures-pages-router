/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dynamic-media-cdn.tripadvisor.com', 's2-casavogue.glbimg.com', 'picsum.photos'],
  },
};

export default nextConfig;
