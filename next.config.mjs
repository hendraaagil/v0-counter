/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/number',
        destination: 'https://www.randomnumberapi.com/api/v1.0/random',
      },
    ]
  },
}

export default nextConfig
