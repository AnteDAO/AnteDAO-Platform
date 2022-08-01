import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BackButton from "../../components/Base/ButtonLink/BackButton";
import DefaultLayout from '../../components/Layout/DefaultLayout';
import { getPoolDetail } from "../../request/staking-pool";
import { alertFailure } from "../../store/actions/alert";
import { adminRoute } from "../../utils";
import { getPoolBlockchainInfo } from "../../utils/blockchain";
import PoolForm from "./PoolForm";

const PoolEdit: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const isEdit = true;
  const { match } = props;
  const dispatch = useDispatch();
  const { data: loginUser } = useSelector((state: any) => state.user);
  const [poolDetail, setPoolDetail] = useState();

  // @ts-ignore
  const id = match.params?.id;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPoolInfoInBlockchain = async (data: any) => {
    if (!get(poolDetail, 'is_deploy')) {
      return;
    }
    try {
      const response = await getPoolBlockchainInfo(loginUser, data);
      console.log('getPoolBlockchainInfo: ', response);
    } catch (e) {
      console.log('ERROR: ', e);
    }
  };

  useEffect(() => {
    getPoolDetail(id)
      .then(async (res) => {
        if (res.status !== 200) {
          dispatch(alertFailure('Server Error: ' + (res.message || 'Load pool fail !!!')));
          return false;
        }
        const data = res.data;

        setPoolDetail(data);

        return res.data;
      })
      .catch((e) => {
        console.log('Error: ', e);
        dispatch(alertFailure('Pool load fail !!!'));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <DefaultLayout>
      <BackButton to={adminRoute('/campaigns')}/>
      <PoolForm
        isEdit={isEdit}
        poolDetail={poolDetail}
      />
    </DefaultLayout>
  )
}

export default withRouter(PoolEdit);
