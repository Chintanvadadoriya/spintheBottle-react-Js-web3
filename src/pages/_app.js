import { SocketProvider } from "@/Components/SocketProvider";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";

const WalletProvider = dynamic(
	() => import("@/Components/Providers/WalletProvider"),
	{
		ssr: false,
	}
);

const Layout = dynamic(() => import("@/Components/Layout"), {
	ssr: false,
});

const BannerMesSiteMeaintance = dynamic(() => import("@/pages/bannermsg"), {
	ssr: false,
});

export default function App({ Component, pageProps }) {
	return (
		<WalletProvider>
			<Provider store={store}>
				<SocketProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
					{/* <BannerMesSiteMeaintance>
					<Component {...pageProps} />
					</BannerMesSiteMeaintance> */}
				</SocketProvider>
			</Provider>
		</WalletProvider>
	);
}
