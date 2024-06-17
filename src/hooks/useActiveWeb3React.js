
import {
	NATIVE_TOKEN_ADDRESS,
	useAddress,
	useBalance,
	useConnect,
	useDisconnect,
	useSDK,
	useSigner,
	useSwitchChain,
	useWallet,
	useConnectionStatus,
	useChainId,
	useWalletConfig,
} from "@thirdweb-dev/react";
// import { useSelector } from "react-redux";

export function useActiveWeb3React() {
	const connect = useConnect();
	const disconnect = useDisconnect();

	const address = useAddress();
	const chainId = useChainId();
	const library = useSigner();
	const walletConfig = useWalletConfig();
	const connectionStatus = useConnectionStatus();
	const switchNetwork = useSwitchChain();
	const sdk = useSDK();
	const walletInstance = useWallet();

	// console.log("address", address);

	const { data: balance, error } = useBalance(NATIVE_TOKEN_ADDRESS);  // pass weth address

	if (address && chainId) {
		return {
			activate: connect,
			deactivate: disconnect,
			account: address,
			chainId: chainId,
			active: true,
			library: library?.provider,
			error: error,
			balance:
				+balance?.displayValue < 10
					? parseFloat(balance?.displayValue || 0).toFixed(4)
					: parseInt(balance?.displayValue || 0),
			switchNetwork,
			sdk: sdk,
			status: connectionStatus,
			walletName: walletConfig?.meta.name,
			walletImage: walletConfig?.meta.iconURL,
		};
	} else {
		return {
			activate: connect,
			deactivate: disconnect,
			account: null,
			chainId: null,
			active: false,
			library: null,
			error: null,
			balance: null,
			switchNetwork: () => {},
			sdk: sdk,
			status: connectionStatus,
			walletName: null,
			walletImage: null,
		};
	}
}
