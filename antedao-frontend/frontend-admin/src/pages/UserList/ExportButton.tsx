
import React, { useEffect, useRef, useState } from 'react';
import useStyles from './style';
// @ts-ignore
import { CSVLink } from "react-csv";
import { useDispatch } from 'react-redux';
import { getUserList } from '../../request/user';
import { alertFailure } from '../../store/actions/alert';

type UserProps = {
  wallet_address: string;
  staked_point: number;
  tier: any;
  user_telegram: string;
  updated_at: any;
}

const UserExportCSV: React.FC = (props: any) => {
  const classes = useStyles();
  const csvLink = useRef<{ link: HTMLAnchorElement }>(null)
  const timeout = useRef<any>(null)
  const [users, setUsers] = useState<UserProps[]>([]);

  const dispatch = useDispatch();

  const getAllUsers = async () => {
    try {
      const res = await getUserList({ limit: 1000000 });
      if (res.status === 200) {
        setUsers(res.data.data);
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          csvLink?.current?.link.click();
        }, 100);
      }
      else {
        setUsers([]);
        dispatch(alertFailure('Download failed!'));
      }
    }
    catch {
      setUsers([]);
      dispatch(alertFailure('Download failed!'));
    }
  }
  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    }
  }, [])
  const headers = [
    { label: "Wallet", key: "wallet_address" },
    { label: "Staked", key: "staked_point" },
    { label: "Tier", key: "tier" },
    { label: "Telegram", key: "user_telegram" },
    { label: "Update at", key: "updated_at" },
  ];
  const day = new Date();
  const date = day.getFullYear() + '/' + (day.getMonth() + 1) + '/' + day.getDate();
  return (
    <>
      <CSVLink
        ref={csvLink}
        style={{ display: 'none' }}
        data={users}
        headers={headers}
        filename={`${date}-userlist.csv`}
      />
      <button className={classes.exportBtn}
        onClick={getAllUsers}
      > Export CSV</button >
    </>
  )
};

export default UserExportCSV;

