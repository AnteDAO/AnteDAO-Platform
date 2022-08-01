import { FC } from "react";
import { ETHERSCAN_URL, BCSSCAN_URL, POLYGONSCAN_URL } from '../../../constants/network';

type TokenScanLinkProps = {
  tokenAddress: string;
  networkAvailable?: "eth" | "polygon" | "bsc";
  className?: string
};

const TokenScanLink: FC<TokenScanLinkProps> = ({ tokenAddress, networkAvailable, className }) => {
  let scanUrl = ETHERSCAN_URL;
  switch (networkAvailable) {
    case "polygon": scanUrl = POLYGONSCAN_URL; break;
    case "bsc": scanUrl = BCSSCAN_URL; break;
  }
  return (
    <a
      className={className}
      href={scanUrl + "/address/" + tokenAddress}
      target="_blank"
      rel="noreferrer"
    >
      {tokenAddress.slice(0, 9)}
      {"....."}
      {tokenAddress.slice(-8)}
    </a>
  );
};

export default TokenScanLink;
