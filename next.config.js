module.exports = {
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
	output: 'export',
    basePath: '',
};