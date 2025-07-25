
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.creatio.com',
        port: '',
        pathname: '/**',
      },
      // Add other necessary domains for images from the API if known
      // For example, if icon_url or screenshot_url come from a specific domain:
      // {
      //   protocol: 'https',
      //   hostname: 'api.solude.tech', // Or the actual image hosting domain
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;
