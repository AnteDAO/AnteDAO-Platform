import { useEffect } from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Button } from "@material-ui/core";
import { useCommonStyle } from "../../../../styles";
import { deleteReservesUser, getReserveUser } from "../../../../request/participants";
import { withRouter } from "react-router";
import useGetList from "../hooks/useGetList";
import useDeleteItem from "../hooks/useDeleteItem";
import useStylesTable from './style_table';
import Pagination from "@material-ui/lab/Pagination";
import { TIERS } from "../../../../constants";
import { etherscanRoute } from "../../../../utils";
import Link from "@material-ui/core/Link";
import UserReservesExportButton from './UserReservesExportButton';

function UserReserves(props: any) {
  const commonStyle = useCommonStyle();
  const classesTable = useStylesTable();
  const { poolDetail, active } = props;
  const {
    rows, setCurrentPage,
    search, searchDelay,
    failure, loading,
    lastPage, currentPage,
    handlePaginationChange,
  } = useGetList({ poolDetail, handleSearchFunction: getReserveUser });

  const {
    deleteItem
  } = useDeleteItem({
    poolDetail,
    handleDeleteFunction: deleteReservesUser,
    handleSearchFunction: search
  });

  useEffect(() => {
    if (active) {
      if (currentPage !== 1) setCurrentPage(1);
      else search();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <>
      <UserReservesExportButton
        poolDetail={poolDetail}
      />
      <div style={{ marginTop: 25, marginBottom: 10 }}>
        <input className={commonStyle.inputSearch} onChange={searchDelay} placeholder="Search reserve users" />
        <img src="/images/icon-search.svg" alt="" style={{ marginLeft: -30 }} />
      </div>
      <TableContainer component={Paper} className={`${commonStyle.tableScroll} ${classesTable.tableUserJoin}`}>
        <Table className={classesTable.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell size={'small'}>Email</TableCell>
              <TableCell align="left" size={'medium'}>Wallet Address</TableCell>
              <TableCell align="left" size={'small'}>Tier</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rows).map((row: any, index: number) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" size={'small'}>
                  {row.email}
                </TableCell>
                <TableCell align="left" size={'medium'}>
                  <Link href={etherscanRoute(row.wallet_address, poolDetail)} target={'_blank'}>
                    {row.wallet_address}
                  </Link>
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {TIERS[row.level || 0]}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => deleteItem(e, row, index)}
                  >Delete</Button>
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

export default withRouter(UserReserves);

