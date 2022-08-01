import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import { utils } from "ethers";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import { deleteWhitelist, getWhitelist, setWhitelist } from '../../store/actions/captcha-whitelist';
import useStyles from './style';

const tableHeaders = ["CREATED AT", "ADDRESS", "ACTIONS"];

const Campaigns: React.FC<any> = (props: any) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { data, loading, failure } = useSelector(( state: any ) => state.whitelist);
  const whitelist = data.data
  const [currentPage, setCurrentPage] = useState(1);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    loadWhitelist();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadWhitelist = () => {
    dispatch(getWhitelist())
  }

  const handlePaginationChange = (event: any, page: number) => {
    setCurrentPage(page);
  }

  const addressInputChange = (e : any) => {
    const value = e.target.value
    if (!value || !utils.isAddress(value))  {
      setNewAddress('')
      return
    }
    setNewAddress(e.target.value)
  }

  const addWhitelist = () => {
    dispatch(setWhitelist(newAddress))
  }

  const removeWhitelist =(address: string) => {
    const result = window.confirm("Want to delete?");
    if (result) {
      dispatch(deleteWhitelist(address))
    }
  }

  return (
    <DefaultLayout>
      <div className={classes.header}>
        <div className="header-right" style={{display: 'flex', width: 400, height: 40}}>
          <span className={classes.addLabel}>Address</span>
          <input
              className={classes.addInput}
              type="text"
              name="address"
              placeholder={"user address"}
              onChange={addressInputChange}
              autoComplete={"off"}/>
          <button
              className={classes.addButton}
              disabled={!newAddress}
              onClick={addWhitelist}
          >Add</button>
        </div>
      </div>

      <TableContainer component={Paper} className={classes.tableContainer}>
        {
          loading ? (
            [...Array(10)].map((num, index) => (
            <div key={index}>
              <Skeleton className={classes.skeleton} width={'100%'} />
            </div>
          ))):  (
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
                  whitelist && whitelist.length > 0 && whitelist.map((item: any, index: number) =>  (
                      <TableRow key={index}>
                        <TableCell >{ item.created_at }</TableCell>
                        <TableCell >{ item.address }</TableCell>
                        <TableCell >
                          <button
                              className={classes.removeButton}
                              onClick={() => removeWhitelist(item.address)}
                          >Remove</button></TableCell>
                      </TableRow>
                  ))
              }
              </TableBody>
            </Table>
        )}
        {
          failure ? <p className={classes.errorMessage}>{failure}</p> : ((!whitelist || whitelist.length === 0) && !loading)  ? <p className={classes.noDataMessage}>There is no data</p> : (
            <>
              {whitelist && Math.ceil(whitelist.length / 10 ) > 1 && <Pagination page={currentPage} className={classes.pagination} count={Math.ceil(whitelist.length / 10 )} onChange={handlePaginationChange} variant="outlined" shape="rounded" />}
            </>
          )
        }
      </TableContainer>
    </DefaultLayout>
  )
}

export default Campaigns;
