/** @format */

import Enter from '@/Components/Enter';
import { SOCIAL_LINKS } from '@/constant';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import { getHsitoryAction, getPlayerInfoAction, getRoundDetailsAction } from '@/redux/action/stackAction';
import { stakingState } from '@/redux/slice/stackSlice';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

const Faq = () => {

  

  return (
    <>
      {/* {!isRunning && (
        <div
          style={{
            background: 'rgba(0,0,0,0.4)',
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            color: 'white'
          }}>
  
          <h1>{message}</h1>
        </div>
      )} */}
      {/* {!isRunning && <div className='game_end_message'>{message}</div>} */}
      <div className='faq-main common-block-readius'>
        <div className='faq-main-top'>
          <div className='back_btn'>
            <Link href='/'>
              <svg width='12' height='20' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11 1L1 10.3679L10.2146 19'
                  stroke='white'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'></path>
              </svg>
              <p>Back</p>
            </Link>
          </div>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className='data-faq-block'>
          <div className='data-faq-block-inner'>
            <h3>1. What the Hell is Spinthebottle.ai ?</h3>
            <p>
              Spinthebottle.ai is crypto's newest badass blockchain gaming platform, starting with the epic game, Spin
              The Bottle! It's like reliving those wild moments with Sophie in 10th grade, except now it's all about
              winning big and taking home the glory. And hey, stay tuned for more kickass games like Russian Roulette,
              Sumo, and a whole bunch more!
            </p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>2. Is Spinthebottle.ai Actually Fair ?</h3>
            <p>
              One hundred percent! We use smart contracts built on the Polygon blockchain, so there's no shady business.
              What's coded is set in stone, and you can even check out the nerdy details on polygonscan if that's your
              thing.
            </p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>3. How Does Spinthebottle.ai Pick Winners ?</h3>
            <p>
              We're all about random & fair wins, baby! Our smart contracts assisted by Chainlink VRF randomly pick
              winners based on their share of the prize pool. If your stake is 10% of the total prize pool, your win
              chance is 10% for that round. If it’s 25% of the prize pool, it’s 25%, and so on. No humans messing with
              the game, so it's pure, unadulterated fun.
            </p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>4. What’s the player cap ?</h3>
            <p>
              {/* Absolutely! No limits here. The more, the merrier, and the bigger the prize pool. It's a win-win for
              everyone ready to dive into the madness! */}
              We've got space for 50 players per round, so don't just twiddle your thumbs and miss out! The more, the
              merrier, and the juicier the prize pool. It's a win-win for anyone ready to dive into the madness!
            </p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>5. Will I Get My Winnings ?</h3>
            <p>
              We're not into shady business. Check out the proof on our "history" page. Your winnings are yours, and
              we've got the receipts to prove it.
            </p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>6. What's the Biggest Win ?</h3>
            <p>
              Sky's the limit, baby! Just like the Powerball, the more players, the crazier the prizes. It's all about
              who dares to play!
            </p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>7. Tell Me About Those Bonus Rounds !</h3>
            <p>
              Every 10th, 100th, and 1000th round, we spice things up with extra MATIC in the pot. Keep an eye on the
              bonus meter on the side of the game page, because that's where the real excitement kicks in!
            </p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>8. How Do I Dive Into the Madness ?</h3>
            <p>
            Easy peasy! Connect your wallet to Polygon, grab some MATIC and follow the instructions. Click, connect, customize your profile (or stay stealthy), and let the games begin!
            </p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>9. Can I Drag My Buddies into This ?</h3>
            <p>Hell yeah, you can! Click "Refer + Earn" and spread the word. The more, the merrier, right?</p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>10. What About Fees ?</h3>
            <p>We take a small cut (1%) to keep the lights on. The rest? Goes straight to the winner, baby!</p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>11. What's the Deal with the Affiliate Program ?</h3>
            <p>
              Get your hustle on with our affiliate program. Share your link, get your cut, and let the crypto flow!
              Plus, we've got the breakdown under the ‘Refer + Earn’ button or click <span><Link href='/refer-earn'>here</Link></span>, so you know exactly who's
              getting what.
            </p>
          </div>
          <div className='data-faq-block-inner'>
            <h3>12. How do I stay in the loop ?</h3>
            <p>
              Simple! We're spilling all the juicy deets on X, Discord, Telegram & Insta. Join us on one or all of those
              channels to catch the latest on giveaways, game updates, announcements, and more exclusive info!
            </p>
          </div>
        </div>
        <div className='faq-bottom'>
          <p>
            If you've got burning questions, want to chat about ads, collabs, careers, or just need some damn good
            advice, hit us up at <a href=''>hello@spinthebottle.ai!</a>
          </p>
          <ul>
            <li>
              <a href={SOCIAL_LINKS?.x} target='_blank'>
                <svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g clip-path='url(#clip0_388_223)'>
                    <g filter='url(#filter0_d_388_223)'>
                      <path
                        d='M37.0767 6H43.5168L29.4468 22.0983L46 44H33.0395L22.8895 30.715L11.273 44H4.8295L19.8795 26.7806L4 6.00175H17.2895L26.4648 18.1447L37.0767 6ZM34.8175 40.1427H38.3857L15.3505 9.65583H11.5215L34.8175 40.1427Z'
                        fill='#DADCDC'
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id='filter0_d_388_223'
                      x='-16'
                      y='-10'
                      width='82'
                      height='78'
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
                      <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_388_223' />
                      <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_388_223' result='shape' />
                    </filter>
                    <clipPath id='clip0_388_223'>
                      <rect width='50' height='50' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS?.discord} target='_blank'>
                <svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g filter='url(#filter0_d_388_222)'>
                    <path
                      d='M40.1459 11.103C37.3751 9.81129 34.3751 8.87379 31.2501 8.33213C31.2227 8.33125 31.1954 8.33639 31.1702 8.34719C31.145 8.35799 31.1225 8.37418 31.1042 8.39463C30.7292 9.08213 30.2917 9.97796 30.0001 10.6655C26.6855 10.1655 23.3147 10.1655 20.0001 10.6655C19.7084 9.95713 19.2709 9.08213 18.8751 8.39463C18.8542 8.35296 18.7917 8.33213 18.7292 8.33213C15.6042 8.87379 12.6251 9.81129 9.83341 11.103C9.81258 11.103 9.79175 11.1238 9.77092 11.1446C4.10425 19.6238 2.54175 27.8738 3.31258 36.0405C3.31258 36.0821 3.33341 36.1238 3.37508 36.1446C7.12508 38.8946 10.7292 40.5613 14.2917 41.6655C14.3542 41.6863 14.4167 41.6655 14.4376 41.6238C15.2709 40.478 16.0209 39.2696 16.6667 37.9988C16.7084 37.9155 16.6667 37.8321 16.5834 37.8113C15.3959 37.353 14.2709 36.8113 13.1667 36.1863C13.0834 36.1446 13.0834 36.0196 13.1459 35.9571C13.3751 35.7905 13.6042 35.603 13.8334 35.4363C13.8751 35.3946 13.9376 35.3946 13.9792 35.4155C21.1459 38.6863 28.8751 38.6863 35.9584 35.4155C36.0001 35.3946 36.0626 35.3946 36.1042 35.4363C36.3334 35.6238 36.5626 35.7905 36.7917 35.978C36.8751 36.0405 36.8751 36.1655 36.7709 36.2071C35.6876 36.853 34.5417 37.3738 33.3542 37.8321C33.2709 37.853 33.2501 37.9571 33.2709 38.0196C33.9376 39.2905 34.6876 40.4988 35.5001 41.6446C35.5626 41.6655 35.6251 41.6863 35.6876 41.6655C39.2709 40.5613 42.8751 38.8946 46.6251 36.1446C46.6667 36.1238 46.6876 36.0821 46.6876 36.0405C47.6042 26.603 45.1667 18.4155 40.2292 11.1446C40.2084 11.1238 40.1876 11.103 40.1459 11.103ZM17.7501 31.0613C15.6042 31.0613 13.8126 29.0821 13.8126 26.6446C13.8126 24.2071 15.5626 22.228 17.7501 22.228C19.9584 22.228 21.7084 24.228 21.6876 26.6446C21.6876 29.0821 19.9376 31.0613 17.7501 31.0613ZM32.2709 31.0613C30.1251 31.0613 28.3334 29.0821 28.3334 26.6446C28.3334 24.2071 30.0834 22.228 32.2709 22.228C34.4792 22.228 36.2292 24.228 36.2084 26.6446C36.2084 29.0821 34.4792 31.0613 32.2709 31.0613Z'
                      fill='#DADCDC'
                    />
                  </g>
                  <defs>
                    <filter
                      id='filter0_d_388_222'
                      x='-16.8711'
                      y='-7.66797'
                      width='83.7488'
                      height='73.3418'
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
                      <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_388_222' />
                      <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_388_222' result='shape' />
                    </filter>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS?.telegram} target='_blank'>
                <svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M33.5709 19.3558C34.7209 18.2058 35.8625 15.5225 31.0709 18.7808C26.5947 21.8614 22.0883 24.8977 17.5521 27.8892C16.8614 28.2015 16.1146 28.371 15.3567 28.3875C14.5988 28.404 13.8454 28.2671 13.1417 27.985C10.2667 27.1225 6.91045 25.9725 6.91045 25.9725C6.91045 25.9725 4.61878 24.5329 8.5417 22.9996C8.5417 22.9996 25.1271 16.1933 30.8792 13.7954C33.0834 12.8371 40.5605 9.77043 40.5605 9.77043C40.5605 9.77043 44.0125 8.42668 43.725 11.6871C43.6292 13.0288 42.8625 17.7288 42.0959 22.8079C40.9438 29.9975 39.698 37.86 39.698 37.86C39.698 37.86 39.5063 40.0642 37.8771 40.4475C36.1331 40.418 34.4481 39.8114 33.0855 38.7225C32.7021 38.435 25.8959 34.1204 23.4021 32.0121C23.1484 31.8403 22.9424 31.607 22.803 31.3342C22.6637 31.0613 22.5956 30.7576 22.6052 30.4513C22.6148 30.1451 22.7016 29.8462 22.8577 29.5826C23.0138 29.3189 23.2341 29.099 23.498 28.9433C26.9183 25.814 30.2766 22.6176 33.5709 19.3558Z'
                    fill='white'
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS?.insta} target='_blank'>
                <svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M36.1251 11.3753C35.6306 11.3753 35.1473 11.5219 34.7362 11.7967C34.325 12.0714 34.0046 12.4618 33.8154 12.9186C33.6262 13.3754 33.5767 13.8781 33.6731 14.3631C33.7696 14.848 34.0077 15.2935 34.3573 15.6431C34.7069 15.9927 35.1524 16.2308 35.6374 16.3273C36.1223 16.4238 36.625 16.3742 37.0818 16.185C37.5386 15.9958 37.9291 15.6754 38.2038 15.2643C38.4785 14.8531 38.6251 14.3698 38.6251 13.8753C38.6251 13.2123 38.3617 12.5764 37.8928 12.1076C37.424 11.6387 36.7881 11.3753 36.1251 11.3753ZM45.7084 16.417C45.6679 14.6884 45.3442 12.9782 44.7501 11.3545C44.2204 9.96519 43.3959 8.70716 42.3334 7.66699C41.3018 6.59913 40.0408 5.77986 38.6459 5.27116C37.0265 4.65899 35.3144 4.32785 33.5834 4.29199C31.3751 4.16699 30.6667 4.16699 25.0001 4.16699C19.3334 4.16699 18.6251 4.16699 16.4167 4.29199C14.6858 4.32785 12.9737 4.65899 11.3542 5.27116C9.96191 5.78501 8.70203 6.60358 7.66675 7.66699C6.59889 8.69861 5.77962 9.95958 5.27091 11.3545C4.65875 12.974 4.3276 14.6861 4.29175 16.417C4.16675 18.6253 4.16675 19.3337 4.16675 25.0003C4.16675 30.667 4.16675 31.3753 4.29175 33.5837C4.3276 35.3146 4.65875 37.0267 5.27091 38.6462C5.77962 40.0411 6.59889 41.302 7.66675 42.3337C8.70203 43.3971 9.96191 44.2156 11.3542 44.7295C12.9737 45.3417 14.6858 45.6728 16.4167 45.7087C18.6251 45.8337 19.3334 45.8337 25.0001 45.8337C30.6667 45.8337 31.3751 45.8337 33.5834 45.7087C35.3144 45.6728 37.0265 45.3417 38.6459 44.7295C40.0408 44.2208 41.3018 43.4015 42.3334 42.3337C43.4006 41.2974 44.2258 40.0382 44.7501 38.6462C45.3442 37.0224 45.6679 35.3122 45.7084 33.5837C45.7084 31.3753 45.8334 30.667 45.8334 25.0003C45.8334 19.3337 45.8334 18.6253 45.7084 16.417ZM41.9584 33.3337C41.9432 34.6561 41.7037 35.9664 41.2501 37.2087C40.9174 38.1153 40.3832 38.9345 39.6876 39.6045C39.0118 40.293 38.1943 40.8262 37.2917 41.167C36.0495 41.6206 34.7392 41.8602 33.4168 41.8753C31.3334 41.9795 30.5626 42.0003 25.0834 42.0003C19.6042 42.0003 18.8334 42.0003 16.7501 41.8753C15.3769 41.901 14.0097 41.6896 12.7084 41.2503C11.8455 40.8922 11.0654 40.3603 10.4167 39.6878C9.72527 39.0186 9.19767 38.1986 8.87508 37.292C8.36645 36.0319 8.08434 34.6919 8.04175 33.3337C8.04175 31.2503 7.91675 30.4795 7.91675 25.0003C7.91675 19.5212 7.91675 18.7503 8.04175 16.667C8.05109 15.315 8.29789 13.9752 8.77092 12.7087C9.13768 11.8293 9.70063 11.0454 10.4167 10.417C11.0497 9.70068 11.8319 9.13178 12.7084 8.75033C13.9783 8.29208 15.3167 8.05257 16.6667 8.04199C18.7501 8.04199 19.5209 7.91699 25.0001 7.91699C30.4792 7.91699 31.2501 7.91699 33.3334 8.04199C34.6559 8.05716 35.9661 8.29667 37.2084 8.75033C38.1551 9.10169 39.0049 9.67292 39.6876 10.417C40.3703 11.0569 40.9038 11.8394 41.2501 12.7087C41.7131 13.9773 41.9528 15.3165 41.9584 16.667C42.0626 18.7503 42.0834 19.5212 42.0834 25.0003C42.0834 30.4795 42.0626 31.2503 41.9584 33.3337ZM25.0001 14.3128C22.8872 14.3169 20.8229 14.9473 19.0681 16.1241C17.3133 17.301 15.9467 18.9716 15.141 20.9248C14.3353 22.8781 14.1266 25.0263 14.5413 27.0981C14.956 29.1699 15.9756 31.0723 17.4711 32.5649C18.9666 34.0575 20.8709 35.0733 22.9435 35.484C25.0161 35.8947 27.164 35.6818 29.1156 34.8723C31.0673 34.0628 32.7352 32.6929 33.9087 30.9358C35.0821 29.1787 35.7084 27.1132 35.7084 25.0003C35.7112 23.5943 35.4359 22.2016 34.8985 20.9023C34.3611 19.603 33.5721 18.4228 32.5769 17.4296C31.5817 16.4364 30.4 15.6497 29.0997 15.1148C27.7993 14.5799 26.4061 14.3073 25.0001 14.3128ZM25.0001 31.9378C23.628 31.9378 22.2867 31.531 21.1458 30.7686C20.0049 30.0063 19.1158 28.9229 18.5907 27.6552C18.0656 26.3875 17.9282 24.9926 18.1959 23.6469C18.4636 22.3011 19.1243 21.065 20.0945 20.0948C21.0648 19.1245 22.3009 18.4638 23.6466 18.1961C24.9924 17.9284 26.3873 18.0658 27.6549 18.5909C28.9226 19.116 30.0061 20.0052 30.7684 21.1461C31.5307 22.2869 31.9376 23.6282 31.9376 25.0003C31.9376 25.9114 31.7581 26.8135 31.4095 27.6552C31.0609 28.4969 30.5498 29.2617 29.9056 29.9059C29.2614 30.5501 28.4966 31.0611 27.6549 31.4097C26.8133 31.7584 25.9111 31.9378 25.0001 31.9378Z'
                    fill='white'
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Faq;
