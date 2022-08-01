import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
/* import { CircularProgress } from '@material-ui/core'; */
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Skeleton from '@material-ui/lab/Skeleton';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetch from '../../../hooks/useFetch';
import useStyles from './style';


const headers = ['No', 'Wallet Address'];

type LotteryWinnersProps = {
  poolId: number | undefined;
  width: any;
  userWinLottery: boolean | undefined;
  pickedWinner?: boolean;
  maximumBuy: number | undefined;
  purchasableCurrency: string | undefined;
  verifiedEmail: boolean | undefined;
  handleWiners: (total: number) => void;
}

const shortenAddress = (address: string, digits: number = 14) => {
  return `${address.substring(0, digits)}*************${address.substring(41 - 14)}`
}

const LotteryWinners: React.FC<LotteryWinnersProps> = (props: LotteryWinnersProps) => {
  const styles = useStyles();
  const { poolId, pickedWinner, handleWiners } = props;
  const [input, setInput] = useState("");
  const [searchedWinners, setSearchedWinners] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { data: winnersList, loading } = useFetch<any>(`/user/winner-${!input ? 'list' : 'search'}/${poolId}?page=${currentPage}&limit=20&${input ? `search=${input}` : ''}`);

  const searchDebounce = () => {
    if (winnersList) {
      setTotal(winnersList.total);
      if (currentPage > 1) {
        setSearchedWinners([...searchedWinners, ...winnersList.data]);
      }
      else {
        setSearchedWinners(winnersList.data);
      }
      handleWiners(winnersList.total)
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(searchDebounce, [winnersList]);

  const handleInputChange = debounce((e: any) => {
    ReactDOM.unstable_batchedUpdates(() => {
      setCurrentPage(1);
      setInput(e.target.value);
    });
  }, 500);

  if (!pickedWinner) return <></>;

  return (
    <div className={styles.LotteryWinners} id={'winner-list'}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={6}>
          <div className={styles.tableSearchWrapper}>
            <input
              type="text"
              name="lottery-search"
              className={styles.tableSearch}
              placeholder="Search first or last 14 digits of your wallet address"
              onChange={handleInputChange}
            />
            <img src="/images/search.svg" className={styles.tableSearchIcon} alt="search-icon" />
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <InfiniteScroll
            className={styles.infiniteContainer}
            height={274}
            dataLength={total}
            next={() => setCurrentPage(currentPage + 1)}
            hasMore={true}
            loader={loading &&
              <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} aria-label="simple table">
                  <TableBody>
                    {(new Array(3)).fill(0).map((row: any, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Skeleton width="100%" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Skeleton width="100%" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
            refreshFunction={() => setCurrentPage(1)}
            pullDownToRefresh={isWidthDown('sm', props.width)}
            pullDownToRefreshThreshold={isWidthDown('sm', props.width) ? 50 : 0}
            releaseToRefreshContent={
              <div className={styles.refreshContainer}>
                <h3 className={styles.refreshText}>&#8593; Release to refresh</h3>
              </div>
            }
          >
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table className={styles.table} aria-label="simple table">
                <TableHead className={styles.tableHeaderWrapper}>
                  <TableRow>
                    {headers.map(header => (
                      <TableCell key={header} className={styles.tableHeader}>
                        <span>
                          {header}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!(loading && currentPage === 1) && searchedWinners ?
                    searchedWinners.map((row: any, index) => (
                      <TableRow key={index} className={styles.tableRow}>
                        <TableCell component="td" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {isWidthDown('md', props.width) ?
                            <Tooltip title={<p>{row.wallet_address}</p>}>
                              <p className={styles.p}>
                                {shortenAddress(row.wallet_address)}
                              </p>
                            </Tooltip>
                            :<p className={styles.p}>{row.wallet_address}</p>
                          }
                        </TableCell>
                      </TableRow>
                    ))
                    : ""}
                </TableBody>
              </Table>
            </TableContainer>
          </InfiniteScroll>
        </Grid>
      </Grid>
    </div >
  )
}

export default withWidth()(LotteryWinners);
