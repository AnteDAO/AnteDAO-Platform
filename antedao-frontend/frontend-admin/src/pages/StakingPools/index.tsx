import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import { APP_NETWORK_NAMES, ETH_CHAIN_ID } from '../../constants';
//@ts-ignore
import { BaseRequest } from '../../request/Request';
import { alertFailure } from '../../store/actions/alert';
import { getOwnerWalletAddress } from '../../store/actions/campaign';
import { getSettingStakingPool, updateStakingPool } from '../../store/actions/setting-staking-pool';
import { apiRoute } from "../../utils";
import NetworkWaningPolygon from '../NetworkChange/NetworkWaningPolygon';
import StakingPoolSettingForm from './StakingPoolSettingForm';
import useStyles from './style';

const tableHeaders = ["Day lock", "Min Stake","Early unstake fee", "Earn reward after unlock time"];

const fetchListPool = async () => {
  let url = apiRoute(`/staking-pool`);
  try {
    const baseRequest = new BaseRequest();
    const response = await baseRequest.get(url) as any;
    const resObject = await response.json();

    if (resObject.status === 200) {
      const data = resObject.data;
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const Pools: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const { wallet_address, currentNetworkId } = useSelector((state: any) => {
    return {
      ...state,
      currentNetworkId: state.userCurrentNetwork.currentNetworkId,
      wallet_address: state.user.data.wallet_address,
    };
  });
  const [loading, setLoading] = useState(true);
  const [stakingPools, setStakingPools] = useState<any[]>([]);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  
  const [addressOwner, setAddressOwner] = useState<any>("");
  
  const disablesMinStake = stakingPools && stakingPools.some((item) => !(new BigNumber(item.minStake)).eq(item.minStakeChange));
  const disablesearnReward = stakingPools && stakingPools.some((item) => item.earnReward !== item.earnRewardChange);
  //compare value unStake_Fee show disable
  const compareUnStakeFee1 = stakingPools && stakingPools.some((item) => !(new BigNumber(item.unStakeFee)).eq(item.unStakeFeeChange));
  const compareUnStakeFee2 = stakingPools && stakingPools.some((item) => ((item.unStakeFeeChange > 90) || (item.unStakeFeeChange < 1) || (item.unStakeFeeChange === undefined)));
  const disableUnStakeFee = compareUnStakeFee2 ? compareUnStakeFee2 : !compareUnStakeFee1

  const checkUndefile = stakingPools && stakingPools.some((item) => (item.unStakeFeeChange === undefined) || (item.minStakeChange === undefined))
  const disable = checkUndefile ? checkUndefile : (!disablesMinStake && !disablesearnReward && disableUnStakeFee )

  const checkNetWork = currentNetworkId !== ETH_CHAIN_ID;
  const checkOwner = Boolean(addressOwner !== wallet_address);

  const handleUpdateStakingPool = async () => {
    try {
      for (const item of stakingPools) {
        if(item.unStakeFeeChange < 1 || item.unStakeFeeChange > 90 ) {
          dispatch(alertFailure("Early unstake fee from 1% - 90%"))
        }
        else if (item.minStake !== item.minStakeChange || item.earnReward !== item.earnRewardChange || item.unStakeFee !== item.unStakeFeeChange) {
         
          await updateStakingPool(item.pool_id, item.minStakeChange, item.earnRewardChange, item.unStakeFeeChange, wallet_address, dispatch, setLoadingUpdate);
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchListPool()
      .then((data: any[]) => {
        setStakingPools(data)
        const listPromis = []
        for (const item of data) {
          listPromis.push(getSettingStakingPool(item.pool_id))
        }
        Promise.all(listPromis).then(res => {
          const dataWithSeting = data.map((item, index) => {
            return ({
              ...item,
              ...res[index],
              minStakeChange: res[index].minStake,
              earnRewardChange: res[index].earnReward,
              unStakeFeeChange:res[index].unStakeFee
            })
          })
          dataWithSeting.sort((a, b) => a.lockDuration - b.lockDuration)
          
          setStakingPools(dataWithSeting);
          setLoading(false)
        }
        )
      })
  }, [currentNetworkId]);

  useEffect(() => {
    const getOwner = async () => {
      if (currentNetworkId) {
        const addressOwner = await getOwnerWalletAddress(
          APP_NETWORK_NAMES[currentNetworkId] || "",
        );
        setAddressOwner(addressOwner);
      }
    };
    getOwner();
  }, [currentNetworkId]);

  const handleChange = (index: number, key: string, value: string) => {
    stakingPools[index][key] = value;
    setStakingPools([...stakingPools])
  }
  return (
    <DefaultLayout >
      {(checkNetWork) ? (
        <NetworkWaningPolygon />
      ) : (<></>)}
      <div className={classes.header}>
        <h2>Staking Pools</h2>
        <div className="header-left">
          <Button
            onClick={handleUpdateStakingPool}
            className={`${disable ? "" : classes.buttonUpdate} ${loadingUpdate ? classes.buttonLoading : ''}`}
            variant="contained"
            disabled={disable}
          >
            {loadingUpdate && <CircularProgress size={25} />}
            {!loadingUpdate && 'Update'}
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        {
          loading ? (
            [...Array(10)].map((num, index) => (
              <div key={index}>
                <Skeleton className={classes.skeleton} width={'100%'} />
              </div>
            ))) : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {
                    tableHeaders.map((tableHeader: string, index: number) => (
                      <TableCell key={index} className={classes.tableHeader}>{tableHeader}</TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {stakingPools.map((pool: any, index: number) => (
                  <StakingPoolSettingForm
                    key={pool.id}
                    index={index}
                    pool={pool}
                    handleChange={handleChange}
                    checkNetWork={checkNetWork}
                    checkOwner={checkOwner}
                  />
                ))}
              </TableBody>
            </Table>
          )}
     
        {/* {
          failure ? <p className={classes.errorMessage}>{failure}</p> : ((!campaigns || campaigns.length === 0) && !loading)  ? <p className={classes.noDataMessage}>There is no data</p> : (
            <>
              {campaigns && lastPage > 1 && <Pagination page={currentPage} className={classes.pagination} count={lastPage} onChange={handlePaginationChange} />}
            </>
          )
        } */}
      </TableContainer>
      <div className={classes.fontDescription}>* Early unstake fee maximum 90%</div>
    </DefaultLayout>
  )
}

export default Pools;
