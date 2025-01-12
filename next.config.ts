import { NextConfig } from 'next';
import withPWA from '@ducanh2912/next-pwa';

const config: NextConfig = {
  // output: "export",
  // distDir: "build",
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Rewrites need to be inside the config object
  async rewrites() {
    return [
      {
        source: '/sw.js',
        destination: '/_next/static/sw.js',
      },
    ];
  }
};

// Apply PWA wrapper with options
const pwaConfig = withPWA({
  dest: "public",
  register: true,
  // disable: process.env.NODE_ENV === 'development'
});

// Export the configured Next.js config
module.exports = pwaConfig(config);