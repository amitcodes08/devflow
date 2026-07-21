import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: ""
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: ""
      }, 
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: ''
      },
      {
        // Allow employer logos from any HTTPS source returned by JSearch
        protocol: 'https',
        hostname: '**',
        port: ''
      }
    ],
  },
}

export default nextConfig;
