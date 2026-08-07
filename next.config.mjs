import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/docs/client-api',
        destination: '/docs/api',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
