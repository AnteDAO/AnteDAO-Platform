
import {useEffect, useState} from 'react';
import { Paper, Tooltip, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, IconButton, Collapse, Box, Hidden, Link, Backdrop, CircularProgress } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Pagination from '@material-ui/lab/Pagination';
import { numberWithCommas } from "../../../utils/formatNumber";
import useAuth from '../../../hooks/useAuth';
import axios from '../../../services/axios';
import { getEtherscanTransactionLink } from "../../../utils/network";
import {convertTimeToStringFormat} from "../../../utils/convertDate";
import ModalShowDetail from "./ModalShowDetail";
import useStyles from './style';

function Row(props: any) {
  const styles = useStyles();
  const { row, collapseAll, changeCollapseAll } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(collapseAll) {
      setOpen(false)
    }
  }, [collapseAll]);

  const actionShowHidden = () => {
    setOpen(!open);
    changeCollapseAll()
  };

  const unstakedTotal = row?.unstaked?.reduce((totalUnstaked: any, unstaked: any) => totalUnstaked + parseInt(unstaked?.calculatedAmount, 10), 0);

  return (
    <>
      <TableRow className={styles.tableRow}>
        <TableCell className={`${styles.w25} ${styles.cellBodyDad}`}>
          <div className={styles.childText}>
            <div className={`${styles.w50} ${styles.cellBodyChild}`}>
              <span
                onClick={() => {
                  const url = getEtherscanTransactionLink({ appChainID: 'eth', transactionHash: row?.staked?.tx });
                  row?.staked?.tx && window.open(url as string, '_blank')
                }}
                className={`${styles.color6398FF} ${styles.stakedTx}`}
              >
                {row?.staked?.tx}
              </span>
            </div>
            <div className={`${styles.w50} ${styles.cellBodyChild}`}>
              {row?.staked?.amount ? numberWithCommas(row?.staked?.amount?.toString()) : '0'}
              &nbsp;{row?.symbol === 'UPKF' ? 'LP-PKF' : row?.symbol}
            </div>
          </div>
        </TableCell>
        <TableCell className={`${styles.w25} ${styles.cellBodyDad}`} component="th" scope="row">
          <div className={styles.childText}>
            <div className={`${styles.w50} ${styles.cellBodyChild} ${open ? 'hidden' : 'show'}`}>
              {row?.unstaked?.length} txn
              {
                row?.unstaked?.length > 0 &&
                <IconButton aria-label="expand row" size="small" onClick={() => actionShowHidden()}>
                  {open ? <KeyboardArrowUpIcon className={styles.btnHidden} /> : <KeyboardArrowDownIcon className={styles.btnShow} />}
                </IconButton>
              }
            </div>
            <div className={`${styles.w50} ${styles.cellBodyChild}`}>
              {row?.unstaked ? numberWithCommas(unstakedTotal.toString()) : '0'}
              &nbsp;{row?.symbol === 'UPKF' ? 'LP-PKF' : row?.symbol}
            </div>
          </div>
        </TableCell>
        <TableCell className={`${styles.w50} ${styles.cellBodyDad}`} align="center">
          <div className={styles.childText}>
            <div className={`${styles.w25} ${styles.cellBodyChild}  ${styles.minW124}`}>
              {row?.balance}
              &nbsp;{row?.symbol === 'UPKF' ? 'LP-PKF' : row?.symbol}
            </div>
            <div className={`${styles.w25} ${styles.cellBodyChild}`}>
              {row?.days ? numberWithCommas(row?.days?.toString()) : '0'} days
            </div>
            <div className={`${styles.w25} ${styles.cellBodyChild}`}>
              {row?.percent ? numberWithCommas(row?.percent?.toString()) : '0'} %/day
            </div>
            <div className={`${styles.w25} ${styles.cellBodyChild}`}>
              {row?.points ? numberWithCommas(row?.points?.toString()) : '0'}
            </div>
          </div>
        </TableCell>
      </TableRow>

      {
        open &&
        <TableRow>
          <TableCell style={{ padding: 0, border: 0}} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box className={styles.boxHistory}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow className={styles.tableRowHistory}>
                      <TableCell>Unstake Txn Hash</TableCell>
                      <TableCell>Nullified Value / Unstake Value</TableCell>
                      <TableCell>
                        Remaining Unstake Value
                        <Tooltip title="Remaining Unstake Value = [Unstake Value] - [Nullified Value]" placement="top">
                          <img className={styles.iconInfo}  src="/images/account_v3/icons/icon_info.svg" alt="" />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.unstaked?.map((unstaked: any, i: number) => (
                      <TableRow key={i} className={styles.tableRowHistory}>
                        <TableCell>
                          <span
                            onClick={() => {
                              const url = getEtherscanTransactionLink({ appChainID: 'eth', transactionHash: unstaked?.tx });
                              unstaked?.tx && window.open(url as string, '_blank')
                            }}
                            className={`${styles.color6398FF} ${styles.unStakedTx}`}
                          >
                            {unstaked?.tx}
                          </span>
                        </TableCell>
                        <TableCell>
                          {unstaked?.calculatedAmount ? numberWithCommas(unstaked?.calculatedAmount?.toString()) : '0'}
                          /
                          {unstaked?.unstakedAmount ? numberWithCommas(unstaked?.unstakedAmount?.toString()) : '0'}
                        </TableCell>
                        <TableCell>
                          {unstaked?.remainingAmount ? numberWithCommas(unstaked?.remainingAmount?.toString()) : '0'}
                          &nbsp;{row?.symbol === 'UPKF' ? 'LP-PKF' : row?.symbol}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      }
    </>
  );
};

function RowMobile(props: any) {
  const styles = useStyles();
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const { row } = props;

  return (
    <>
      <ul className={styles.rowMobile}>
        <li className={styles.cellMobile}>
          <div className={styles.nameCellMobile}>Stake Txn Hash</div>
          <div className={styles.valueCellMobile}>{row?.staked?.amount ? numberWithCommas(row?.staked?.amount?.toString()) : '0'}</div>
        </li>
        <li className={styles.cellMobile}>
          <div className={styles.nameCellMobile}>RKPs</div>
          <div className={styles.valueCellMobile}>{row?.balance ? numberWithCommas(row?.balance?.toString()) : '0'}</div>
        </li>
        <li className={styles.cellMobile}>
          <div className={styles.nameCellMobile}>Action</div>
          <div className={styles.valueCellMobile}><Link onClick={() => setOpenModalDetail(true)}>View Detail</Link></div>
        </li>
      </ul>

      <ModalShowDetail
        openModalDetail={openModalDetail}
        closeModalDetail={() => setOpenModalDetail(false)}
        data={row}
      />
    </>
  )
}

const PointHistory = (props: any) => {
  const styles = useStyles();
  const { connectedAccount} = useAuth();
  const [collapseAll, setCollapseAll] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hideTxn, setHideTxn] = useState(false);
  const [dataHistories, setDataHistories] = useState({}) as any;
  const [loadingGetHistory, setLoadingGetHistory] = useState(false);
  const [oldHistory, setOldHistory] = useState(true);

  const getUserHistory = async () => {
    const response = await axios.get(`/reputation/histories/${connectedAccount}?hideZeroTx=${hideTxn}&page=${currentPage}&limit=10`);

    if (response.data) {
      if (response.data.status === 200) {
        setDataHistories(response?.data?.data);
        setTotalPage(response?.data?.data?.rkpOldStakedHistories?.lastPage);
        setLoadingGetHistory(false);
      }

      if (response.data.status !== 200) {
        setTotalPage(1);
        setDataHistories({});
        setLoadingGetHistory(false);
      }
    }
  };

  const changeHistoryTab = () => {
    if (!oldHistory) {
      setTotalPage(dataHistories.rkpOldStakedHistories?.lastPage);
    } else {
      setTotalPage(dataHistories.rkpNewStakedHistories?.lastPage);
    }
    setOldHistory(!oldHistory)
  }

  useEffect(() => {
    setLoadingGetHistory(true);
    getUserHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoadingGetHistory(true);
    getUserHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideTxn, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setDataHistories({});
    setLoadingGetHistory(true);
    getUserHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount]);

  const changeCollapseAll = () => {
    setCollapseAll(false)
  }

  return (
    <div className={styles.tabPointHistory}>

      <div className={styles.infoTab}>
        {/* <div className={styles.intemInfoTab}>
          <div className={styles.nameInfoTab}>From KSM Contribution</div>
          <div className={styles.valueInfoTab}>{dataHistories?.totalEarned ? numberWithCommas(dataHistories?.rkpFromKSM?.toString()) : '0'} RKPs</div>
        </div> */}
        <div className={styles.intemInfoTab}>
          <div className={styles.nameInfoTab}>From Staking Transactions (Old SC)</div>
          <div className={styles.valueInfoTab}>{dataHistories?.rkpFromOldStaked ? numberWithCommas(dataHistories?.rkpFromOldStaked?.toString()) : '0'} RKPs</div>
          <div className={styles.noteInfoTab}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.02734 0C3.18254 0 0 3.12785 0 6.97266C0 10.8175 3.18254 14 7.02734 14C10.8721 14 14 10.8175 14 6.97266C14 3.12785 10.8721 0 7.02734 0ZM10.4787 9.26379C10.7986 9.58371 10.7986 10.1041 10.4787 10.4243C10.1612 10.7414 9.64086 10.7466 9.3182 10.4243L7.02734 8.13258L4.68152 10.4245C4.3616 10.7445 3.84125 10.7445 3.52105 10.4245C3.20113 10.1046 3.20113 9.58426 3.52105 9.26406L5.81246 6.97266L3.52105 4.68125C3.20113 4.36105 3.20113 3.8407 3.52105 3.52078C3.84125 3.20086 4.3616 3.20086 4.68152 3.52078L7.02734 5.81273L9.3182 3.52078C9.63758 3.20141 10.1579 3.20031 10.4787 3.52078C10.7986 3.8407 10.7986 4.36105 10.4787 4.68125L8.18727 6.97266L10.4787 9.26379Z" fill="#D01F36"/>
          </svg> The points will be eliminated after {convertTimeToStringFormat(new Date(1634688000000))}</div>
        </div>
        <div className={styles.intemInfoTab}>
          <div className={styles.nameInfoTab}>From Staking Transactions (New SC)</div>
          <div className={styles.valueInfoTab}>{dataHistories?.rkpFromNewStaked ? numberWithCommas(dataHistories?.rkpFromNewStaked?.toString()) : '0'} RKPs</div>
        </div>
        <div className={styles.intemInfoTab}>
          <div className={styles.nameInfoTab}>Total earned points </div>
          <div className={styles.valueInfoTab}>{dataHistories?.totalEarned ? numberWithCommas(dataHistories?.totalEarned?.toString()) : '0'} RKPs</div>
        </div>
      </div>

      <div className={styles.headTabTable}>
        <div className={styles.leftHeadTabTable}>Transaction List from:
        </div>
      </div>
      <div className={styles.headTabTable}>
        <div className={styles.leftHeadTabTable}>
          <div className={styles.historySwitchContainer} onClick={changeHistoryTab}>
            <div className={ oldHistory ? styles.historyTabActive : styles.historyTab }>Old Smart Contract</div>
            <div className={ !oldHistory ? styles.historyTabActive : styles.historyTab }>New Smart Contract</div>
          </div>
        </div>
        <div className={styles.rightHeadTabTable}>
          <label className={styles.boxChecked}>
            <span className={`checkmark ${collapseAll ? 'checked' : ''}`}></span>
            <input type="checkbox" checked={collapseAll} onChange={() => setCollapseAll(!collapseAll)}/>
            Collapse All
          </label>

          <label className={styles.boxChecked}>
            <span className={`checkmark ${hideTxn ? 'checked' : ''}`}></span>
            <input type="checkbox" checked={hideTxn} onChange={() => {
              setHideTxn(!hideTxn);
              setCurrentPage(1)
            }}/>
            Hide Txn with 0 RKPs
          </label>
        </div>
      </div>

      <Hidden smDown>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table aria-label="collapsible table">
            <TableHead  className={styles.tableHead}>
              <TableRow>
                <TableCell className={`${styles.w25} ${styles.cellHeadDad}`} align="center" >
                  <div className={styles.dadText}>Stake (S)</div>
                  <div className={styles.childText}>
                    <div className={`${styles.w50} ${styles.cellHeadChild}`}>Txn Hash</div>
                    <div className={`${styles.w50} ${styles.cellHeadChild}`}>Value</div>
                  </div>
                </TableCell>
                <TableCell className={`${styles.w25} ${styles.cellHeadDad}`}  align="center">
                  <div className={styles.dadText}>Unstake (U)</div>
                  <div className={styles.childText}>
                    <div className={`${styles.w50} ${styles.cellHeadChild}`}>Txn Hash</div>
                    <div className={`${styles.w50} ${styles.cellHeadChild}`}>Value</div>
                  </div>
                </TableCell>
                <TableCell className={`${styles.w50} ${styles.cellHeadDad}`} align="center">
                  <div className={styles.dadText}>Reputation</div>
                  <div className={styles.childText}>
                    <div className={`${styles.w25} ${styles.cellHeadChild} ${styles.minW124}`}>Stake Balance <br/>(S) - (U)</div>
                    <div className={`${styles.w25} ${styles.cellHeadChild}`}>Age</div>
                    <div className={`${styles.w25} ${styles.cellHeadChild}`}>Bonus</div>
                    <div className={`${styles.w25} ${styles.cellHeadChild}`}>RKPs</div>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { oldHistory ?
                  dataHistories?.rkpOldStakedHistories?.data?.map((row: any, index: number) => (
                    <Row key={index} row={row} collapseAll={collapseAll} changeCollapseAll={changeCollapseAll}/>
                  )) :
                  dataHistories?.rkpNewStakedHistories?.data?.map((row: any, index: number) => (
                      <Row key={index} row={row} collapseAll={collapseAll} changeCollapseAll={changeCollapseAll}/>
                  ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Hidden>

      <Hidden mdUp>
        <div className={styles.tableMobile}>
          { oldHistory ?
              dataHistories?.rkpOldStakedHistories?.data?.map((row: any, index: number) => (
                  <RowMobile key={index} row={row} collapseAll={collapseAll} changeCollapseAll={changeCollapseAll}/>
              )) :
              dataHistories?.rkpNewStakedHistories?.data?.map((row: any, index: number) => (
                  <RowMobile key={index} row={row} collapseAll={collapseAll} changeCollapseAll={changeCollapseAll}/>
              ))
          }
        </div>
      </Hidden>

      <div className={styles.pagination}>
        {
          totalPage > 1 && <Pagination
            count={totalPage}
            color="primary"
            style={{ marginTop: 30 }} className={styles.pagination}
            onChange={(e: any, value: any) => {
              setCurrentPage(value)
            }}
            page={currentPage}
          />
        }
      </div>

      <Backdrop open={loadingGetHistory} className={styles.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default PointHistory;
