/** @format */

import Enter from '@/Components/Enter';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import { getEthToUsdPrice, getHsitoryAction, getPlayerInfoAction, getRoundDetailsAction } from '@/redux/action/stackAction';
import { stakingState } from '@/redux/slice/stackSlice';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SpinTheBottle from '@/Components/SpinTheBottle';
import EventBus from '@/utils/event';
import { megaBonusamount, miniBonusamount, roundNumber, roundStart, superBonusamount } from '@/Contract';
import ConfettiExplosion from 'react-confetti-explosion';
import Timer from '@/Components/Timer';
import { ADDRESS_ZERO, TOTAL_PLAYER } from '@/constant';
import { ethers } from "ethers";
import { fromWei, showLastSixDegitAddress } from '@/utils';
import Modal from 'react-modal';
import { useSocket } from '@/Components/SocketProvider';
import toast from 'react-hot-toast';


const TimerLeft = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = (endTime * 1000) - now;
    return Math.max(0, Math.floor(difference / 1000));
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };
    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

  return timeLeft
};


function formatEtherValue(etherString) {
  const parts = etherString.split('.');
  if (parts.length < 2) return etherString; // No decimal part to format
  const decimalPart = parts[1].replace(/0+$/, ''); // Remove trailing zeros from the decimal part
  if (decimalPart === '') return parts[0]; // If there's nothing left after removing zeros, return the integer part
  return `${parts[0]}.${decimalPart}`; // Reassemble the formatted number
}

const roundFunc = {
  mini: miniBonusamount,
  mega: megaBonusamount,
  super: superBonusamount,
}

// const BonusAmount = ({ name, round,bonus,isbonus,adjust }) => {
//   round=adjust ? round += adjust:round
//   const [amount, setAmount] = useState(0)
//   useEffect(() => {
//     (async () => {
//       try {
//         if(!round) return;
//         if (isbonus) {
//           console.log("is bonus round!")
//           let bonusAmount;
      
//           if (name === 'super' && round % 1000 === 0) {
//               bonusAmount = bonus;
//           }
//           if (name === 'mega' && round % 100 === 0) {
//               bonusAmount = bonus;
//           }
//           if (name === 'mini' && round % 10 === 0) {
//               bonusAmount = bonus;
//           }
      
//           if (bonusAmount) {
//               setAmount(ethers.utils.formatEther(bonusAmount));
//               return;
//           }
//       }

//         const result = await roundFunc[name]();
//         const converted = fromWei(result);
//         setAmount(formatEtherValue(converted))
//       } catch (err) {
//         console.log('err', err)
//       }
//     })()
//   }, [round,adjust])
//   return ((+amount)?.toFixed(5))
// }

const BonusAmount = ({ name, round,bonus,isbonus,adjust }) => {
  round=adjust ? round += adjust:round
  const [amount, setAmount] = useState(0)
  // isbonus=true;
  // bonus=1152660615132996
  // round=2590
  useEffect(() => {
    (async () => {
      try {
        if(!round) return;

        if (isbonus) {
          console.log("is bonus round!")
          let bonusAmount=0;
      
          if (name === 'super' && round % 1000 === 0) {
              bonusAmount = bonus;
          }else if (name === 'mega' && round % 100 === 0) {
              bonusAmount = bonus;
          }else if (name === 'mini' && round % 10 === 0) {
              bonusAmount = bonus;
          }else{
            bonusAmount = await roundFunc[name]();
          }
          const converted = fromWei(bonusAmount);
          console.log('converted in bonus', converted)
          setAmount(formatEtherValue(converted))
        
        }else{
          const result = await roundFunc[name]();
          const converted = fromWei(result);
          // console.log('converted', converted)
          setAmount(formatEtherValue(converted))
        }

      
      } catch (err) {
        console.log('err', err)
      }
    })()
  }, [round,adjust])
  return ((+amount)?.toFixed(5))
}

const BonusRound = ({ round, repeat,adjust }) => {
  
  const [roundNo, setRoundNo] = useState()
  useEffect(() => {
    if(!round) return;
    let result = round % repeat === 0 ? round + repeat : Math.ceil(round / repeat) * repeat;
    result += adjust; // adjust the round based on props passed down from parent
    setRoundNo(result);
  }, [round,repeat, adjust])
  return roundNo
}

const Game = () => {

  const dispatch = useDispatch();
  const { account, library } = useActiveWeb3React();
  const { players, roundData, bonusRounds,usdVlaue } = useSelector(stakingState);
  const spinTheBottleRef = useRef(null); // Ref for the SpinTheBottle component

  const { socket } = useSocket()
  const [miniAdjust, setMiniAdjust] = useState(0);
  const [megaAdjust, setMegaAdjust] = useState(0);
  const [superAdjust, setSuperAdjust] = useState(0);

  const getAndSetTime = async (library) => {
    try {
      const time = await roundStart(library);
      setTime(time + 121)
    } catch (err) {
      console.log('err', err)
    }
  }


  const [time, setTime] = useState();
  const [isExploding, setIsExploding] = useState(false);
  const [winner, setWinner] = useState();
  const [isRunning, setIsRunning] = useState(true);
  const [winnerData, setWinnerData] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = useState('Round Closed');
  const [ethPrice, setEthPrice] = useState(0);
  const [isEntry, setEntry] = useState(true);

  // const [bonusName, setActiveBonus] = useState();


  // const [extendPlayer, setExtendPlayer] = useState({
  //   players:3,
  //   extend:false
  // });
  const [extendPlayer, setExtendPlayer] = useState(false);
  const [userCountLive, setUserCountLive] = useState(0);


  function openModal() {
    if(!account) return toast.error('Please connect your wallet');
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
 function showMorePlayer(){
  setExtendPlayer(!extendPlayer)

  }

  // useEffect(() => {

  //   // const savedState = sessionStorage.getItem('spinState');
  //   // if(savedState) return;
  //   if (!account) return;
  //   dispatch(getRoundDetailsAction({ account }));
  //   dispatch(getPlayerInfoAction({ account }))
  // }, [account]);

  useEffect(() => {
    dispatch(getRoundDetailsAction({ account }));
    dispatch(getPlayerInfoAction({ account }))
  }, [account]);

  useEffect(() => {
    if (!library) return;
    getAndSetTime(library)
  }, [library])


  useEffect(() => {
    if (!roundData?.start) return;
    setTime(roundData?.start + 1);
    setIsRunning(roundData?.isRuondRunning)
  }, [roundData])

  // Show "Round Closed" message
  useEffect(() => {
    let timeoutId;

    if (!isRunning) {
      // Show "Round Closed" for 10 seconds, then show "Spinning the bottle"
      timeoutId = setTimeout(() => {
        setMessage(players?.length === 0 ? 'Round cancelled' :'Spinning the bottle...');
        
      }, 5000); // 20 seconds in milliseconds
     setEntry(true);
    }else{
      setMessage('Round Closed');
      setEntry(true);

    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRunning]);

  const notifyNewRoundStarted = (data) => {
    // setTime(data?.start)
    // getAndSetTime(library)
    console.log('dataNew RoundStartted', data)
  }

  const notifyWinner = async (data) => {
    setWinner(data)
  }

  const handleWinner = async (data) => {
    console.log('notify winner', data)
    console.log('notifyWinnerplayers', players)
    setIsRunning(true);
    if (data?.address === ADDRESS_ZERO) {
      dispatch(getRoundDetailsAction({ account }));
      dispatch(getPlayerInfoAction({ account }));
      dispatch(getHsitoryAction());
      // getAndSetTime(library)
      return;
    }
    if (spinTheBottleRef.current) {
      const winningPlayerIndex = players?.findIndex(user => user?.userAddresses === data.address);
      const winData = players?.find(user => user?.userAddresses === data?.address);
      setWinnerData(winData);
      console.log('winningPlayerIndex', winningPlayerIndex)
      spinTheBottleRef.current.spinBottle(winningPlayerIndex); // Call a method on the child component

    }
  }

  function playerEnter(data) {
    console.log('playerEnter', data)
    dispatch(getRoundDetailsAction({ round: data?.round, account }));
    dispatch(getPlayerInfoAction({ round: data?.round }))
  }


  useEffect(() => {
    if (!winner?.round) return;
    handleWinner(winner)
  }, [winner])

  const userCount = (count) => {
    console.log('userCount1612199',count)
    setUserCountLive(count)
  
}
  useEffect(() => {
    if (!socket) return;
    socket?.on("userCount",userCount);
    socket.on("PlayerEnter", playerEnter);
    socket.on("WinnerSelected", notifyWinner);
    socket.on("NewRoundStarted", notifyNewRoundStarted);
    socket.on("RoundClose", roundClose);

    return () => {
      socket.off("WinnerSelected", notifyWinner);
      socket.off("NewRoundStarted", notifyNewRoundStarted);
      socket.off("RoundClose", roundClose);
      socket.off("PlayerEnter", playerEnter)
      socket?.off("userCount",userCount);

    };
  }, [socket]); // Empty dependency array ensures this runs once on mount and cleanup on unmount


  function roundClose() {
    setIsRunning(false);
  }

  // const totalStakes = initialPlayers.reduce((sum, player) => sum + player.stake, 0);
  // const playersWithAngles = useMemo(() => calculatePlayerAngles(palyers, roundData?.prize), [palyers])

  // const spinBottle = async (player) => {
  //   console.log('player', player)

  //   if (!players.length) return;

  //   console.log('players', players)
  //   const winningPlayer = players?.find(user => user?.userAddresses === player.address);

  //   console.log('winningPlayer', winningPlayer)
  //   // Choose a random angle within the winning segment
  //   const angleWithinSegment = Math.random() * (winningPlayer.endAngle - winningPlayer.startAngle) + winningPlayer.startAngle;
  //   // Convert to degrees, ensure full spins, and adjust for SVG rotation
  //   const finalAngle = ((angleWithinSegment * (180 / Math.PI)) + 1440 - (rotation % 360)) % 360;
  //   setRotation(rotation + finalAngle + 1440); // Ensure multiple spins
  //   await new Promise((res) => setTimeout(res, 5000))

  //   console.log('winningPlayer', winningPlayer)
  // };



  const handleSpinEnd = async (data) => {
    setIsExploding(true)
    await new Promise((res) => setTimeout(res, 3000))
    dispatch(getRoundDetailsAction({ account }));
    dispatch(getPlayerInfoAction({ account }));
    dispatch(getHsitoryAction());
    setEthPrice(0);
    setEntry(true);
    // getAndSetTime(library)
    setIsExploding(false)
  }

  const [activeBonus, setActiveBonus] = useState({
    miniRound: null,
    megaRound: null,
    superRound: null,

  });


  useEffect(() => {
    setActiveBonus({
      miniRound: getCurrentActiveBonus('mini', roundData?.round, 10),
      megaRound: getCurrentActiveBonus('mega', roundData?.round, 100),
      superRound: getCurrentActiveBonus('super', roundData?.round, 1000),
      
    });
    dispatch(getEthToUsdPrice())
  }, [roundData]);
  
  
  function getCurrentActiveBonus(name, round, repeat) {
    let result = null;
    result = round % repeat === 0 ? round + repeat : Math.ceil(round / repeat) * repeat;
    return result;
  }

  function getCurrentAnimationClass(currentRound) {

    switch (true) {
      case (currentRound%1000 === 0) :
        return 'third';
      case (currentRound%100 ===0):
        return 'second';
      case (currentRound%10===0):
        return 'first';
      default:
        return '';
    }
  }

  function getCurrentRoundAnimationClass(){
    let data =getCurrentAnimationClass(roundData?.round)
    return data
  }

  
  useEffect(() => {
    if(!roundData?.round) return 
    let {round}=roundData
    // round=2000
  
    let mini = roundData ? (round % 10 === 0 ? round + 10 : Math.ceil(round / 10) * 10) : null;
    let mega = roundData ? (round % 100 === 0 ? round + 100 : Math.ceil(round / 100) * 100) : null;
    let superRound = roundData ? (round % 1000 === 0 ? round + 1000 : Math.ceil(round / 1000) * 1000) : null;

  
    // switch (true) {
    //   case mini === mega && mega === superRound:
    //     setMiniAdjust(10);
    //     setMegaAdjust(100);
    //     break;
    //   case mini=== mega:
    //     setMiniAdjust(10);
    //     setMegaAdjust(0);
    //     break;
    //   case mega === superRound:
    //     setMegaAdjust(100);
    //     break;
    //   default:
    //     setMiniAdjust(0);
    //     setMegaAdjust(0);
    //     setSuperAdjust(0);
    //     break;
    // }
    const adjustStates = () => {
      if (mini === mega && mega === superRound) {
        setMiniAdjust(10);
        setMegaAdjust(100);
        setSuperAdjust(0); // Assuming you might need to reset or adjust this as well
      } else if (mini === mega) {
        setMiniAdjust(10);
        setMegaAdjust(0);
        setSuperAdjust(0); // Reset or adjust this as needed
      } else if (mega === superRound) {
        setMiniAdjust(0); // Reset this if needed
        setMegaAdjust(100);
        setSuperAdjust(0); // Reset or adjust this as needed
      } else {
        setMiniAdjust(0);
        setMegaAdjust(0);
        setSuperAdjust(0);
      }
    };
    
    // Ensuring values are current by wrapping in a function
    adjustStates();
  }, [roundData?.round]); // Re-evaluate when roundData changes
  
  // console.log('miniAdjust,megaAdjust,SuperAdjust', miniAdjust,megaAdjust,superAdjust)
  const fetchEthPrice = async () => {
    try {
        setEthPrice(`${parseFloat(usdVlaue * roundData?.prize).toFixed(2)}`);
    } catch (error) {
        console.error('There was a problem fetching the ETH price in Game page:', error);
        setEthPrice('Failed to load');
    }
};

useEffect(() => {
    if (!roundData?.prize) return;
    
    fetchEthPrice();
}, [roundData?.prize]);

  
let MiniBonusA = +BonusAmount({ name: 'mini', round: roundData?.round, bonus: roundData?.bonusPrize, isbonus: roundData?.isBonus, adjust: miniAdjust }) || 0.000;
let MegaBonusA = +BonusAmount({ name: 'mega', round: roundData?.round, bonus: roundData?.bonusPrize, isbonus: roundData?.isBonus, adjust: megaAdjust }) || 0.000;
let SuperBonusA = +BonusAmount({ name: 'super', round: roundData?.round, bonus: roundData?.bonusPrize, isbonus: roundData?.isBonus, adjust: superAdjust })|| 0.000;

// let MiniBonusA=0.01407;
// let MegaBonusA=0.01407;
// let SuperBonusA=0.013541

let TimeCheck = +TimerLeft({endTime:time});



console.log("888",miniAdjust,megaAdjust,superAdjust)
console.log('999', MiniBonusA,MegaBonusA,SuperBonusA)



console.log('isopen !isRunning || !isEntr',modalIsOpen, !isRunning , !isEntry)
console.log("getCurrentRoundAnimationClass()",getCurrentRoundAnimationClass(),'first',getCurrentRoundAnimationClass() === 'first')
console.log('roundData', roundData,roundData?.round)
console.log('usdVlaueGame', usdVlaue)


function calculateMiniBonusValue(miniBonusA, miniAdjust, fromWeiValue, bonusRound) {
  const animationClass = getCurrentAnimationClass(bonusRound);

  if (animationClass === 'third' || animationClass === 'second') {
      return "0.000";
  } else if (animationClass === 'first') {
    return (+fromWei(fromWeiValue)).toFixed(3);
  } else if (miniAdjust === 10) {
      return "0.000";
  } else {
      return (+miniBonusA).toFixed(3);
  }
}


function calculateMegaBonus(superBonusA, megaBonusA, miniBonusA, megaAdjust, miniAdjust, fromWeiValue, bonusRound) {
  const animationClass = getCurrentAnimationClass(bonusRound);

  if (animationClass === 'third') {
      return "0.000";
  } else if (animationClass === 'second') {
     return (+fromWei(fromWeiValue)).toFixed(3);;
  } else if (megaAdjust === 100) {
      return "0.000";
  } else if (miniAdjust === 10) {
      if (animationClass === 'first') {
          return (+megaBonusA).toFixed(3);
      } else {
          return (+megaBonusA + +miniBonusA).toFixed(3);
      }
  } else {
      return (+megaBonusA).toFixed(3);
  }
}


function calculateSuperBonus(superBonusA, megaBonusA, miniBonusA, megaAdjust, miniAdjust, fromWeiValue, bonusRound) {
  const animationClass = getCurrentAnimationClass(bonusRound);
  const superBonus = parseFloat(superBonusA);
  const megaBonus = parseFloat(megaBonusA);
  const miniBonus = parseFloat(miniBonusA);

  if (animationClass === 'third') {
    return (+fromWei(fromWeiValue)).toFixed(3);
  }

  if (megaAdjust === 100) {
      if (miniAdjust === 10) {
          if (animationClass === 'first') {
              return (superBonus + megaBonus).toFixed(3);
          }else if (animationClass === 'second') {
            return (+superBonus).toFixed(3);
          }else{
            return (superBonus + megaBonus + miniBonus).toFixed(3);
          } 
      } 
      if (animationClass === 'second') {
        return (+superBonus).toFixed(3);
    } else {
        return(superBonus + megaBonus).toFixed(3);
    }
      
  }else {
    return superBonus.toFixed(3);
}

}

  return (
    <>
      <div className='game-three-block'>
        <div className='game-three-block-left'>
          <div className='common-block-readius game-three-block-left-inner'>
            <div className='time-title'>
              <h4>Round {roundData?.round}</h4>
              {time && <Timer endTime={time}/>}
            </div>
            <div className='puls-player-price'>
              <div className='puls-player-price-icon'>
                <img src='/puls-icon-1.svg'></img>
              </div>
              <div className='puls-player-price-icon-text'>
                <h5>{parseFloat(roundData?.prize || 0).toFixed(3)}</h5>
                <p>Prize Pool</p>
              </div>
              <div className='puls-player-price-icon-text'>
                <div>
                  <h5>
                    {roundData?.players || 0}/{TOTAL_PLAYER || 50}
                  </h5>
                  <p>Players</p>
                </div>
              </div>
            </div>
            <div className='puls-player-price'>
              <div className='puls-player-price-icon'>
                <img src='/puls-icon-1.svg'></img>
              </div>
              <div className='puls-player-price-icon-text'>
                <h5>{parseFloat(roundData?.yourStack || 0).toFixed(3)}</h5>
                <p>Your Stake</p>
              </div>
              <div className='puls-player-price-icon-text'>
                <h5>{parseFloat(roundData?.yourWinnigChance || 0).toFixed(2)}%</h5>
                <p>Your Win Chance</p>
              </div>
            </div>
          </div>
          <div
            className={`player-list-left player-list-left-scroll common-block-readius ${
              extendPlayer ? 'show-content' : ''
            }`}>
            <div className='usercount_live'>
              <h2>{roundData?.players} Players</h2>
              <h2>
                {userCountLive || roundData?.userCount || 0} <span>Watching</span>
              </h2>
            </div>
            <div className={`player-list-left-inner`}>
              <div className='player-list-left-inner-scroll'>
                {players?.map((player) => {
                  return (
                    <div
                      className={`player-list-left-inner-block common-block-readius`}
                      style={{ borderRight: `8px solid ${player.color}` }}>
                      <h3>{player?.name}</h3>
                      <div className='player-list-left-icon'>
                        <div className='player-list-left-icon-flex'>
                          <img src='/puls-icon-1.svg'></img>
                        </div>
                        <p>
                          {parseFloat(player?.stake || 0).toFixed(3)} <span>({player?.percentage?.toFixed(2)}%)</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='down-arrow-block' onClick={showMorePlayer}>
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
          {
            <>
              <div className='block-game-bg'>
                {!isRunning && <div className={`game_end_message ${message==='Spinning the bottle...'?'fleshing_spin_the_botle':''}`}>{message}</div>}
                <SpinTheBottle
                  ref={spinTheBottleRef}
                  segments={players}
                  onSpinEnd={handleSpinEnd}
                  totalStakes={roundData?.prize || 0}>
                  <>
                    {isExploding && winnerData && (
                      // <div style={{ textAlign: 'center', color: 'white' }}>
                      //   <img width={120} src={winnerData?.image || '/table-art.png'} />
                      //   <h3 style={{ margin: '10px 0px' }}>{`${winnerData?.name} test--`}</h3>
                      //   <h3>{`${winnerData?.prize} Test----`}</h3>
                      // </div>

                      <div className='block-winner-details'>
                        <div className='img-winner'>
                          <img src={winnerData?.image || '/table-art.png'}></img>
                          <div className='profile-frame-img'>
                            <img src='/winner-img-2.png'></img>
                          </div>
                        </div>
                        <h3>Winner!!</h3>
                        <p>{`${winnerData?.name}`}</p>
                        <div className='block-winner-details-text'>
                          <div className='puls-player-price-icon'>
                            <img src='/puls-icon-1.svg'></img>
                          </div>
                          <h2>
                            {`${parseFloat(roundData?.prize || 0).toFixed(2)}`} <span>MATIC</span>
                            {/* right now  we show roundData?.prize place of winnerData?.prize */}
                          </h2>
                        </div>
                      </div>
                    )}
                    {isExploding && winnerData && (
                      <ConfettiExplosion
                        force={0.8}
                        duration={3000}
                        particleCount={250}
                        width={1600}
                        style={{ position: 'absolute', top: '50%', left: '50%' }}
                      />
                    )}
                  </>
                </SpinTheBottle>
              </div>
              <div className='text-block-spin common-block-readius'>
                <h2>
                  {parseFloat(roundData?.prize || 0).toFixed(3)} <span>MATIC</span>
                </h2>
                <p>
                  ${ethPrice || 0} <span>USD</span>
                </p>
              </div>
            </>
          }
        </div>
        <div className='game-three-block-right'>
          <div className='game-three-block-right-inner common-block-readius'>
            <div
              className={`bonus-block-inner common-block-readius bonus-block-inner-${
                getCurrentRoundAnimationClass() === 'first' ? 'first' : ''
              }`}>
              <h2 className={`${getCurrentRoundAnimationClass() === 'first' ? 'bonus-first-text' : 'first-text'}`}>
                MINI BONUS
              </h2>
              <div className='bonus-block-icon'>
                <div className='bonus-block-icon-inner'>
                  <img src='/puls-icon-1.svg'></img>
                </div>
                <h2>
                {calculateMiniBonusValue(MiniBonusA, miniAdjust, roundData?.bonusPrize, roundData?.round)}
                </h2>
              </div>
              <p className={`${getCurrentRoundAnimationClass() === 'first' ? 'remove-text-active-bonus' : ''}`}>
                Next Game : Round <BonusRound round={roundData?.round} repeat={10} name='mini' adjust={miniAdjust} />
              </p>
            </div>
            <div
              className={`bonus-block-inner common-block-readius bonus-block-inner-${
                getCurrentRoundAnimationClass() === 'second' ? 'second' : ''
              }`}>
              <h2 className={`${getCurrentRoundAnimationClass() === 'second' ? 'bonus-second-text' : 'second-text'}`}>
                MEGA BONUS
              </h2>
              <div className='bonus-block-icon'>
                <div className='bonus-block-icon-inner'>
                  <img src='/puls-icon-1.svg'></img>
                </div>
                <h2>
                {calculateMegaBonus(SuperBonusA, MegaBonusA, MiniBonusA, megaAdjust, miniAdjust, roundData?.bonusPrize, roundData?.round)}
                </h2>
              </div>
              <p className={`${getCurrentRoundAnimationClass() === 'second' ? 'remove-text-active-bonus' : ''}`}>
                Next Game : Round <BonusRound round={roundData?.round} repeat={100} name='mega' adjust={megaAdjust} />
              </p>
            </div>
            <div
              className={`bonus-block-inner common-block-readius bonus-block-inner-${
                getCurrentRoundAnimationClass() === 'third' ? 'third' : ''
              }`}>
              <h2 className={`${getCurrentRoundAnimationClass() === 'third' ? 'bonus-third-text' : 'third-text'}`}>
                Super BONUS
              </h2>
              <div className='bonus-block-icon'>
                <div className='bonus-block-icon-inner'>
                  <img src='/puls-icon-1.svg'></img>
                </div>
                <h2>
               
                  {calculateSuperBonus(SuperBonusA, MegaBonusA, MiniBonusA, megaAdjust, miniAdjust, roundData?.bonusPrize, roundData?.round)}
                </h2>
              </div>
              <p className={`${getCurrentRoundAnimationClass() === 'third' ? 'remove-text-active-bonus' : ''}`}>
                Next Game : Round{' '}
                <BonusRound round={roundData?.round} repeat={1000} name='Super' adjust={superAdjust} />
              </p>
            </div>
            <div className='enter-now-btn'>
              <button className='enter-now-btn btn-common' onClick={openModal} disabled={!isRunning || TimeCheck < 10 }>
                Enter now
              </button>

              <Enter modalIsOpen={modalIsOpen} closeModal={closeModal} isRunning={isRunning} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
