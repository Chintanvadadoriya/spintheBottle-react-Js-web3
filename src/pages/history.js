/** @format */

import { getHsitoryAction } from '@/redux/action/stackAction';
import { stakingState } from '@/redux/slice/stackSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import moment from 'moment';
import { BLOCK_EXPLORAER_URL } from '@/constant';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import { TwitterShareButton } from 'react-share';
import { ADDRESS_ZERO, showLastSixDegitAddress } from '@/utils';



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

const History = () => {
  const { account } = useActiveWeb3React();

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    totalPages,
    count,
    pageNo,
    reset,
    hasMore,
    history,
    user,
    loading
  } = useSelector(stakingState);


  const [search, setSearch] = useState('Completed')
  const [yourWins , setYourWins] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [order, setOrder] = useState('desc')

  
  function handleSort(fieldType) {
    if (sortBy === fieldType) {
      setOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortBy(fieldType);
      setOrder('asc'); // Set to ascending order when sorting a different field
    }
  }

  const getData = (reset = false) => {
    dispatch(getHsitoryAction({
      reset,
      search,
      address:yourWins?.toLowerCase(),
      sortBy:sortBy,
      order:order
    }))
  }

  useEffect(() => {
    if (!search) return
    getData(true)
  }, [search]);

  useEffect(() => {
    if (!sortBy) return
    getData(true)
  }, [sortBy,order]);

  function handleShowYourWins(){
    setYourWins(account)
    setSearch('yourWins')
  }

  const goToRoundHistory = (round) => {
    router.push({
      pathname: '/round',
      query: {
        round
      }
    })
  }

  
  // console.log('history', history)
  return (

    <div className='table-history-block common-block-readius'>
      <div className='back_btn'>
          <Link href='/game'>
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
      <div className='table-history-block-top'>
        <div className='table-history-block-top-left'>
          {/* <Link href='/game'>
            <svg width='12' height='20' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11 1L1 10.3679L10.2146 19'
                stroke='white'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
            <p>Current Round</p>
          </Link> */}
        </div>
        <div className='table-history-block-top-right'>
          <div className='button-table-history'>
            <button onClick={() => {setSearch('All'),setYourWins('')}} className={search === 'All' ? 'active' : ''}>All</button>
          </div>
          <div className='button-table-history'>
            <button onClick={() => {setSearch('Completed'),setYourWins('')}} className={search === 'Completed' ? 'active' : ''}>Completed</button>
          </div>
          <div className='button-table-history'>
            <button onClick={() => {setSearch('Cancelled'),setYourWins('')}} className={search === 'Cancelled' ? 'active' : ''}>Cancelled</button>
          </div>
        {account &&  <div className='button-table-history'>
            <button onClick={handleShowYourWins} className={search === 'yourWins' ? 'active' : ''}>Your Wins</button>
          </div>}
        </div>
      </div>
      
      <div className='table-history'>
        <InfiniteScroll
          next={getData}
          dataLength={history?.length || 0}
          // hasMore={
          // 	currentChainId
          // 		? data.length
          // 			? hasMore
          // 			: false
          // 		: false
          // }
          hasMore={totalPages >= pageNo}
          // scrollThreshold={0.7}
          loader={
            <h4 style={{ textAlign: "center", color: 'white' }}>
              Loading...
            </h4>
          }
        >
          <table cellpadding='0' cellspacing='0'>
            {history?.length > 0 &&
              <thead>
               
              <tr>
                <th className={`round-th-block ${sortBy === 'round' && order === 'asc' ? 'toggle-slide-th' : ''}`}>
                  <span>Round</span>
                  <span className='round-th-span' onClick={() => handleSort('round', order)}>
                    <svg viewBox="0 0 32 32" focusable="false" class="chakra-icon">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16 10L26 20L24.6 21.4L16 12.8L7.4 21.4L6 20L16 10Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </th>
                <th className='round-th-block'><span className='winner-text'>Winner</span></th>
                <th className={`round-th-block ${sortBy === 'prizepool' && order === 'asc' ? 'toggle-slide-th' : ''}`}>
                  <span>Prize pool</span>
                  <span className='round-th-span' onClick={() => handleSort('prizepool', order)}>
                    <svg viewBox="0 0 32 32" focusable="false" class="chakra-icon">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16 10L26 20L24.6 21.4L16 12.8L7.4 21.4L6 20L16 10Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </th>
                <th className='round-th-block'><span className='winner-text'>Winner's Stake</span></th>
                <th className={`round-th-block ${sortBy === 'winPercentage' && order === 'asc' ? 'toggle-slide-th' : ''}`}>
                  <span>
                  Payout
                  </span>
                  <span className='round-th-span' onClick={() => handleSort('winPercentage', order)}>
                    <svg viewBox="0 0 32 32" focusable="false" class="chakra-icon">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16 10L26 20L24.6 21.4L16 12.8L7.4 21.4L6 20L16 10Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </th>
                <th className={`round-th-block ${sortBy === 'playersCount' && order === 'asc' ? 'toggle-slide-th' : ''}`}>
                  <span>Players</span>
                  <span className='round-th-span' onClick={() => handleSort('playersCount', order)}>
                    <svg viewBox="0 0 32 32" focusable="false" class="chakra-icon">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16 10L26 20L24.6 21.4L16 12.8L7.4 21.4L6 20L16 10Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </th>
                <th className='round-th-block'><span className='winner-text'>Time/Date</span></th>
                <th className='round-th-block'><span className='winner-text'>TxHash</span></th>
                {yourWins && <th className='round-th-block'><span className='winner-text'>Share</span></th>}
              </tr>

              </thead>
            }
            <tbody>
              {history.map((ele,index) => (
                <tr key={index} >
                  <td onClick={() => goToRoundHistory(ele?.round)} className={`bonus-${checkRoundDataWiseSetClass(ele?.round)}-text`}>{(ele?.round)}</td>
                  <td onClick={() => goToRoundHistory(ele?.round)}>
                    <div className='winner-img-td'>
                      <img src={ele?.image || '/table-art.png'}></img>
                      <p>{ ele?.address !== ADDRESS_ZERO ? ele?.name:"Cancelled"}</p>
                    </div>
                  </td>
                  <td onClick={() => goToRoundHistory(ele?.round)}>
                    <div className='profile-img-plus-chain'>
                      <div className='profile-img-plus-chain-icon'>
                        <img src='/puls-icon-1.svg'></img>
                      </div>
                      <p>{parseFloat(ele?.prizepool || 0).toFixed(2)}</p>
                    </div>
                  </td>
                  <td onClick={() => goToRoundHistory(ele?.round)}>
                    <div className='profile-img-plus-chain'>
                      <div className='profile-img-plus-chain-icon'>
                        <img src='../../../puls-icon-1.svg'></img>
                      </div>
                      <p>
                        {parseFloat(ele?.playerStack || 0).toFixed(2)} <span>({parseFloat(ele?.playerPercentage || 0).toFixed(2)}%)</span>
                      </p>
                    </div>
                  </td>
                  <td onClick={() => goToRoundHistory(ele?.round)}>{`${parseFloat(ele?.winPercentage).toFixed(2)==(0.9900000000000001).toFixed(2) ? (1).toFixed(2):parseFloat(ele?.winPercentage).toFixed(2)}X`}</td>
                  <td onClick={() => goToRoundHistory(ele?.round)}>{`${ele?.playersCount}`}</td>
                  <td onClick={() => goToRoundHistory(ele?.round)}>{ele?.createdTimestamp?moment.unix(ele?.createdTimestamp).format('H:mm, D MMM, YYYY'):moment(ele?.createdAt).format('H:mm, D MMM, YYYY')}</td>
                  <td>
                    <a target='_blank' href={`${BLOCK_EXPLORAER_URL}${ele?.hash}`}>
                      <svg width='16' height='14' viewBox='0 0 16 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M5.95657 8.73669C6.03365 8.73661 6.10954 8.71759 6.17755 8.6813C6.24555 8.64501 6.3036 8.59256 6.34657 8.52856C6.35563 8.51419 7.30094 7.11575 8.41563 6.66356C9.09605 6.40345 9.82411 6.29137 10.5513 6.33481V7.93294C10.5514 8.02403 10.578 8.11312 10.6279 8.18931C10.6778 8.2655 10.7489 8.3255 10.8324 8.36196C10.9158 8.39843 11.0081 8.40978 11.0979 8.39464C11.1878 8.37949 11.2712 8.33851 11.3381 8.27669L14.9669 4.92231C15.0142 4.87843 15.052 4.82525 15.0778 4.7661C15.1036 4.70695 15.1169 4.6431 15.1169 4.57856C15.1169 4.51402 15.1036 4.45017 15.0778 4.39102C15.052 4.33187 15.0142 4.27869 14.9669 4.23481L11.3381 0.878873C11.2712 0.817053 11.1878 0.776064 11.0979 0.760919C11.0081 0.745774 10.9158 0.757129 10.8324 0.793594C10.7489 0.83006 10.6778 0.890057 10.6279 0.966251C10.578 1.04244 10.5514 1.13153 10.5513 1.22262V2.792C8.02219 2.95419 5.48876 4.45544 5.48876 8.26794C5.48876 8.39226 5.53814 8.51148 5.62605 8.59939C5.71396 8.6873 5.83319 8.73669 5.95751 8.73669H5.95657ZM13.9566 4.57794L11.4878 6.86106V5.9095C11.4878 5.7991 11.4489 5.69223 11.3778 5.60773C11.3068 5.52324 11.2082 5.46654 11.0994 5.44762C10.0741 5.30431 9.02927 5.42377 8.06282 5.79481C7.51414 6.03731 7.01519 6.37945 6.59126 6.80387C7.30188 3.96294 10.0825 3.71481 11.0194 3.71481C11.1437 3.71481 11.2629 3.66543 11.3508 3.57752C11.4387 3.48961 11.4881 3.37038 11.4881 3.24606V2.29481L13.9566 4.57794Z'
                          fill='white'
                        />
                        <path
                          d='M1.3522 13.2459H14.4709C14.5953 13.2459 14.7145 13.1966 14.8024 13.1086C14.8903 13.0207 14.9397 12.9015 14.9397 12.7772V7.5975C14.9397 7.47318 14.8903 7.35395 14.8024 7.26604C14.7145 7.17814 14.5953 7.12875 14.4709 7.12875C14.3466 7.12875 14.2274 7.17814 14.1395 7.26604C14.0516 7.35395 14.0022 7.47318 14.0022 7.5975V12.3084H1.82095V1.89062H8.36376C8.48808 1.89062 8.60731 1.84124 8.69522 1.75333C8.78312 1.66542 8.83251 1.5462 8.83251 1.42188C8.83251 1.29755 8.78312 1.17833 8.69522 1.09042C8.60731 1.00251 8.48808 0.953125 8.36376 0.953125H1.3522C1.22788 0.953125 1.10865 1.00251 1.02074 1.09042C0.932833 1.17833 0.883448 1.29755 0.883448 1.42188V12.7772C0.883448 12.9015 0.932833 13.0207 1.02074 13.1086C1.10865 13.1966 1.22788 13.2459 1.3522 13.2459Z'
                          fill='white'
                        />
                      </svg>
                    </a>
                  </td>
                  <td>

                  {yourWins &&<button className='history__share_btn'>
                    <TwitterShareButton
                        title={`Join me on #spinthebottleai — Wager your $MATIC, spin the bottle and turn your gains into tax free wins! \nRound ${ele?.round}: I won ${parseFloat(ele?.winPercentage).toFixed(2)}X!\nLink: ${user.refrelUrl}\n#BlockchainGaming`}
                        url={` `}
                        style={{width:"100%",height:"100%"}}
                        >
                        <svg viewBox='0 0 20 20' focusable='false' class='chakra-icon css-1duu6o0' aria-hidden='true'>
                          <path
                            d='M14.3134 3.125H16.6135L11.5884 8.94936L17.5 16.875H12.8713L9.24593 12.0681L5.09769 16.875H2.7962L8.17098 10.6452L2.5 3.125H7.24621L10.5232 7.51865L14.3134 3.125ZM13.5061 15.4788H14.7806L6.55368 4.44782H5.186L13.5061 15.4788Z'
                            fill='currentColor'></path>
                        </svg>
                      </TwitterShareButton>
                  </button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>

  );
};

export default History;
