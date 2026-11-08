/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['192.168.*.*'],
    experimental: {
        optimizePackageImports: ['react-icons', 'lucide-react', 'date-fns', 'motion'],
    },
    images: {
        minimumCacheTTL: 2592000,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.buddhsentripathi.com',
                pathname: '/assets/**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:all*(svg|jpg|jpeg|png|webp|ico|woff2|manifest.json)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/Resume.pdf',
                destination: 'https://cdn.buddhsentripathi.com/assets/Resume.pdf',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
