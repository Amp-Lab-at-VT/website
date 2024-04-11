// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/**",
            },
        ],
        unoptimized: true,
    },
    output : 'export',
}

module.exports = nextConfig;
