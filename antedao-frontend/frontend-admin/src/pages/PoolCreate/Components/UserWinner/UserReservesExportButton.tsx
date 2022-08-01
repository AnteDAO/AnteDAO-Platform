import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@material-ui/core";
// @ts-ignore
import { CSVLink } from "react-csv";
import { getReserveUser } from '../../../../request/participants';
import { alertFailure } from '../../../../store/actions/alert';
import { useDispatch } from 'react-redux';
import moment from 'moment';

type UserProps = {
  id: string;
  email: string;
  wallet_address: string; 
  level: any; 
}

type UserReservesProps = {
  poolDetail: any
}

const UserReservesExportButton: React.FC<UserReservesProps> = (props: UserReservesProps) => {
  const { poolDetail } = props;
  const csvLink = useRef<{ link: HTMLAnchorElement }>(null)
  const timeout = useRef<any>(null)
  const [winners, setReserves] = useState<UserProps[]>([]);

  const dispatch = useDispatch();

  const getAllReserves = async () => {
    try {
      const res = await getReserveUser(poolDetail.id);
      if (res.status === 200) {
        setReserves(res.data);
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          csvLink?.current?.link.click();
        }, 100);
      }
      else {
        setReserves([]);
        dispatch(alertFailure('Download failed!'));
      }
    }
    catch {
      setReserves([]);
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
  ];

  return (
    <>
      <CSVLink
        ref={csvLink}
        style={{ display: 'none' }}
        data={winners}
        headers={headers}
        filename={`${moment().format('YYYYMMDD')}-reserveslist.csv`}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: 10 }}
        onClick={getAllReserves}
      > Export Reserve</Button>
    </>
  )
};

export default UserReservesExportButton;
