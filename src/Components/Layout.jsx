import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { getPlayerInfoAction, getRoundDetailsAction, getUserAction } from "@/redux/action/stackAction";
import { CommonBlockMain, CommonPageFull, HeaderMain, ChatBlock } from "@/styles/common.style";
import { ConnectWallet, lightTheme } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { setAllowanceValue, stakingState } from "@/redux/slice/stackSlice";
import { TwitterShareButton } from "react-share";
import ChatBot from "./ChatBot";
import { CONTRACT_AADDRESS, SOCIAL_LINKS } from "@/constant";

const Layout = ({ children }) => {
	const { account, chainId, status,library } = useActiveWeb3React();
  const { user, loading,allowance } = useSelector(stakingState);
  const textareaRef = useRef(null);
	const router = useRouter();

	const dispatch = useDispatch();
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [chatBot, setChatBot] = React.useState(false);


	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	useEffect(() => {
		if (status === "connected" && account && chainId) {

			const payload = {
				address: account?.toLowerCase()
			}

			if (router.query?.refrelCode) {
				payload.refrelCode = router.query?.refrelCode;
			}
       
			dispatch(getUserAction(payload))
      
		}

		else if (status === "disconnected") { }
	}, [status, chainId, account, router.isReady]);


  // const copyToClipboard = async (text) => {
  //   console.log('text', text)
  //   try {
  //     await navigator?.clipboard?.writeText(text);
  //     navigator.clipboard.writeText
  //     toast.success("Link copied!"); // You can replace this with a more sophisticated feedback mechanism
  //   } catch (err) {
  //     console.error("Failed to copy", err);
  //   }
  // };



  // function copyToClipboard(text) {
  //   navigator.clipboard.writeText(text)
  //     .then(() => {
  //       // Clipboard successfully copied
  //       console.log('Text copied to clipboard:', text);
  //       toast.success("Link copied!");
  //       // Optionally, you can show a success message or perform any other action here
  //     })
  //     .catch(error => {
  //       // Clipboard copy failed
  //       console.error('Failed to copy text to clipboard:', error);
  //       // toast.error("Failed to copy");
  //       // Optionally, you can show an error message or perform any other action here
  //     });
  // }

  const copyToClipboard = (text) => {
    console.log('textareaRef', textareaRef)
    textareaRef.current.value = text;
    console.log('textareaRef after', textareaRef.current)
    textareaRef.current.select();

    try {
      const success = document.execCommand('copy');
      console.log('success', success)
      toast.success("Link copied!");
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
    }
  };
  
function handleOpenChatBot(){
  setChatBot(!chatBot)
}


	return (
    <>
      <Toaster
        position='top-center'
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 }
        }}
      />
      <CommonBlockMain className='height-auto'>
        <HeaderMain>
          <div className='header-main'>
            <div className='header-left-block'>
              <ul>
                <li>
                  <Link href='/'>
                    <svg width='350' height='405' viewBox='0 0 350 405' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g clip-path='url(#clip0_131_57)'>
                        <path d='M282.142 198.556V263.933L175 157.648L282.142 198.556Z' fill='#70EFFC' />
                        <path d='M350 237.728V303.104L282.142 263.932V198.556L350 237.728Z' fill='#4EE1F9' />
                        <path
                          d='M350 303.104L292.184 336.484H292.175L175 404.141V325.79L224.326 297.312L282.142 263.932L350 303.104Z'
                          fill='#05A7D3'
                        />
                        <path d='M175 325.79V404.141L67.8577 263.932L175 325.79Z' fill='#057EC1' />
                        <path d='M67.8577 263.932L175 404.141L0 303.104L67.8577 263.932Z' fill='#0462A3' />
                        <path d='M350 101.037L282.142 140.208L175 0L350 101.037Z' fill='#2E97ED' />
                        <path d='M175 0L282.142 140.208L175 78.3508V0Z' fill='#297ED3' />
                        <path
                          d='M175 0V78.3508L124.473 107.525L67.8577 140.208L0 101.037L56.6149 68.3536L175 0Z'
                          fill='#0E52A5'
                        />
                        <path d='M67.8577 140.208V206.977L0 167.798V101.037L67.8577 140.208Z' fill='#033277' />
                        <path d='M67.8577 140.208L168.425 253.336L67.8577 206.977V140.208Z' fill='#021A56' />
                      </g>
                      <defs>
                        <clipPath id='clip0_131_57'>
                          <rect width='350' height='404.141' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </li>

                <li>
                  <a href={SOCIAL_LINKS?.discord} target="_blank">
                    <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g clip-path='url(#clip0_131_41)'>
                        <g filter='url(#filter0_d_131_41)'>
                          <path
                            d='M48.1752 13.3241C44.8502 11.7741 41.2502 10.6491 37.5002 9.99914C37.4673 9.99809 37.4346 10.0043 37.4044 10.0172C37.3741 10.0302 37.3471 10.0496 37.3252 10.0741C36.8752 10.8991 36.3502 11.9741 36.0002 12.7991C32.0227 12.1991 27.9777 12.1991 24.0002 12.7991C23.6502 11.9491 23.1252 10.8991 22.6502 10.0741C22.6252 10.0241 22.5502 9.99914 22.4752 9.99914C18.7252 10.6491 15.1502 11.7741 11.8002 13.3241C11.7752 13.3241 11.7502 13.3491 11.7252 13.3741C4.92517 23.5491 3.05017 33.4491 3.97517 43.2491C3.97517 43.2991 4.00017 43.3491 4.05017 43.3741C8.55017 46.6741 12.8752 48.6741 17.1502 49.9991C17.2252 50.0241 17.3002 49.9991 17.3252 49.9491C18.3252 48.5741 19.2252 47.1241 20.0002 45.5991C20.0502 45.4991 20.0002 45.3991 19.9002 45.3741C18.4752 44.8241 17.1252 44.1741 15.8002 43.4241C15.7002 43.3741 15.7002 43.2241 15.7752 43.1491C16.0502 42.9491 16.3252 42.7241 16.6002 42.5241C16.6502 42.4741 16.7252 42.4741 16.7752 42.4991C25.3752 46.4241 34.6502 46.4241 43.1502 42.4991C43.2002 42.4741 43.2752 42.4741 43.3252 42.5241C43.6002 42.7491 43.8752 42.9491 44.1502 43.1741C44.2502 43.2491 44.2502 43.3991 44.1252 43.4491C42.8252 44.2241 41.4502 44.8491 40.0252 45.3991C39.9252 45.4241 39.9002 45.5491 39.9252 45.6241C40.7252 47.1491 41.6252 48.5991 42.6002 49.9741C42.6752 49.9991 42.7502 50.0241 42.8252 49.9991C47.1252 48.6741 51.4502 46.6741 55.9502 43.3741C56.0002 43.3491 56.0252 43.2991 56.0252 43.2491C57.1252 31.9241 54.2002 22.0991 48.2752 13.3741C48.2502 13.3491 48.2252 13.3241 48.1752 13.3241ZM21.3002 37.2741C18.7252 37.2741 16.5752 34.8991 16.5752 31.9741C16.5752 29.0491 18.6752 26.6741 21.3002 26.6741C23.9502 26.6741 26.0502 29.0741 26.0252 31.9741C26.0252 34.8991 23.9252 37.2741 21.3002 37.2741ZM38.7252 37.2741C36.1502 37.2741 34.0002 34.8991 34.0002 31.9741C34.0002 29.0491 36.1002 26.6741 38.7252 26.6741C41.3752 26.6741 43.4752 29.0741 43.4502 31.9741C43.4502 34.8991 41.3752 37.2741 38.7252 37.2741Z'
                            fill='white'
                          />
                        </g>
                      </g>
                      <defs>
                        <filter
                          id='filter0_d_131_41'
                          x='-16.2452'
                          y='-6.00098'
                          width='92.4985'
                          height='80.0105'
                          filterUnits='userSpaceOnUse'
                          color-interpolation-filters='sRGB'>
                          <feFlood flood-opacity='0' result='BackgroundImageFix' />
                          <feColorMatrix
                            in='SourceAlpha'
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            result='hardAlpha'
                          />
                          <feOffset dy='4' />
                          <feGaussianBlur stdDeviation='10' />
                          <feComposite in2='hardAlpha' operator='out' />
                          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0' />
                          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_131_41' />
                          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_131_41' result='shape' />
                        </filter>
                        <clipPath id='clip0_131_41'>
                          <rect width='60' height='60' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href={SOCIAL_LINKS?.x} target="_blank">
                    <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g clip-path='url(#clip0_131_43)'>
                        <g filter='url(#filter0_d_131_43)'>
                          <path
                            d='M44.4921 7.20001H52.2201L35.3362 26.5179L55.2001 52.8H39.6474L27.4674 36.858L13.5276 52.8H5.79545L23.8555 32.1368L4.80005 7.20211H20.7474L31.7577 21.7736L44.4921 7.20001ZM41.7811 48.1713H46.063L18.4206 11.587H13.8258L41.7811 48.1713Z'
                            fill='white'
                          />
                        </g>
                      </g>
                      <defs>
                        <filter
                          id='filter0_d_131_43'
                          x='-15.2'
                          y='-8.79999'
                          width='90.4'
                          height='85.6'
                          filterUnits='userSpaceOnUse'
                          color-interpolation-filters='sRGB'>
                          <feFlood flood-opacity='0' result='BackgroundImageFix' />
                          <feColorMatrix
                            in='SourceAlpha'
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            result='hardAlpha'
                          />
                          <feOffset dy='4' />
                          <feGaussianBlur stdDeviation='10' />
                          <feComposite in2='hardAlpha' operator='out' />
                          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0' />
                          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_131_43' />
                          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_131_43' result='shape' />
                        </filter>
                        <clipPath id='clip0_131_43'>
                          <rect width='60' height='60' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className='header-middle-block'>
              <Link href=''>
                <img src='/logo-text.svg'></img>
              </Link>
            </div>
          </div>
          <div className='header-right'>
            <Link href='/history' className='common-btn btn' style={{ marginRight: '20px', textDecoration: 'none' }}>
              HISTORY
            </Link>
            {/* <Link href='/chat' className='common-btn btn' style={{ marginRight: '20px', textDecoration: 'none' }}>
              CHAT
            </Link> */}
            {account && (
              <>
                <Link
                  href='/profile'
                  className='common-btn btn'
                  style={{ marginRight: '20px', textDecoration: 'none' }}>
                  PROFILE
                </Link>
                {/* <Link href='/game' className='common-btn btn' style={{ marginRight: '20px', textDecoration: 'none' }}>
                  Game
                </Link> */}
              </>
            )}
            <Link
              href=''
              className='common-btn btn'
              style={{ marginRight: '20px', textDecoration: 'none' }}
              onClick={openModal}>
              REFER + EARN
            </Link>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel='Example Modal'
              className='modal-common-block'>
              <div className='modal-common-block-title'>
                {/* <h2>Referrals</h2> */}
                <h2> REFER + EARN</h2>
                <button onClick={closeModal}>
                  <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M22.2397 20L32.3197 9.91995C32.9597 9.27995 32.9597 8.31995 32.3197 7.67995C31.6797 7.03995 30.7197 7.03995 30.0797 7.67995L19.9997 17.76L9.91971 7.67995C9.27971 7.03995 8.31971 7.03995 7.67971 7.67995C7.03971 8.31995 7.03971 9.27995 7.67971 9.91995L17.7597 20L7.67971 30.08C7.35971 30.4 7.19971 30.72 7.19971 31.2C7.19971 32.16 7.83971 32.8 8.79971 32.8C9.27971 32.8 9.59971 32.64 9.91971 32.32L19.9997 22.24L30.0797 32.32C30.3997 32.64 30.7197 32.8 31.1997 32.8C31.6797 32.8 31.9997 32.64 32.3197 32.32C32.9597 31.68 32.9597 30.72 32.3197 30.08L22.2397 20Z'
                      fill='#393939'
                    />
                  </svg>
                </button>
              </div>
              <div className='modal-middle-section input-form-control'>
                <p>Refer a friend to earn 10% of their first win.</p>
                <div className={account ? 'form-group no-coonect-btn' : 'form-group'}>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Connect to view'
                    value={account && user?.refrelUrl}
                    ref={textareaRef}
                  />
                  <div className='btn-copy-twitter'>
                    {account && (
                      // <button  className='btn-common diff-btn-position' onClick={() => copyToClipboard(user?.refrelUrl)}>
                      //   <svg viewBox='0 0 32 32' focusable='false' class='chakra-icon css-1duu6o0' aria-hidden='true'>
                      //     <path
                      //       fill-rule='evenodd'
                      //       clip-rule='evenodd'
                      //       d='M5 19H7V5H21V3H7C5.89589 3.0011 5.0011 3.89589 5 5V19ZM20.377 7.578L26.435 13.699C26.7959 14.0671 26.9986 14.5616 27 15.077V28C26.9989 29.1041 26.1041 29.9989 25 30H11C9.89589 29.9989 9.0011 29.1041 9 28V9C9.0011 7.89589 9.89589 7.0011 11 7H18.998C19.5162 7.00167 20.0125 7.20966 20.377 7.578ZM19 9.02999L24.924 15H19V9.02999ZM11 9V28H25.001L25 17H19C17.8959 16.9989 17.0011 16.1041 17 15V9H11Z'
                      //       fill='currentColor'></path>
                      //   </svg>
                      // </button>
                      <button className='btn-common diff-btn-position' onClick={() => copyToClipboard(user?.refrelUrl)}>
                        <svg viewBox='0 0 32 32' focusable='false' class='chakra-icon css-1duu6o0' aria-hidden='true'>
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M5 19H7V5H21V3H7C5.89589 3.0011 5.0011 3.89589 5 5V19ZM20.377 7.578L26.435 13.699C26.7959 14.0671 26.9986 14.5616 27 15.077V28C26.9989 29.1041 26.1041 29.9989 25 30H11C9.89589 29.9989 9.0011 29.1041 9 28V9C9.0011 7.89589 9.89589 7.0011 11 7H18.998C19.5162 7.00167 20.0125 7.20966 20.377 7.578ZM19 9.02999L24.924 15H19V9.02999ZM11 9V28H25.001L25 17H19C17.8959 16.9989 17.0011 16.1041 17 15V9H11Z'
                            fill='currentColor'></path>
                        </svg>
                      </button>
                    )}
                    <button className='btn-common'>
             
                      <TwitterShareButton
                        title={`Join me on #spinthebottleai — Wager your $MATIC,  spin the bottle and turn your gains into tax free wins!\nLink: ${user?.refrelUrl}\n#BlockchainGaming`}
                        url={` `}
                        // hashtags={[`BlockchainGaming`]}
                        style={{width:"100%",height:"100%"}}
                        >
                        <svg viewBox='0 0 20 20' focusable='false' class='chakra-icon css-1duu6o0' aria-hidden='true'>
                          <path
                            d='M14.3134 3.125H16.6135L11.5884 8.94936L17.5 16.875H12.8713L9.24593 12.0681L5.09769 16.875H2.7962L8.17098 10.6452L2.5 3.125H7.24621L10.5232 7.51865L14.3134 3.125ZM13.5061 15.4788H14.7806L6.55368 4.44782H5.186L13.5061 15.4788Z'
                            fill='currentColor'></path>
                        </svg>
                      </TwitterShareButton>
                     

                    </button>
                    <Link className='btn-common ' href='/refer-earn' onClick={closeModal}>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='50px' height='50px'>
                        <path d='M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z' />
                      </svg>
                    </Link>
                  </div>

                  {!account && (
                    <button className='btn-connect'>
                      <ConnectWallet
                        theme={lightTheme({
                          colors: {
                            accentText: '#fff'
                          }
                        })}
                        btnTitle={'Connect Wallet'}
                        style={{
                          backgroundColor: '#fff',
                          color: 'black'
                        }}
                      />
                    </button>
                  )}
                </div>
              </div>
              {/* <div className='modal-footer-block'>
                <button className='common-btn'>Learn More</button>
              </div> */}
            </Modal>

            {router.pathname === '/' ? (
              <Link href='/faq'>
                <button className='common-btn btn'>FAQ</button>
              </Link>
            ) : (
              <ConnectWallet
                theme={lightTheme({
                  colors: {
                    accentText: '#fff'
                  }
                })}
                switchToActiveChain={true}
                btnTitle={'Connect Wallet'}
                hideTestnetFaucet={false}
                modalSize={'wide'}
                welcomeScreen={{
                  img: {
                    src: './spinBottle.png',
                    width: 335,
                    height: 210
                  },
                  // title: "Join me on spinthebottle.ai – Powered by Polygon. "
                  title:"Connect to spinthebottle.ai – Powered by Polygon."
                }}
                showThirdwebBranding={false}
                modalTitleIconUrl={''}
                className='common-btn btn'
              />
            )}
          </div>
        </HeaderMain>
        <CommonPageFull>{children}</CommonPageFull>
        {
          <ChatBlock>
            <div className='chat-block-icon'>
              <Link href=''>
                <div onClick={handleOpenChatBot}>
                  <img src='/chat-svgrepo-com.svg'></img>
                </div>
              </Link>
            </div>
            {chatBot && (
              <>
                <div className='close-icon-main'>
                  <Link href=''>
                    <div onClick={handleOpenChatBot}>
                      <img src='/close-svgrepo-com.svg'></img>
                    </div>
                  </Link>
                </div>
                <div className='chat-block-open'>
                  {/* <div className='chat-block-main'> */}
                  {/* <div className='chat-block-top'>
                <img src='/table-art.png' alt='Table Art' />
                <h3>Name Here</h3>
              </div> */}
                  {/* <div className='chat-block-middle'>
                <div className='chat-left-block'>
                  <img src='/table-art.png' alt='Avatar' />
                  <h3>Hello</h3>
                </div>
                <div className='chat-right-block'>
                  <h3>Hello</h3>
                </div>
              </div> */}
                  <ChatBot />
                  {/* <div className='chat-block-bottom'>
                <div className='chat-block-bottom-inner'>
                  <div className='form-group'>
                    <textarea className='form-control' placeholder='Type Something........'></textarea>
                  </div>
                  <button>
                    <svg width='31' height='30' viewBox='0 0 31 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M25.3604 9.25956L11.3401 2.23195C1.90002 -2.47644 -1.9576 1.38117 2.76244 10.8096L4.84858 14.9702L2.76244 19.1308C-1.9576 28.5593 1.91167 32.4285 11.3401 27.7085L25.3604 20.7042C31.6421 17.5458 31.6537 12.4062 25.3604 9.25956V9.25956ZM19.4632 15.9026L10.5826 15.9259C10.2329 15.9259 9.92991 15.786 9.70847 15.5646C9.48704 15.3432 9.34719 15.0401 9.34719 14.6905C9.34912 14.3635 9.47989 14.0504 9.71115 13.8191C9.94241 13.5879 10.2555 13.4571 10.5826 13.4551L19.4632 13.4318C20.1392 13.4318 20.6986 13.9912 20.6986 14.6672C20.6986 15.3432 20.1392 15.9026 19.4632 15.9026Z'
                        fill='#393939'
                      />
                    </svg>
                  </button>
                </div>
              </div> */}
                </div>
              </>
            )}
            {/* </div> */}
          </ChatBlock>
        }
      </CommonBlockMain>
    </>
  );
};

export default Layout;
