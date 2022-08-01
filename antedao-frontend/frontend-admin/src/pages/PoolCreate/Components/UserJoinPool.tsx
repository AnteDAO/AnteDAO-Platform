import React, { useState } from 'react';
import useStyles from "../style";
import UserParticipant from "./UserWinner/UserParticipant";
import UserWinner from "./UserWinner/UserWinner";

import { Tabs } from 'antd';
import UserReserves from "./UserWinner/UserReverse";
import { Typography } from '@material-ui/core';

const { TabPane } = Tabs;

const UserJoinPool = (props: any) => {
  const [tab, setTab] = useState("1");
  const classes = useStyles();
  const { poolDetail } = props;
  function callback(key: any) {
    setTab(key)
  }

  return (
    <>
      <Typography className={classes.exchangeRateTitle}>List User Join Pools</Typography>
      <Tabs defaultActiveKey="1" onChange={callback} style={{ minHeight: 500 }}>
        <TabPane tab="Participant" key="1" className={classes.panelUserJoin}>
          <UserParticipant poolDetail={poolDetail} active={tab === "1"} />
        </TabPane>
        <TabPane tab="Winner" key="2" className={classes.panelUserJoin}>
          <UserWinner {...props} active={tab === "2"} />
        </TabPane>
        <TabPane tab="Reserves" key="3" className={classes.panelUserJoin}>
          <UserReserves poolDetail={poolDetail} active={tab === "3"} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default UserJoinPool;
