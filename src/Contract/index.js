import { BigNumber, Contract, ethers } from "ethers";
import { CONTRACT_AADDRESS, RPC_URL } from "@/constant";
import ABI from "@/Abi/Contract.json";
import WETH_ABI from "@/Abi/weth.json";



export function parseToWei(amount, decimal) {
    return ethers.utils.parseUnits(String(amount), decimal);
}

const approveAmount = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'; // maximum value of approve

const getContract = (provider) => {
    let newProvider;
    if (provider) {
        newProvider = provider;
    } else {
        newProvider = new ethers.providers.JsonRpcBatchProvider(RPC_URL)
    }
    const signer = newProvider?.getSigner();

    return new Contract(CONTRACT_AADDRESS, ABI, newProvider).connect(signer)
}



const getReadContract = (provider) => {
    let newProvider;
    if (provider) {
        newProvider = provider;
    } else {
        newProvider = new ethers.providers.JsonRpcBatchProvider(RPC_URL)
    }

    return new Contract(CONTRACT_AADDRESS, ABI, newProvider)

}

export const enter = async ({ provider, amount }) => {
    const contract = getContract(provider);
    if (!contract) return false;

    try {
        const tx = await contract.enter(
            {
                value: parseToWei(
                    Number(amount),
                    18
                ),
            }
            // parseToWei(
            //     Number(amount),
            //     18
            // ),
        ); 
        return true;
        // const receipt = await tx.wait(2);
        // if (receipt.confirmations) {
        // }
        // return false;
    } catch (err) {
        if (err.reason) {
            console.log('err.reason', err.reason)
            // toast.error(err.reason);
        }
        // console.log("err", err);
        // return err;
        throw new Error(err.reason)
    }
}


export const roundStart = async (provider) => {
    const contract = getReadContract(provider);
    if (!contract) return false;

    try {
        const result = await contract.roundstart();
        return result?.toNumber();
    } catch (err) {
        if (err.reason) {
            console.log('err.reason', err.reason)
            // toast.error(err.reason);
        }
        console.log("err", err);
        return 0;
    }
}


export const miniBonusamount = async (provider) => {
    const contract = getReadContract(provider);
    if (!contract) return false;

    try {
        const result = await contract.miniBonusamount();
        return +result?.toString();
    } catch (err) {
        if (err.reason) {
            console.log('err.reason', err.reason)
            // toast.error(err.reason);
        }
        console.log("err", err);
        return 0;
    }
}

export const megaBonusamount = async (provider) => {
    const contract = getReadContract(provider);
    if (!contract) return false;

    try {
        const result = await contract.megaBonusamount();
        return +result?.toString();
    } catch (err) {
        if (err.reason) {
            console.log('err.reason', err.reason)
            // toast.error(err.reason);
        }
        console.log("err", err);
        return 0;
    }
}

export const superBonusamount = async (provider) => {
    const contract = getReadContract(provider);
    if (!contract) return false;

    try {
        const result = await contract.superBonusamount();
        return +result?.toString();
    } catch (err) {
        if (err.reason) {
            console.log('err.reason', err.reason)
            // toast.error(err.reason);
        }
        console.log("err", err);
        return 0;
    }
}

export const roundNumber = async (provider) => {
    const contract = getReadContract(provider);
    if (!contract) return false;

    try {
        const result = await contract.roundNumber();
        return Number(result || 0);
    } catch (err) {
        if (err.reason) {
            console.log('err.reason', err.reason)
            // toast.error(err.reason);
        }
        console.log("err", err);
        return 0;
    }
}

export function toWei(amount, decimal) {
    return ethers.utils.parseUnits(String(amount), decimal);
}


export async function isTokenApproved(account, amount, toAddr, provider) {
    try{
        const tokenContract = getTokenContract(provider);
        console.log('tokenContract instance', tokenContract)
        if (!tokenContract) return false;
    
        const decimal = await tokenContract.decimals();
        console.log('decimal', decimal)
        const allowance = await tokenContract.allowance(account, toAddr);
        console.log('allowance', allowance)
        if (BigNumber.from(toWei(amount, decimal)).gt(allowance)) {
            return false;
        }
        return true;

    }catch(err){
        console.log("isTokenApproved Contract instace",err)

    }
}

export async function approveToken(toAddr, provider) {
    const tokenContract = getTokenContract(provider);
    if (!tokenContract) return false;

    try {
        const approve_tx = await tokenContract.approve(toAddr, approveAmount);
        await approve_tx.wait(1);
        return true;
    } catch (e) {
        // console.log(e)
        return false;
    }
}