import { Allowance, approveToken, enter, toWei } from '@/Contract';
import { CONTRACT_AADDRESS } from '@/constant';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import { setAllowanceValue, stakingState } from '@/redux/slice/stackSlice';
import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';


const Enter = ({ modalIsOpen, closeModal, isRunning }) => {
    const { account, library, balance } = useActiveWeb3React();
  const {allowance,usdVlaue } = useSelector(stakingState);


    const [amount, setAmount] = useState(5);
    const [loading, setLoading] = useState(false);
    const [ethPrice, setEthPrice] = useState('Loading...');
    const [isApprove, SetIsApprove] = useState(false);
    const [isApproveLoading, SetIsApproveLoading] = useState(false);


    const dispatch = useDispatch();

    const fetchEthPrice = async () => {
        try {
           
            setEthPrice(`${parseFloat(usdVlaue * balance).toFixed(2)}`);
        } catch (error) {
            console.error('There was a problem fetching the MATIC price:', error);
            setEthPrice('Failed to load');
        }
    };

    useEffect(() => {
        if (!balance) return;
        fetchEthPrice();
    }, [balance]);

    // useEffect(()=>{
    //     if(!amount || !account ) return
    //     let isApprovedOrNot= BigNumber.from(toWei(amount, 18))?.gt(allowance)
    //     console.log('isApprovedOrNot', isApprovedOrNot)
    //     SetIsApprove(isApprovedOrNot)
    // },[amount,balance,account,isApproveLoading])


    const contractCall = async () => {
      
        try {
            if (!account) return;
           setLoading(true);

            const result = await enter({ amount, provider: library });
          
            closeModal();

        } catch (err) {
            console.log('err', err.message)
            switch (err.message) {
                case 'user rejected transaction':
                    toast.error("User rejected the transaction");
                    break;
                case 'insufficient funds for intrinsic transaction cost':
                    toast.error("Not enough MATIC in your wallet");
                    break;
                case 'invalid decimal value':
                    toast.error("invalid decimal value");
                    break;    
                default:
                    toast.error("An error occurred");
                    break;
            }
        } finally {
            setLoading(false);
            SetIsApproveLoading(false)
        }
    }

    const handleAddAmount = (addValue) => {
        setAmount((currentAmount) => {
            // Ensure the current amount is a floating-point number and add the desired value.
            const newAmount = parseFloat(currentAmount || 0) + addValue;
            // Use toFixed to limit the number of decimals and avoid floating point issues, then convert it back to a float if necessary.

            return newAmount.toFixed(2).toString();
        });
    };


    return (    
        <div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}modalIsOpen
                onRequestClose={closeModal}
                className='modal-common-block'
                contentLabel='Example Modal'>
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                <div className='modal-common-block-title'>
                    <h2>MATIC Entry</h2>
                    <button onClick={closeModal}>
                        <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M22.2397 20L32.3197 9.91995C32.9597 9.27995 32.9597 8.31995 32.3197 7.67995C31.6797 7.03995 30.7197 7.03995 30.0797 7.67995L19.9997 17.76L9.91971 7.67995C9.27971 7.03995 8.31971 7.03995 7.67971 7.67995C7.03971 8.31995 7.03971 9.27995 7.67971 9.91995L17.7597 20L7.67971 30.08C7.35971 30.4 7.19971 30.72 7.19971 31.2C7.19971 32.16 7.83971 32.8 8.79971 32.8C9.27971 32.8 9.59971 32.64 9.91971 32.32L19.9997 22.24L30.0797 32.32C30.3997 32.64 30.7197 32.8 31.1997 32.8C31.6797 32.8 31.9997 32.64 32.3197 32.32C32.9597 31.68 32.9597 30.72 32.3197 30.08L22.2397 20Z'
                                fill='#393939'
                            />
                        </svg>
                    </button>
                </div>
                <div className='modal-middle-section'>
                    <div className='form-group'>
                        <input value={amount} type='text' onChange={(e) => setAmount(e.target.value)} className='form-control' />
                    </div>
                    <div>
                    <p className={`validate_message ${+amount < 5?'':'unshow'}`}>Minimum Stake is 5 MATIC</p>
                    </div>
                    <div className='modal-middle-price'>
                        <div className='modal-middle-price-inner' onClick={() => handleAddAmount(1000)}>
                            <div className='modal-middle-price-inner-icon'>
                                {/* <img src='/puls-icon.svg'></img> */}
                                <img src='/puls-icon-1.svg'></img>
                            </div>
                            <h4>+ 1000 MATIC</h4>
                        </div>
                        <div className='modal-middle-price-inner' onClick={() => handleAddAmount(100)}>
                            <div className='modal-middle-price-inner-icon'>
                                {/* <img src='/puls-icon.svg'></img> */}
                                <img src='/puls-icon-1.svg'></img>

                            </div>
                            <h4>+ 100 MATIC</h4>
                        </div>
                        <div className='modal-middle-price-inner' onClick={() => handleAddAmount(10)}>
                            <div className='modal-middle-price-inner-icon'>
                                {/* <img src='/puls-icon.svg'></img> */}
                                <img src='/puls-icon-1.svg'></img>

                            </div>
                            <h4>+ 10 MATIC</h4>
                        </div>

                    </div>
                </div>
                <div className='eth-walltet-block'>
                    <h2>MATIC In Wallet</h2>
                    <div className='eth-walltet-block-icon'>
                        <div className='eth-walltet-block-icon-inner'>
                            {/* <img src='/puls-icon.svg'></img> */}
                            <img src='/puls-icon-1.svg'></img>

                        </div>
                        <div className='eth-walltet-block-icon-text'>
                            <h3>{(+balance)?.toFixed(3)} MATIC</h3>
                            <p>($ {ethPrice})</p>
                        </div>
                    </div>
                </div>
                <div className='modal-footer-block'>
                <button onClick={contractCall} disabled={+amount<5 || !isRunning || loading} className='common-btn'>{loading ? 'Entering...' : 'Submit'}</button>
                    {/* <button onClick={contractCall} disabled={!isRunning || loading} className='common-btn'>{loading || isApproveLoading ? loading?'Entering...':'approving...' : isApprove? "Approve":'Submit'}</button> */}
                </div>
            </Modal>
        </div>
    )
}

export default Enter