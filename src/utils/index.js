import axios from "axios";
import BigNumber from "bignumber.js";


console.log("process.env.SOCKET_URL", process.env.SOCKET_URL);


BigNumber.config({ EXPONENTIAL_AT: 1e9 });


export const Axios = axios.create({
   baseURL: process.env.API_URL 
})

// export const generateRandomColor = (usedColors) => {
//    let color;
//    console.log('usedColorsinside', usedColors)
//    do {
//      color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
//    } while (usedColors.includes(color));
//    usedColors.push(color);
//    return color;
//  };

 export const calculatePlayerAngles = (players, totalStakes) => {
   let accumulatedAngle = 0;
 
   return players?.map((player) => {
     const startAngle = accumulatedAngle;
     const endAngle = accumulatedAngle + (2 * Math.PI * (player.stake / totalStakes));
     accumulatedAngle = endAngle;
 
     return { ...player, startAngle, endAngle };
   });
 };

 export const toWei = (amount, decimals = 18) => {
  try {
      if (!amount) {
          return new BigNumber(0).toString();
      }
      return new BigNumber(amount)
          .multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
          .toFixed(0)
          .toString();
  } catch (error) {
      console.log("exeption in toWei , ", error);
      return null;
  }
};

export const fromWei = (amount, decimals = 18) => {
  // console.log("amount", amount);
  try {
      if (!amount || +amount <= 0) {
          return new BigNumber(0).toString();
      }

      return new BigNumber(amount)
          .div(new BigNumber(10).exponentiatedBy(decimals))
          .toFixed(6)
          .toString();
  } catch (error) {
      console.log("exeption in fromWei ", error);
      return null;
  }
};

export function formatAddress(address) {
	const prefix = address?.slice(0, 6) || " ";
	const suffix = address?.slice(-4);

	return `${prefix}...${suffix}` || " ";
};

export function showLastSixDegitAddress(address){
  let account=address
  let acc=account?.slice(-6)
  return acc
}

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';



export function checkRoundData(round){
  console.log('roundData?.roundData?.round', round)
  switch (true) {
    case (round%1000 === 0) :
      return 'Super Bonus';
    case (round%100 ===0):
      return 'Mega Bonus';
    case (round%10===0):
      return 'Mini Bonus';
    default:
      return '';
  }
}

