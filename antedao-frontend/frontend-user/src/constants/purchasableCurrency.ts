export enum PurchaseCurrency {
  USDT = "USDT",
  USDC = "USDC",
  ETH = "ETH",
  BUSD = "BUSD",
  ANTE = "ANTE",
}

export type purchaseCurrency = Extract<PurchaseCurrency, PurchaseCurrency.ETH | PurchaseCurrency.USDC | PurchaseCurrency.USDT | PurchaseCurrency.ANTE>;
