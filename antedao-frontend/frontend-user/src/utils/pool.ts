import { ETH_CHAIN_ID } from "../constants/network";
import { PurchaseCurrency } from "../constants/purchasableCurrency";
import { getBUSDAddress, getUSDCAddress, getUSDTAddress } from "./contractAddress/getAddresses";

export const getTokenToApprove = (purchasableCurrency: any, appChainID: string) => {
    switch (purchasableCurrency) {
        case (PurchaseCurrency.USDT): {
            return {
                address: getUSDTAddress(appChainID),
                name: purchasableCurrency,
                symbol: purchasableCurrency,
                decimals: appChainID === ETH_CHAIN_ID ? 6 : 18
            };
        }
        case (PurchaseCurrency.BUSD): {
            return {
                address: getBUSDAddress(appChainID),
                name: purchasableCurrency,
                symbol: purchasableCurrency,
                decimals: 18
            };
        }
        case (PurchaseCurrency.USDC): {
            return {
                address: getUSDCAddress(appChainID),
                name: purchasableCurrency,
                symbol: purchasableCurrency,
                decimals: appChainID === ETH_CHAIN_ID ? 6 : 18
            };
        }
        case (PurchaseCurrency.ETH): {
            return {
                address: "0x00",
                name: purchasableCurrency,
                symbol: purchasableCurrency,
                decimals: 18
            }
        }
        default: {
            return;
        }
    }
}