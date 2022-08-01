import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@material-ui/core";
// @ts-ignore
import { CSVLink } from "react-csv";
import { getWinnerUser } from '../../../../request/participants';
import { alertFailure } from '../../../../store/actions/alert';
import { useDispatch } from 'react-redux';
import moment from 'moment';

type Winner = {
  id: string;
  email: string;
  wallet_address: string;
  level: any;
  maxBuy: string;
}

type UserWinnerProps = {
  poolDetail: any
}

const UserWinnerExportButton: React.FC<UserWinnerProps> = (props: UserWinnerProps) => {
  const { poolDetail } = props;
  const csvLink = useRef<{ link: HTMLAnchorElement }>(null)
  const timeout = useRef<any>(null)
  const [winners, setWinners] = useState<Winner[]>([]);
  // const {maxBuyTiersMapping,} = useMapMaxBuyTier({ poolDetail });
  const dispatch = useDispatch();

  const getAllWiners = async () => {
    try {
      const res = await getWinnerUser(poolDetail.id, {});
      if (res.status === 200) {
        setWinners(res.data.map((item: any) => ({
          id: item.id,
          email: item.email,
          wallet_address: item.wallet_address,
          level: item.level,
          maxBuy: poolDetail?.is_deploy ? item.max_buy : "-"
        })));
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          csvLink?.current?.link.click();
        }, 100);
      }
      else {
        setWinners([]);
        dispatch(alertFailure('Download failed!'));
      }
    }
    catch {
      setWinners([]);
      dispatch(alertFailure('Download failed!'));
    }
  }
  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    }
  }, [])
  const headers = [
    { label: "ID", key: "id" },
    { label: "Email", key: "email" },
    { label: "Wallet Address", key: "wallet_address" },
    { label: "Tier", key: "level" },
    { label: "Max Buy", key: "maxBuy" },
  ];

  return (
    <>
      <CSVLink
        ref={csvLink}
        style={{ display: 'none' }}
        data={winners}
        headers={headers}
        filename={`${moment().format('YYYYMMDD')}-winnerlist.csv`}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: 10 }}
        onClick={getAllWiners}
      > Export Winner</Button>
    </>
  )
};

export default UserWinnerExportButton;
