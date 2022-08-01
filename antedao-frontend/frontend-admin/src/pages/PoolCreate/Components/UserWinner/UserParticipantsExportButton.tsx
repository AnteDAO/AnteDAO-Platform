import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@material-ui/core";
// @ts-ignore
import { CSVLink } from "react-csv";
import { getParticipantUser } from '../../../../request/participants';
import { alertFailure } from '../../../../store/actions/alert';
import { useDispatch } from 'react-redux';
import { TIERS } from "../../../../constants";
import moment from 'moment';

type Participant = {
  id: string;
  email: string;
  wallet_address: string;
  level: any;
  whitelistStatus: string;
}

type UserParticipantsProps = {
  poolDetail: any
}

const UserParticipantsExportButton: React.FC<UserParticipantsProps> = (props: UserParticipantsProps) => {
  const { poolDetail } = props;
  const csvLink = useRef<{ link: HTMLAnchorElement }>(null)
  const timeout = useRef<any>(null)
  const [winners, setParticipants] = useState<Participant[]>([]);

  const dispatch = useDispatch();

  const getAllParticipants = async () => {
    try {
      const res = await getParticipantUser(poolDetail.id);
      if (res.status === 200) {
        setParticipants(res.data.data.map((item: any) => {
          const listStatuses = [
            item?.whitelistSubmission?.self_twitter_status || item?.self_twitter_status,
            item?.whitelistSubmission?.partner_twitter_status || item?.partner_twitter_status,
            item?.whitelistSubmission?.self_channel_status || item?.self_channel_status,
            item?.whitelistSubmission?.partner_channel_status || item?.partner_channel_status
          ];
          const whitelistStatus = (!(listStatuses.includes(0) || listStatuses.includes(2) || listStatuses.includes(3))) ? 'Completed' : 'Pending';
          return ({
            id: item.id,
            email: item.email,
            wallet_address: item.wallet_address,
            level: TIERS[item.level],
            whitelistStatus
          })
        }));
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          csvLink?.current?.link.click();
        }, 100);
      }
      else {
        setParticipants([]);
        dispatch(alertFailure('Download failed!'));
      }
    }
    catch {
      setParticipants([]);
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
    { label: "Whiteist Submisson", key: "whitelistStatus" },
  ];

  return (
    <>
      <CSVLink
        ref={csvLink}
        style={{ display: 'none' }}
        data={winners}
        headers={headers}
        filename={`${moment().format('YYYYMMDD')}-participantlist.csv`}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: 10 }}
        onClick={getAllParticipants}
      > Export Participant</Button>
    </>
  )
};

export default UserParticipantsExportButton;
