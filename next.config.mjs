/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '', // Leave empty for default port
                pathname: '/**', // Matches all paths under this hostname
            },
        ],
    },
};

export default nextConfig;
