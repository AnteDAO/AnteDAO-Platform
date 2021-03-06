import { CircularProgress, Dialog, DialogContent } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from "react-router-dom";
import { HashLoader } from "react-spinners";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import { ETH_CHAIN_ID } from '../../constants/network';
import useFetch from '../../hooks/useFetch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getBalance } from "../../store/actions/balance";
import useCommonStyle from '../../styles/CommonStyle';
import StakingHeader, { BENEFIT_ALL, BENEFIT_IDO_ONLY, BENEFIT_REWARD_ONLY, DURATION_FINISHED, DURATION_LIVE, POOL_TYPE_ALLOC, POOL_TYPE_LINEAR } from './Header';
import useDetailListStakingPool from './hook/useDetailListStakingPool';
import ModalStake from "./ModalStake";
import ModalTransaction from "./ModalTransaction";
import AllocationPool from './Pool/AllocationPool';
import LinearPool from './Pool/LinearPool';
import useStyles from './style';


const closeIcon = '/images/icons/close.svg';
const iconWarning = "/images/warning-red.svg";

const ETH_RPC_URL = process.env.REACT_APP_NETWORK_URL || "";

const provider = new ethers.providers.JsonRpcProvider(ETH_RPC_URL);

const StakingPools = (props: any) => {
  const styles = useStyles();
  const commonStyles = useCommonStyle();
  
  const dispatch = useDispatch();


  // Start Staking Logic 
  const [blockNumber, setBlockNumber] = useState<number|undefined>(undefined);

  provider.on("block", (num: any)=>{
    if (num && Number(num) !== blockNumber) {
      setBlockNumber(Number(num))
    }
  })


  const { appChainID, walletChainID } = useTypedSelector(state => state.appNetwork).data;
  const {account: connectedAccount} = useWeb3React();

  // Filter
  const [durationType, setDurationType] = useState(DURATION_LIVE);
  const [poolType, setPoolType] = useState(POOL_TYPE_LINEAR);
  const [benefitType, setBenefitType] = useState(BENEFIT_ALL);
  const [stakedOnly, setStakedOnly] = useState(false);
  const [searchString, setSearchString] = useState('');

  // Transaction
  const [openModalTransactionSubmitting, setOpenModalTransactionSubmitting] = useState(false)
  const [transactionHashes, setTransactionHashes] = useState([]) as any;
  const { data: poolsList } = useFetch<any>(`/staking-pool`);
  const { allocPools, linearPools, fetchDetailList, loading: loadingDetailList } = useDetailListStakingPool(poolsList)
  const [filteredAllocPools, setFilteredAllocPools] = useState([]) as any;
  const [filteredLinearPools, setFilteredLinearPools] = useState([]) as any;


  useEffect(()=>{
    let listAlloc = Object.values(allocPools);
    let listLinear = Object.values(linearPools);

    if (durationType === DURATION_FINISHED) {
      listAlloc = listAlloc.filter((e:any) => e?.allocPoint === "0")
      listLinear = listLinear.filter((e:any) => (
        Number(e?.endJoinTime) <= moment().unix() ||
        (BigNumber.from(e?.cap).gt(BigNumber.from('0')) && BigNumber.from(e?.cap).sub(BigNumber.from(e?.totalStaked)).eq(BigNumber.from('0')))
      ))
    } else {
      listAlloc = listAlloc.filter((e:any) => e?.allocPoint !== "0")
      listLinear = listLinear.filter((e:any) => (
        Number(e?.endJoinTime) > moment().unix() &&
        (BigNumber.from(e?.cap).eq(BigNumber.from('0')) || BigNumber.from(e?.cap).sub(BigNumber.from(e?.totalStaked)).gt(BigNumber.from('0')))
      ))
    }

    if (benefitType === BENEFIT_REWARD_ONLY) {
      listAlloc = listAlloc.filter((e:any) => e?.rkp_rate === 0)
      listLinear = listLinear.filter((e:any) => e?.rkp_rate === 0)
    }

    if (benefitType === BENEFIT_IDO_ONLY) {
      listAlloc = listAlloc.filter((e:any) => e?.rkp_rate > 0)
      listLinear = listLinear.filter((e:any) => e?.rkp_rate > 0)
    }

    if (searchString) {
      listAlloc = listAlloc.filter((e:any) => (e?.title as string).toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
      listLinear = listLinear.filter((e:any) => (e?.title as string).toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
    }

    if (stakedOnly) {
      listAlloc = listAlloc.filter((e:any) => e?.stakingAmount !== '0' || e?.pendingWithdrawal?.amount !== '0')
      listLinear = listLinear.filter((e:any) => e?.stakingAmount !== '0' || e?.pendingWithdrawal?.amount !== '0')
    }
    setFilteredAllocPools(listAlloc);
    setFilteredLinearPools(listLinear);
  }, [linearPools, allocPools, durationType, benefitType, stakedOnly, searchString])

  const reloadData = useCallback(async () => {
    if (connectedAccount){
      dispatch(getBalance(connectedAccount));
    }
    fetchDetailList && fetchDetailList();
  }, [connectedAccount, fetchDetailList, dispatch])


  useEffect(() => {
    if(connectedAccount) {
      // dispatch(getAllowance(connectedAccount));
      dispatch(getBalance(connectedAccount));
    }
  }, [connectedAccount, dispatch]);

  const wrongChain = useMemo(() => {
    console.log(appChainID, walletChainID);
    
    return appChainID !== ETH_CHAIN_ID || appChainID !== walletChainID;
  }, [appChainID, walletChainID]);

  // End Staking Logic

  return (
    <DefaultLayout>
      <div className={styles.wrapper}>
        <div className="content">
          {wrongChain && 
            <div className={styles.message}>
              <img src={iconWarning} style={{ marginRight: "12px" }} alt="" />
              Please switch to the ETHEREUM network to join these staking pools
            </div>
          }
          <StakingHeader
            durationType={durationType} 
            setDurationType={setDurationType}
            poolType={poolType}
            setPoolType={setPoolType}
            stakedOnly={stakedOnly} 
            setStakedOnly={setStakedOnly}
            benefitType={benefitType}
            setBenefitType={setBenefitType}
            location={props.location}
            history={props.history}
            searchString={searchString}
            setSearchString={setSearchString}
          />

          {
            loadingDetailList &&
            <div className={styles.loader} style={{ marginTop: 70 }}>
              <HashLoader loading={true} color={'#3232DC'} />
            </div>
          }

          {
            !loadingDetailList && poolType === POOL_TYPE_ALLOC && filteredAllocPools.length > 0 &&
            <>
              {/* {durationType === DURATION_FINISHED && 
                <div className={styles.messageDuration}>
                  <img src={iconWarning} style={{ marginRight: "12px" }} alt="" />
                  These pools are no longer distributing rewards. Please unstake your tokens.
                </div>
              } */}
              <div className="pool-area">
              {
                filteredAllocPools.map((pool:any) =>(
                  <AllocationPool 
                    key={pool?.id}
                    reload={reloadData}
                    setTransactionHashes={setTransactionHashes}
                    setOpenModalTransactionSubmitting={setOpenModalTransactionSubmitting}
                    connectedAccount={connectedAccount}
                    poolDetail={pool}
                    blockNumber={blockNumber}
                    poolAddress={pool?.pool_address}
                  />
                ))
              }
              </div>
            </>
          }

          {
            !loadingDetailList && poolType === POOL_TYPE_LINEAR && filteredLinearPools.length > 0 &&
            <>
              {/* {durationType === DURATION_FINISHED && 
                <div className={styles.messageDuration}>
                  <img src={iconWarning} style={{ marginRight: "12px" }} alt="" />
                  These pools are no longer distributing rewards. Please unstake your tokens.
                </div>
              } */}
              <div className="pool-area">
              {
                filteredLinearPools.map((pool:any) =>(
                  <LinearPool 
                    key={pool?.id}
                    reload={reloadData}
                    setTransactionHashes={setTransactionHashes}
                    setOpenModalTransactionSubmitting={setOpenModalTransactionSubmitting}
                    connectedAccount={connectedAccount} 
                    poolDetail={pool}
                    poolAddress={pool?.pool_address}
                  />
                ))
              }
              </div>
            </>

          }
            

        </div>
        
        <Dialog
          open={openModalTransactionSubmitting}
          keepMounted
          onClose={() => setOpenModalTransactionSubmitting(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className={commonStyles.loadingTransaction}
        >
          <DialogContent className="content">
            <img src={closeIcon} alt="" onClick={() => setOpenModalTransactionSubmitting(false)}/>
            <span className={commonStyles.nnb1824d}>Transaction Submitting</span>
            <CircularProgress color="primary" />
          </DialogContent>
        </Dialog>

        <ModalStake open={false} />

        {transactionHashes.length > 0 && <ModalTransaction
          transactionHashes={transactionHashes}
          setTransactionHashes={setTransactionHashes}
          open={transactionHashes.length > 0}
        />}
      </div>
    </DefaultLayout>
  );
};

export default withRouter(StakingPools);
