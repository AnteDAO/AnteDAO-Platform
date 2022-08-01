import React, {useEffect} from 'react';
import {TableCell, TableRow, Tooltip} from '@material-ui/core';
import useComponentVisible from '../../../hooks/useComponentVisible';
import {Link} from 'react-router-dom';

import useStyles from './style';
import {adminRoute} from "../../../utils";
//@ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';
//@ts-ignore
import { NotificationManager } from 'react-notifications';
import { Button } from 'antd';

type AdminProps = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  wallet_address: string;
  status: number;

}

type AdminRowProps = {
  admin: AdminProps;
  currentOpen: string;
  isOwner?:boolean;
  setCurrentOpen: (id: string) => void;
}

const AdminRecord: React.FC<AdminRowProps> = (props: AdminRowProps) => {
  const { admin, currentOpen, setCurrentOpen, isOwner } = props;
  const classes = useStyles();
  const { ref, setIsVisible } =  useComponentVisible();

  useEffect(() => {
    currentOpen && setCurrentOpen("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  useEffect(() => {
    setIsVisible(admin.wallet_address === currentOpen);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOpen]);


  
  return (
    <TableRow

      ref={ref} className={`${classes.tableRow}`} key={admin.id}
      
    >

      
      <TableCell className={classes.tableCell} align="left">
        <Link to={adminRoute(`/admin-detail/${admin.id}`)}  style={!isOwner? {pointerEvents:'none'} : {}}>
          {admin.wallet_address}
         
        </Link>
        <CopyToClipboard onCopy={() => NotificationManager.success("Copied")} text={admin.wallet_address}>
              <Button style={{minWidth: '20px',border:'none',boxShadow:'none'}}><img src="/images/icon-copy.svg" alt="" style={{maxHeight: '18px'}}/></Button>
            </CopyToClipboard>
      </TableCell>

      <TableCell className={classes.tableCellTitle} component="td" scope="row">
        <Tooltip title={<p style={{ fontSize: 15 }}>{admin.email}</p>}>
              <span className={classes.wordBreak}>
                {admin.email}
              </span>
        </Tooltip>
      </TableCell>

      <TableCell className={classes.tableCellTitle} component="td" scope="row">
        <Tooltip title={<p style={{ fontSize: 15 }}>{`${admin.firstname} ${admin.lastname}`}</p>}>
              <span className={classes.wordBreak}>
                { !admin.firstname && !admin.lastname ? '-' : `${admin.firstname? admin.firstname : ''} ${admin.lastname ? admin.lastname : ''}`}
              </span>
        </Tooltip>
      </TableCell>


    </TableRow>
  )

};

export default AdminRecord;
