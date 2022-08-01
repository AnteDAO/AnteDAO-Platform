import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
export const convertHexToDecimal = (hex:any) => {
    return ethers.utils.formatEther(BigNumber.from(hex));
  };