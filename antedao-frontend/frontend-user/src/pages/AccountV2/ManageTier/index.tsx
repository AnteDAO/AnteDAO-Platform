import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./style";
import {getUserInfo, getWithdrawPercent} from "../../../store/actions/sota-tiers";
import useAuth from "../../../hooks/useAuth";
import TierInfomation from "../TierInfomation";
import { numberWithCommas } from "../../../utils/formatNumber";
import { USER_STATUS } from "../../../constants";
import { ETH_CHAIN_ID } from "../../../constants/network";
import {getBalance} from "../../../store/actions/balance";

const ManageTier = (props: any) => {
  const history = useHistory();
  const styles = useStyles();
  const dispatch = useDispatch();

  const { data: userInfo = {} } = useSelector((state: any) => state.userInfo);
  const { data: userInfoLegacy = {} } = useSelector((state: any) => state.userInfoLegacy);
  const {data: rates} = useSelector((state: any) => state.rates);
  const { data: balance = {} } = useSelector((state: any) => state.balance);
  const { connectedAccount, isAuth, wrongChain } = useAuth();
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;

  const { emailVerified } = props;

  useEffect(() => {
    dispatch(getWithdrawPercent());
    connectedAccount && dispatch(getUserInfo(connectedAccount))
    connectedAccount && dispatch(getBalance(connectedAccount))
  }, [connectedAccount, dispatch]);

  const renderToken = (symbol: string, balance: any, staked: any, rkp: any) => {
    return (
      <div className="group">
        <span>{symbol}</span>
        <span>{connectedAccount &&  ( balance === null ? '-' : numberWithCommas(balance || 0))}</span>
        <span>{connectedAccount &&  ( staked === null ? '-' : numberWithCommas(staked || 0))}</span>
        <span>{connectedAccount &&  numberWithCommas(rkp || 0)}</span>
      </div>
    );
  };

  const renderTokenLegacy = (symbol: string, balance: any, staked: any) => {
    return (
      <div className="group">
        <span>{symbol}</span>
        <span>{connectedAccount &&  numberWithCommas(staked || 0)}</span>
      </div>
    );
  };

  return (
    <div className={styles.content}>
      <p className={styles.title}>Staking Information (New SC + Existing SC)</p>
      <div className={styles.walletBalance}>
        <div className={styles.tableHead}>
          <div className="group">
            <span>Type</span>
            <span>Wallet Balance</span>
            <span>Staked</span>
            <span>RKPs</span>
          </div>
        </div>
        <div className={styles.tableBody}>
          {renderToken("PKF", balance?.pkf, userInfo?.pkfStaked, userInfo?.pkfStaked)}
          {renderToken('Reputation', null, null, userInfo?.reputation)}
        </div>
      </div>

      <TierInfomation />

      <p className={styles.title} style={{marginTop: 40}}>Staking Information (Existing SC)</p>
      <div className={styles.buttonArea}> 
        <Button
          className={`${styles.btn} btnStake`}
          onClick={() => history.push("/staking-pools?benefit=ido-only")}
        >
          Stake
        </Button>

        <Button
          className={`${styles.btn} btnUnstake`}
          disabled={emailVerified === USER_STATUS.UNVERIFIED || wrongChain || !isAuth || ETH_CHAIN_ID !== appChainID}
          onClick={() => history.push("/unstake")}
        >
          Unstake
        </Button>
      </div>
      <div className={styles.walletBalance}>
        <div className={styles.tableHead}>
          <div className="group">
            <span>Type</span>
            <span>Staked</span>
          </div>
        </div>
        <div className={styles.tableBody}>
          {renderTokenLegacy("PKF", balance?.pkf, userInfoLegacy?.pkfStaked)}
        </div>
      </div>
    </div>
  );
};

export default ManageTier;
