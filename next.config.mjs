/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		// WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
		THIRD_WEB_CLIENTID: process.env.THIRD_WEB_CLIENTID,
		THIRD_WEB_SECRETKEY: process.env.THIRD_WEB_SECRETKEY,
		API_URL: process.env.API_URL,
		TWEETER_CARD_URL:process.env.TWEETER_CARD_URL,
		SOCKET_URL: process.env.SOCKET_URL,
	},
	compiler: {
		styledComponents: true
	}
};

export default nextConfig;
