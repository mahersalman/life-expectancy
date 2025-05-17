import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/predict',
        destination: 'https://life-expectancy-fr5x.onrender.com/predict',
      },
    ];
  },
};

export default nextConfig;
