// @ts-check

import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';

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

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: [remarkGfm], // Add GFM (GitHub Flavored Markdown) support
        rehypePlugins: [],
    },
})


// Merge MDX config with Next.js config
export default withMDX(nextConfig)
