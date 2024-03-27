/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
    },
};

export default nextConfig;
