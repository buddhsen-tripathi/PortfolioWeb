/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['192.168.*.*'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.buddhsentripathi.com',
                pathname: '/assets/**',
            },
        ],
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
