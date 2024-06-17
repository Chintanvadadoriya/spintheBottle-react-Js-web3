/** @format */

import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { useRouter } from "next/router";
import { ConnectWallet, lightTheme } from "@thirdweb-dev/react";


const Home = () => {

    const router = useRouter();

    const { account } = useActiveWeb3React()

    const goToGame = () => {
        router.push('/game');
    }
    return (

        <div className='common-block-center main-pages-block'>
            <div className='logo-main'>
                <img src='/logo.svg'></img>
            </div>
            <div className='play-now-btn'>
                {/* {!account && <ConnectWallet
                    theme={lightTheme({
                        colors: {
                            accentText: "#fff",
                            // accentButtonBg: "#FB4EF1",
                            // primaryButtonBg: "#FB4EF1",
                            // modalBg: "#Ffffff",
                            // dropdownBg: "#Ffffff",
                        },
                    })}
                    // detailsBtn={() => {
                    // 	return (
                    // 		<button className="connect-wallet-btn-inner">
                    // 			Connected
                    // 		</button>
                    // 	);
                    // }}
                    btnTitle={"Connect Wallet"}
                    hideTestnetFaucet={false}
                    // switchToActiveChain={true}
                    modalSize={"wide"}
                    welcomeScreen={{
                    	// img: {
                    	// 	src: " https://beta.tesseractx.com/images/logo-light.svg ",
                    	// 	width: 333,
                    	// 	height: 150,
                    	// },
                    	title: "Join me on spinthebottle.ai – Powered by Polygon. ",
                    	// subtitle:
                    	// 	" Create, buy, sell, and trade digital assets securely.",
                    }}
                    modalTitleIconUrl={""}
                    className="play-btn btn"
                />} */}
                {
                    <button onClick={goToGame} className='play-btn btn'>
                        Play Now
                    </button>
                }
            </div>
        </div>

    );
};

export default Home;