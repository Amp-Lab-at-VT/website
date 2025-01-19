import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
    output : 'standalone',
    experimental: {
        typedRoutes: true,
    },
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm], // Add GFM (GitHub Flavored Markdown) support
        rehypePlugins: [],
    },
})

export default withMDX(nextConfig)
