import { Button } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect } from 'react';
import { TIERS } from '../../../../constants';
import { deleteWinnerUser, getWinnerUser } from "../../../../request/participants";
import { useCommonStyle } from "../../../../styles";
import { etherscanRoute } from "../../../../utils";
import { nFormatterMilion } from '../../../../utils/formatNumber';
import useStyles from "../../style";
import useDeleteItem from "../hooks/useDeleteItem";
import useGetList from "../hooks/useGetList";
import PublicWinnerSetting from "./PublicWinnerSetting";
import useStylesTable from './style_table';
import UserWinnerExportButton from './UserWinnerExportButton';

function UserWinner(props: any) {
  const commonStyle = useCommonStyle();
  const classes = useStyles();
  const classesTable = useStylesTable();
  const {
    setValue, errors, control,
    poolDetail, active,
  } = props;
  const {
    rows, setCurrentPage,
    search, searchDelay,
    failure, loading,
    lastPage, currentPage,
    handlePaginationChange,
  } = useGetList({ poolDetail, handleSearchFunction: getWinnerUser });

  const {
    deleteItem
  } = useDeleteItem({
    poolDetail,
    handleDeleteFunction: deleteWinnerUser,
    handleSearchFunction: search
  });
  
  useEffect(() => {
    if (active) {
      if (currentPage !== 1) setCurrentPage(1);
      else search();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <>
      <UserWinnerExportButton
        poolDetail={poolDetail}
      />
      <div>
        <PublicWinnerSetting
          poolDetail={poolDetail}
          setValue={setValue}
          errors={errors}
          control={control}
        />
      </div>
      <div className={classes.winnerCautionMessage}>These Winner list accounts still have to check their tier when buying tokens. If you want to skip this check, please add accounts to the Reserve list.</div>
      <div style={{ marginBottom: 10 }}>
        <input className={commonStyle.inputSearch} onChange={searchDelay} placeholder="Search" />
        <img src="/images/icon-search.svg" alt="" style={{ marginLeft: -30 }} />
      </div>

      <TableContainer component={Paper} className={`${commonStyle.tableScroll} ${classesTable.tableUserJoin}`}>
        <Table className={classesTable.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="center">Wallet Address</TableCell>
              {/* <TableCell align="center">Lottery Ticket</TableCell> */}
              <TableCell align="center">Tier</TableCell>
              {/* <TableCell align="center">Min Buy</TableCell> */}
              <TableCell align="center">Max Buy</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell align="center">
                  <Link href={etherscanRoute(row.wallet_address, poolDetail)} target={'_blank'}>
                    {row.wallet_address}
                  </Link>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {TIERS[row.level || 0]}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {poolDetail?.is_deploy ? nFormatterMilion(row.max_buy) : "-"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => deleteItem(e, row, index)}
                    disabled={!!poolDetail.is_deploy}
                  >Reserve</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {failure && <p className={classesTable.errorMessage}>{failure}</p>}
        {!failure &&
          ((!rows || rows.length === 0) && !loading) ? <p className={classesTable.noDataMessage}>There is no data</p> : (
          <>
            {rows && lastPage > 1 && <Pagination page={currentPage} className={classesTable.pagination} count={lastPage} onChange={handlePaginationChange} variant="outlined" shape="rounded" />}
          </>
        )
        }
      </TableContainer>
    </>
  );
}

export default UserWinner;
