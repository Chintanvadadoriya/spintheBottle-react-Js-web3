/** @format */

import Enter from '@/Components/Enter';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import { getHsitoryAction, getPlayerInfoAction, getRoundDetailsAction } from '@/redux/action/stackAction';
import { stakingState } from '@/redux/slice/stackSlice';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

const playersT1=[
  {"Player": "Player 1", "Stake": "$34.00"},
  {"Player": "Player 2", "Stake": "$28.00"},
  {"Player": "Player 3", "Stake": "$90.00"},
  {"Player": "Player 4", "Stake": "$100.00"},
  {"Player": "Player 5", "Stake": "$240.00"},
  {"Player": "Steve", "Stake": "$170.00"},
  {"Player": "Player 7", "Stake": "$39.00"},
  {"Player": "Player 8", "Stake": "$54.00"},
  {"Player": "Player 9", "Stake": "$221.00"},
  {"Player": "Player 10", "Stake": "$87.00"},
  {"Player": "Player 11", "Stake": "$92.00"},
  {"Player": "Player 12", "Stake": "$80.00"},
  {"Player": "Player 13", "Stake": "$54.00"}
]

const playersT2=[
  {"Player": "Player 1", "Stake": "$23.00"},
  {"Player": "Player 2", "Stake": "$43.00"},
  {"Player": "Player 3", "Stake": "$400.00"},
  {"Player": "Player 4", "Stake": "$55.00"},
  {"Player": "Player 5", "Stake": "$71.00"},
  {"Player": "Player 6", "Stake": "$203.00"},
  {"Player": "Player 7", "Stake": "$190.00"},
  {"Player": "Player 8", "Stake": "$300.00"},
  {"Player": "Player 9", "Stake": "$78.00"},
  {"Player": "Player 10", "Stake": "$61.00"},
  {"Player": "Player 11", "Stake": "$27.00"},
  {"Player": "Player 12", "Stake": "$49.00"},
  {"Player": "Steve", "Stake": "$210.00"},
  {"Player": "Player 14", "Stake": "$130.00"},
  {"Player": "Player 15", "Stake": "$27.00"}
]


const Referearn = () => {

  

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
          <h2>Refer + Earn Example</h2>
        </div>
        <div className='data-faq-block'>
          <div className='data-refer-block'>
            <ul>
              <li>
              John sets up an affiliate link through his wallet and posts the affiliate link on his social media.
              </li>
              <li>
              Steve clicks on John's affiliate link and is taken to spinthebottle.ai where he connects his wallet and begins playing.
              </li>
              <li>
               As Steve clicked through John's affiliate link to connect his wallet to the game, John is entitled to 10% of Steve's first win.
              </li>
              <li>
              After several games, Steve wins a game and the games result is as follows:
              </li>
            </ul>
            <div className='table-custom-block'>
              <div className='table-custom-block-left'>
                <div className='table-custom-block-left-inner'>
                  <table>
                    <thead>
                      <tr>
                        <th>Player no.</th>
                        <th>Stake ($USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        playersT1?.map((data)=>{
                          return(
                          <tr>
                            <td>{data?.Player ==='Steve'?<span>{data?.Player}</span>:data?.Player}</td>
                            <td>{data?.Player ==='Steve'?<span>{data?.Stake}</span>:data?.Stake}</td>

                          </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
                <div className='table-custom-block-left-inner pad-none-block'>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Total Prize Pool</td>
                        <td>$1,289.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='table-custom-block-right'>
                <div className='table-custom-block-right-inner pad-none-block'>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span>Steve’s</span> winnings</td>
                        <td>$1,147.21</td>
                        <td>89.00%</td>
                      </tr>
                      <tr>
                        <td>John's referral fee</td>
                        <td>$128.90</td>
                        <td>10.00%</td>
                      </tr>
                      <tr>
                        <td>Game Fee</td>
                        <td>$ 12.89</td>
                        <td>1.00%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <ul>
              <li>
              As John received 10% of Steve's first win. His affiliate link with Steve has now subsided and John is no longer entitled to any of Steve's future winnings.
              </li>
              <li>
              Steve then plays several more games and is lucky enough that he 
              wins again. The games result is as follows:
              </li>
            </ul>
            <div className='table-custom-block'>
              <div className='table-custom-block-left'>
                <div className='table-custom-block-left-inner'>
                  <table>
                    <thead>
                      <tr>
                        <th>Player no.</th>
                        <th>Stake ($USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        playersT2?.map((data)=>{
                          return(
                          <tr>
                            <td>{data?.Player ==='Steve'?<span>{data?.Player}</span>:data?.Player}</td>
                            <td>{data?.Player ==='Steve'?<span>{data?.Stake}</span>:data?.Stake}</td>

                          </tr>
                          )
                        })
                      }
                      
                    </tbody>
                  </table>
                </div>
                <div className='table-custom-block-left-inner pad-none-block'>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Total Prize Pool</td>
                        <td>$ 1,925.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='table-custom-block-right'>
                <div className='table-custom-block-right-inner pad-none-block'>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span>Steve’s</span> winnings</td>
                        <td>$ 1,905.75</td>
                        <td>99.00%</td>
                      </tr>
                      <tr>
                        <td>John's referral fee</td>
                        <td>$ 0.00</td>
                        <td>0.00%</td>
                      </tr>
                      <tr>
                        <td>Game Fee</td>
                        <td>$ 19.25</td>
                        <td>1.00%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Referearn;
