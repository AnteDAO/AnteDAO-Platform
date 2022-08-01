import { FC, useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  ETH_CHAIN_ID,
  BSC_CHAIN_ID,
  POLYGON_CHAIN_ID,
} from "../../../constants/network";
import useStyles from "./styles";
import { Hidden } from "@material-ui/core";
import TokenScanLink from "./TokenScanLink";
import CopyToClipboard from "react-copy-to-clipboard";

const poolImage = "/images/pool_circle.svg";
const copyImage = "/images/copy.svg";

type Props = {
  poolDetailsMapping: any;
  poolDetails: any;
};

const HeaderByToken: FC<Props> = ({ poolDetailsMapping, poolDetails }) => {
  const styles = useStyles();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const navHeader = useState(poolDetailsMapping);
  const [, setDisableAllButton] = useState<boolean>(false);

  const { appChainID } = useTypedSelector((state) => state.appNetwork).data;

  useEffect(() => {
    let appNetwork;
    switch (appChainID) {
      case BSC_CHAIN_ID:
        appNetwork = "bsc";
        break;
      case POLYGON_CHAIN_ID:
        appNetwork = "polygon";
        break;
      case ETH_CHAIN_ID:
        appNetwork = "eth";
        break;
    }

    setDisableAllButton(appNetwork !== poolDetails?.networkAvailable);
  }, [appChainID, poolDetails]);

  var minTierDisplay = navHeader[0]?.minTier?.display;

  var currentTime = new Date();
  var eventEndTime = new Date(Number(poolDetails?.startBuyTime) * 1000);
  var duration = eventEndTime.valueOf() - currentTime.valueOf();
  var durationShow = Math.ceil(duration / (1000 * 60 * 60 * 24));
  const kycBypass = () => {
    if (poolDetails.kycBypass) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div className={`${styles.top}`}>
        <img
          className={styles.iconToken}
          src={poolDetails?.banner || poolImage}
          alt=""
        />
        <h2 className={styles.title}>{poolDetails?.title}</h2>
      </div>
      <ul className={styles.navHeaderComponent}>
        <li className={styles.item}>
          <img
            className={styles.iconItem}
            src={`${navHeader[0]?.deposited?.image}`}
            alt=""
          />
          {navHeader[0]?.deposited?.display}
        </li>
        <li className={styles.item}>
          {minTierDisplay}
          &nbsp;
          {minTierDisplay !== "No tier & KYC required" &&
          minTierDisplay !== "No tier required"
            ? "at Min Tier"
            : ""}
        </li>

        <li className={styles.item}>
          <img
            className={styles.iconItem}
            src={poolDetails?.networkIcon}
            alt=""
          />
          {(() => {
            switch (poolDetails?.networkAvailable) {
              case "bsc":
                return "Binance Smart Chain";
              case "polygon":
                return "Polygon";
              case "eth":
              default:
                return "Ethereum";
            }
          })()}
        </li>
        {kycBypass() && (
          <li className={styles.item}>
            KYC Needed
          </li>
        )}

        {durationShow > 1 ? (
          <li className={styles.item}>
            <img
              className={styles.iconItem}
              src="/images/icons/icon_launching.svg"
              alt=""
            />
            Launching in {durationShow} day
          </li>
        ) : (
          poolDetails.isDeployed && (
            <Hidden smDown>
              <li className={styles.item}>
                <TokenScanLink
                  className={styles.tokenScanLink}
                  tokenAddress={poolDetails?.tokenDetails?.address}
                  networkAvailable={poolDetails?.networkAvailable}
                />
                <CopyToClipboard
                  text={poolDetails?.tokenDetails?.address}
                  onCopy={() => {
                    setCopiedAddress(true);
                    setTimeout(() => {
                      setCopiedAddress(false);
                    }, 2000);
                  }}
                >
                  <span className={styles.copyAddress}>
                    {!copiedAddress ? (
                      <img src={copyImage} alt="copy-icon" title="" />
                    ) : (
                      <span>Copied!</span>
                    )}
                  </span>
                </CopyToClipboard>
              </li>
            </Hidden>
          )
        )}
      </ul>
      {poolDetails.isDeployed && (
        <Hidden mdUp>
          <ul className={styles.navHeaderComponent}>
            <li className={styles.item}>
              <TokenScanLink
                className={styles.tokenScanLink}
                tokenAddress={poolDetails?.tokenDetails?.address}
                networkAvailable={poolDetails?.networkAvailable}
              />
              <CopyToClipboard
                text={poolDetails?.tokenDetails?.address}
                onCopy={() => {
                  setCopiedAddress(true);
                  setTimeout(() => {
                    setCopiedAddress(false);
                  }, 2000);
                }}
              >
                <span className={styles.copyAddress}>
                  {!copiedAddress ? (
                    <img src={copyImage} alt="copy-icon" title="" />
                  ) : (
                    <span>Copied!</span>
                  )}
                </span>
              </CopyToClipboard>
            </li>
          </ul>
        </Hidden>
      )}
    </>
  );
};

export default HeaderByToken;
