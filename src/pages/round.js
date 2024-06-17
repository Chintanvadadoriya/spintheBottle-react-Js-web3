/** @format */

import Enter from '@/Components/Enter';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import { getHsitoryAction, getPlayerInfoAction, getRoundDetailsAction } from '@/redux/action/stackAction';
import { stakingState } from '@/redux/slice/stackSlice';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SpinTheBottle from '@/Components/SpinTheBottle';
import EventBus from '@/utils/event';
import { megaBonusamount, miniBonusamount, roundStart, superBonusamount } from '@/Contract';
import ConfettiExplosion from 'react-confetti-explosion';
import Timer from '@/Components/Timer';
import { ADDRESS_ZERO, TOTAL_PLAYER } from '@/constant';
import { ethers } from "ethers";
import { Axios, checkRoundData, formatAddress, fromWei } from '@/utils';
import Modal from 'react-modal';
import StaticWhell from '@/Components/StaticWhell';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function checkRoundDataWiseSetClass(round){
  switch (true) {
    case (round%1000 === 0) :
      return 'third';
    case (round%100 ===0):
      return 'second';
    case (round%10===0):
      return 'first';
    default:
      return '';
  }
}


const Round = () => {

    const [loading, setLoading] = useState(false);
    const [roundData, setRoundData] = useState();
    const [winningIndex, setWinnerIndex] = useState(0);
    const [winnerData, setWinnerData] = useState()
    const [yourData, setYourData] = useState()
    const router = useRouter();

    const { account } = useActiveWeb3React()

    useEffect(() => {
        if (!router.isReady) return;
        (async () => {
            try {
                setLoading(true);
                const { data } = await Axios.get('history/round', {
                    params: {
                        round: router.query.round
                    }
                });
                const winnerIndex = data?.data?.findIndex(ele => ele?.winner === true);
                console.log('data', data)
                console.log('winnerIndex', winnerIndex)
                const user = data?.data?.find(ele => ele.userAddresses == account?.toLowerCase());
                console.log('user', user)
                const winner = data?.data?.find(ele => ele?.winner === true)
                console.log('winner', winner)
                setWinnerData(winner)
                setYourData(user)
                setWinnerIndex(winnerIndex)
                setRoundData(data);
            } catch (err) {
                console.log('err', err)
            }
            finally {
                setLoading(false);
            }
        })()
    }, [router.isReady, account])


    return (
      <>
        
        <div className='game-three-block'>
          <div className='game-three-block-left'>
          <div className='back_btn'>
            <Link href='/history'>
                <svg width='12' height='20' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M11 1L1 10.3679L10.2146 19'
                    stroke='white'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                />
                </svg>
                <p>Back</p>
            </Link>
        </div>
            <div className='common-block-readius game-three-block-left-inner'>
              <div className='time-title'>
                <h4>Round {roundData?.roundData?.round}</h4>
              </div>
              <div className='puls-player-price'>
                <div className='puls-player-price-icon'>
                  <img src='/puls-icon-1.svg'></img>
                </div>
                <div className='puls-player-price-icon-text'>
                  <h5>{parseFloat(roundData?.roundData?.prize || 0).toFixed(3)}</h5>
                  <p>Prize Pool</p>
                </div>
                <div className='puls-player-price-icon-text'>
                  <h5>{roundData?.count || 0}/{TOTAL_PLAYER || 50}</h5>
                  <p>Players</p>
                </div>
              </div>
              <div className='puls-player-price'>
                <div className='puls-player-price-icon'>
                  <img src='/puls-icon-1.svg'></img>
                </div>
                <div className='puls-player-price-icon-text'>
                  <h5>{yourData?.stake || 0}</h5>
                  <p>Your Stake</p>
                </div>
                <div className='puls-player-price-icon-text'>
                  <h5>{parseFloat(yourData?.percentage || 0).toFixed(2)}%</h5>
                  <p>Your Win Chance</p>
                </div>
              </div>
            </div>
            <div className='player-list-left common-block-readius'>
              <h2>{roundData?.count ||  0} Players</h2>
              <div className='player-list-left-inner'>
                {(roundData?.data || []).map((player) => (
                  <div
                    className='player-list-left-inner-block common-block-readius'
                    style={{ borderRight: `8px solid ${player.color}` }}>
                    <h3>{player?.name || 'Player'}</h3>
                    <div className='player-list-left-icon'>
                      <div className='player-list-left-icon-flex'>
                        <img src='/puls-icon-1.svg'></img>
                      </div>
                      <p>
                        {player?.stake} <span>({player?.percentage?.toFixed(2)}%)</span>
                      </p>
                    </div>
                  </div>
                ))}
                <div className='down-arrow-block'>
                  <button>
                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g clip-path='url(#clip0_131_1422)'>
                        <path
                          d='M4.49547 9.23408L8.82387 12.6179C9.47563 13.1274 10.5285 13.1274 11.1803 12.6179L15.5086 9.23408C16.5615 8.411 15.8095 7 14.3221 7H5.66531C4.17794 7 3.44262 8.411 4.49547 9.23408Z'
                          fill='white'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_131_1422'>
                          <rect width='20' height='20' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='game-three-block-middle' style={{ position: 'relative' }}>
            <div className='block-game-bg'>
              {roundData?.data && (
                <StaticWhell
                  segments={roundData?.data}
                  totalStakes={roundData?.roundData?.prize}
                  winningSegmentIndex={winningIndex}>
                  {/* <div style={{textAlign: 'center', color: 'white'}}>
                                <img width={120} src={winnerData?.image || '/table-art.png'} />
                                <h3 style={{margin: '10px 0px'}}>{winnerData?.name}</h3>
                                <h3>{parseFloat(roundData?.roundData?.prize || 0).toFixed(4)}</h3>
                            </div> */}

                  <div className='block-winner-details diff-position-block'>
                    <div className='img-winner'>
                      <img src={winnerData?.image || '/table-art.png'}></img>
                      <div className='profile-frame-img'>
                        <img src='/winner-img-2.png'></img>
                      </div>
                    </div>
                    <h3>Winner!</h3>
                   {roundData?.roundData?.isBonus&& <h4 className={`bonus-${checkRoundDataWiseSetClass(roundData?.round)}-text`}>{checkRoundData(roundData?.round)}</h4>}


                    <p>{`${winnerData?.name || winnerData?.userAddresses && formatAddress(winnerData?.userAddresses) || ''}`}</p>
                    <div className='block-winner-details-text'>
                      <div className='puls-player-price-icon'>
                        <img src='/puls-icon-1.svg'></img>
                      </div>
                      <h2>
                        {`${parseFloat(roundData?.winnerPrice || 0).toFixed(2)}`} <span>MATIC</span>
                        {/* right now  we show roundData?.prize place of winnerData?.prize */}
                      </h2>
                    </div>
                  </div>
                </StaticWhell>
              )}
            </div>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff'
              }}></div>
          </div>
        </div>
      </>
    );
};

export default Round;
