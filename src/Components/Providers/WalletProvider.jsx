import { ThirdwebProvider, coinbaseWallet, en, metamaskWallet, rainbowWallet, safeWallet, trustWallet, walletConnect, zerionWallet } from "@thirdweb-dev/react";

import { Sepolia, Ethereum,PolygonAmoyTestnet ,Polygon} from "@thirdweb-dev/chains";

const WalletProvider = ({ children }) => {
	return (
		<ThirdwebProvider
			supportedChains={[Polygon]}
			autoSwitch={true}
			activeChain={Polygon}
			clientId={process.env.THIRD_WEB_CLIENTID}
			locale={en()}
			supportedWallets={[
				metamaskWallet({ recommended: true }),
				coinbaseWallet(),
				walletConnect({ recommended: true }),
				safeWallet({
					personalWallets: [
						metamaskWallet({ recommended: true }),
						coinbaseWallet(),
						walletConnect({ recommended: true }),
						trustWallet(),
						zerionWallet(),
						rainbowWallet(),
					],
				}),
				trustWallet(),
				zerionWallet(),
				rainbowWallet(),
			]}
			
			// dAppMeta={{
			// 	name: "tesseractx.com",

			// 	url: "https://tesseractx.com",
			// 	/**
			// 	 * optional - a description of your app
			// 	 */
			// 	/**
			// 	 * optional - a url that points to a logo (or favicon) of your app
			// 	 */
			// 	logoUrl: "string",
			// 	/**
			// 	 * optional - whether to show the connect dialog in darkmode or not
			// 	 */
			// }}
		>
			{children}
		</ThirdwebProvider>
	);
};

export default WalletProvider;
