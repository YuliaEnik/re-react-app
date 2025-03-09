import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};


export default nextConfig;
