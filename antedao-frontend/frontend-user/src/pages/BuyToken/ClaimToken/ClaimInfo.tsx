import React from "react";
import useStyles from "./style";
import {
  formatRoundDown,
  formatRoundUp,
  numberWithCommas,
} from "../../../utils/formatNumber";
import BigNumber from "bignumber.js";
// import { useWeb3React } from "@web3-react/core";
//  import useFetch from "../../../hooks/useFetch";
// import { useParams } from "react-router-dom";
import { convertTimeToStringFormat } from "../../../utils/convertDate";

function ClaimInfo(props: any) {
  const styles = useStyles();
  const { poolDetails, tokenDetails, userClaimInfo, currencyName, progress } =
    props;

  const {
    userPurchased = 0,
    userClaimed = 0,
    // userPurchasedReturn = 0,
  } = userClaimInfo || {};

  // const { account: connectedAccount } = useWeb3React();
  // const { id } = useParams() as any;
  // const { data: currentUserTier } = useFetch<any>(
  //   id && connectedAccount
  //     ? `pool/${id}/user/${connectedAccount}/current-tier`
  //     : undefined
  // );
  // const userBuyLimit = currentUserTier?.max_buy || 0;

  return (
    <>
      <div className={styles.poolDetailClaimInfo}>
        <div className={styles.poolDetailClaimInfoBlock}>
          <span>Total bought tokens</span>
          <span className="text-blue">
            {numberWithCommas(`${userPurchased || 0}`, 2)}{" "}
            {tokenDetails?.symbol}
          </span>
        </div>

        <div className={styles.poolDetailClaimInfoBlock}>
          <span>Have bought</span>
          <span>
            {numberWithCommas(
              `${formatRoundUp(
                new BigNumber(userPurchased).multipliedBy(
                  poolDetails?.ethRate || 0
                )
              )}`,
              2
            )}
            /{numberWithCommas(`${formatRoundDown(new BigNumber(poolDetails?.totalSoldCoin || 0).multipliedBy(poolDetails?.ethRate || 0))}`, 2)}{" "}
            {currencyName}
          </span>
        </div>
        {progress && progress.length === 1 ? (
          <div className={styles.poolDetailClaimInfoBlock}>
            <span>Claim policy</span>
            <span style={{ wordBreak: "break-all" }}>
              {` You can claim all tokens on ${convertTimeToStringFormat(progress[0].date)}`}
            </span>
          </div>
        ) : (
          <>
            {poolDetails?.claimPolicy && (
              <div className={styles.poolDetailClaimInfoBlock}>
                <span>Claim policy</span>
                <span style={{ wordBreak: "break-all" }}>
                  {poolDetails?.claimPolicy}
                </span>
              </div>
            )}
          </>
        )}

        <div className={styles.poolDetailClaimInfoBlock}>
          <span>You have claimed</span>
          <span className="text-blue">
            {numberWithCommas(`${userClaimed || 0}`, 2)}/
            {numberWithCommas(`${userPurchased || 0}`, 2)}{" "}
            {tokenDetails?.symbol}
          </span>
        </div>
      </div>
    </>
  );
}

export default ClaimInfo;
