import { Checkbox, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { debounce } from 'lodash';

import Button from '../../components/Base/ButtonLink';
import NetworkWarningBanner from '../../components/Base/RightDefaultLayout/NetworkWarningBanner';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import { getCampaigns } from '../../store/actions/campaign';
import { useCommonStyle } from '../../styles';
import { adminRoute } from "../../utils";
import { convertDateTimeToUnix } from '../../utils/convertDate';
import CampaignsRecord from './PoolsRecord';
import useStyles from './style';

const tableHeaders = ["PROJECT NAME", "START", "FINISH", "TOKEN SYMBOL", "STATUS"];

const placeholder = "Search by Project Name, Token Symbol";

const Pools: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const commonStyle = useCommonStyle();

  const dispatch = useDispatch();

  const { page = 1, lastPage, data: campaigns } = useSelector((state: any) => state.campaigns.data);
  const { loading, failure } = useSelector((state: any) => state.campaigns);

  const [filter, setFilter] = useState(false);
  const [currentOpen, setCurrentOpen] = useState("");
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    handleCampaignQuery(page, query, filter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePaginationChange = (event: any, page: number) => {
    setCurrentPage(page);
    handleCampaignQuery(page, query, filter);
  }

  const handleCampaignQuery = (currentPage: number, query: string, filter: boolean) => {
    dispatch(getCampaigns(currentPage, query, convertDateTimeToUnix(null), convertDateTimeToUnix(null), filter));
  }


  const handleCurrentOpenSet = (id: string) => {
    setCurrentOpen(id);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce((newQuery) => handleCampaignQuery(currentPage, newQuery, filter), 1000),
    [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
    debounceSearch(e.target.value);
  }

  return (
    <DefaultLayout>
      <NetworkWarningBanner />
      <div className={classes.header}>
        <div className="header-left">
          <Button to={adminRoute('/campaigns/add')} text={'Create new project'} icon={'icon_plus.svg'} />
        </div>
        <div className={classes.headerRight}>
          {/* <DatePicker
            className={commonStyle.DatePicker}
            monthPlaceholder="mm"
            dayPlaceholder="dd"
            yearPlaceholder="yy"
            calendarIcon={<img src="/images/icon-calendar.svg" alt="calendar-icon" />}
            value={startTime}
            onChange={(date: any) => { setStartTime(date); setCurrentPage(1) }}
          />
          <img className={commonStyle.iconLine} src="/images/icon-line.svg" alt="" />
          <DatePicker
            className={commonStyle.DatePicker}
            monthPlaceholder="mm"
            dayPlaceholder="dd"
            yearPlaceholder="yy"
            calendarIcon={<img src="/images/icon-calendar.svg" alt="calendar-icon" />}
            value={finishTime}
            onChange={(date: any) => { setFinishTime(date); setCurrentPage(1) }}
          /> */}
          <div className={commonStyle.boxSearch}>
            <input className={commonStyle.inputSearch} onChange={handleChange} placeholder={`${placeholder}`} onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = `${placeholder}`} />
            <img className={commonStyle.iconSearch} src="/images/icon-search.svg" alt="" />
          </div>
        </div>
      </div>
      <div className={classes.refreshCampaigns}>
        <span className={classes.refreshCampaignsContainer}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedIcon"
                onChange={((e: React.ChangeEvent<HTMLInputElement>) => {
                  setFilter(e.target.checked);
                  setCurrentPage(1);
                  handleCampaignQuery(page, query, e.target.checked)
                })}
              />
            }
            label={<p className={classes.refreshCampaignsText}>Filter by your own pools</p>}
          />
        </span>
        <span className={classes.refreshCampaignsContainer} onClick={() => handleCampaignQuery(currentPage, query, filter)}>
          <CachedIcon className={`${classes.refreshCampaignsIcon} refreshCampaignsIcon`} />
          <p className={classes.refreshCampaignsText}>Click to refresh pools</p>
        </span>
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
                {
                  campaigns && campaigns.length > 0 && campaigns.map((campaign: any, index: number) => (
                    <CampaignsRecord key={campaign.id} currentOpen={currentOpen} setCurrentOpen={handleCurrentOpenSet} campaign={campaign} />
                  ))
                }
              </TableBody>
            </Table>
          )}
        {
          failure ? <p className={classes.errorMessage}>{failure}</p> : ((!campaigns || campaigns.length === 0) && !loading) ? <p className={classes.noDataMessage}>There is no data</p> : (
            <>
              {campaigns && lastPage > 1 && <Pagination variant="outlined" shape="rounded" page={currentPage} className={classes.pagination} count={lastPage} onChange={handlePaginationChange} />}
            </>
          )
        }
      </TableContainer>
    </DefaultLayout>
  )
}

export default Pools;
