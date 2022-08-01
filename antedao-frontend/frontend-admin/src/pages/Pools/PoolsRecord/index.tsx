import React, { useEffect } from 'react';
import { TableRow, TableCell, DialogContent, Tooltip, Popper } from '@material-ui/core';
import useComponentVisible from '../../../hooks/useComponentVisible';
import { Link } from 'react-router-dom';
import moment from "moment";

import useStyles from './style';
import { adminRoute } from "../../../utils";
import { DATETIME_FORMAT } from '../../../constants';

type CampaignProps = {
  id: string;
  title: string;
  token: string;
  start_time: number;
  finish_time: number;
  affiliate: number;
  tokenGet: number;
  ethFor: number;
  campaign_hash: string;
  symbol: string;
  is_pause: number;
  blockchain_status: number;
  is_deploy: number;
}

type CampaignsRecordProps = {
  campaign: CampaignProps;
  currentOpen: string;
  setCurrentOpen: (id: string) => void;
}

const CampaignsRecord: React.FC<CampaignsRecordProps> = (props: CampaignsRecordProps) => {
  const { campaign, currentOpen, setCurrentOpen } = props;
  const classes = useStyles();
  const { ref, isVisible, setIsVisible } = useComponentVisible();

  useEffect(() => {
    currentOpen && setCurrentOpen("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign]);

  useEffect(() => {
    setIsVisible(campaign.id === currentOpen);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOpen]);

  const getCampaignStatus = (campaign: CampaignProps) => {
    switch (campaign.is_deploy) {
      case 0:
        return 'Created';
      case 1:
        return 'Deployed';
      case 2:
        return 'Deploying';
    }
    return '';
  };

  return (
    <TableRow
      key={campaign.id}
      ref={ref}
      className={classes.tableRow}
      component={Link}
      to={adminRoute(`/campaign-detail/${campaign.id}`)}>
      <TableCell className={classes.tableCellTitle} component="td" scope="row">
        <Tooltip title={<p style={{ fontSize: 15 }}>{campaign.title}</p>}>
          <span className={classes.wordBreak}>
            {campaign.title}
          </span>
        </Tooltip>
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        {!!campaign.start_time ?
          moment.unix(campaign.start_time).format(DATETIME_FORMAT)
          : '-'
        }
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        {!!campaign.finish_time ?
          moment.unix(campaign.finish_time).format(DATETIME_FORMAT)
          : '-'
        }
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        <Tooltip title={<p style={{ fontSize: 15 }}>{campaign.symbol}</p>}>
          <span className={classes.wordBreak} style={{ width: 100, textAlign:'center'}}>
            {campaign.symbol}
          </span>
        </Tooltip>
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        <div className={classes.tableCellFlex}>
          <div className="left">
            <Tooltip title={<p style={{ fontSize: 15 }}>{getCampaignStatus(campaign)}</p>}>
              <span>
                {getCampaignStatus(campaign)}
              </span>
            </Tooltip>
          </div>
          <div className="right">
            <img src='/images/icon_menu.svg' alt="icon-menu" onClick={(e) => {
              e.preventDefault();
              if (campaign.id === currentOpen && isVisible) {
                setIsVisible(false);
                setCurrentOpen("");
                return;
              }
              setCurrentOpen(campaign.id);
              setIsVisible(true);
            }} />
            <Popper
              open={isVisible}
              disablePortal
              className={classes.editDialog}
            >
              <DialogContent className={classes.editDialogContent}>
                <Link className={`${classes.editDialogView} dialog-cta`}
                  to={
                    adminRoute(`/campaign-detail/${campaign.id}`)
                  }
                >View</Link>
              </DialogContent>
            </Popper>
          </div>
        </div>
      </TableCell>
    </TableRow>
  )

};

export default CampaignsRecord;
