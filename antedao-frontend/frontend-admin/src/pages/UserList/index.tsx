import { MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import NetworkWarningBanner from '../../components/Base/RightDefaultLayout/NetworkWarningBanner';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import { TIERS } from "../../constants";
import { getUserList, reloadCachedUserList } from "../../request/user";
import { alertFailure, alertSuccess } from "../../store/actions/alert";
import ExportButton from "./ExportButton";
import SearchForm from "./SearchForm";
import useStyles from './style';
import useDebounce from './useDebounce';
import UserRow from './UserRow';

const tableHeaders = ["WALLET", "STAKED", "TIER", "TELEGRAM", "UPDATED AT"];

const UserList: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const limit = 10;
  const [users, setUsers] = useState([]);
  const [selectedTier, setSelectedTier] = useState(-1)
  // const [filteredUsers, setFilteredUsers] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const debounceSearch = useDebounce(query, 1000);

  const getUserListInfo = async (query: any, currentPage: any, selectedTier: any) => {
    const queryParams = {
      page: currentPage,
      tier: selectedTier >= 0 ? selectedTier : undefined,
      walletAddress: query,
      limit,
    };
    try {
      setLoading(true);
      const resObject = await getUserList(queryParams);

      if (resObject.status === 200) {
        const { data, total, page } = resObject.data;
        setUsers(data);
        setLastPage(Math.round(total / limit));
        setPage(page);
        setFailure(false);
      } else {
        setFailure(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setFailure(true);
    }
  };

  const handlePaginationChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  const handleSelectedTierChange = (event: any) => {
    setSelectedTier(Number(event.target.value));
    setPage(1);
    setCurrentPage(1)
  }

  const handleSearch = (event: any) => {
    const value = event.target.value;
    setQuery(value.trim());
    setPage(1);
    setCurrentPage(1)
  };

  useEffect(() => {
    getUserListInfo(query, currentPage, selectedTier);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedTier, debounceSearch]);

  const handleReloadCached = async () => {
    setQuery('');
    setSelectedTier(-1);
    try {
      if (!window.confirm('This is a heavy task. Are you sure to continue?')) {
        return;
      }
      await reloadCachedUserList();
      dispatch(alertSuccess('Reloading, please be patient'));
    } catch (err: any) {
      dispatch(alertFailure('Reload failed!'));
    }
  }

  return (
    <DefaultLayout>
      <NetworkWarningBanner />
      <div className={classes.header}>
        <div className="header-left">
          <ExportButton />
          <button
            className={classes.exportBtn}
            style={{ color: 'white', marginLeft: '10px' }}
            onClick={handleReloadCached}
          >
            Reload All
          </button>
        </div>

        <SearchForm
          seachValue={query}
          handleSearch={handleSearch}
        />
      </div>

      <div className={classes.selectSearch}>
        <Select
          name="minTier"
          value={selectedTier}
          onChange={handleSelectedTierChange}
        >
          <MenuItem value={-1}>
            All Tiers
          </MenuItem>
          {
            TIERS.map((value, index) => {
              return (
                <MenuItem
                  key={index}
                  value={index}
                >
                  {value}
                </MenuItem>
              )
            })
          }
        </Select>
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
                  users && users.length > 0 && users.map((user: any, index: number) => (
                    <UserRow key={user.id} user={user} getUserListInfo={getUserListInfo} />
                  ))
                }
              </TableBody>
            </Table>
          )}
        {
          failure ? <p className={classes.errorMessage}>{failure}</p> : ((!users || users.length === 0) && !loading) ? <p className={classes.noDataMessage}>There is no data</p> : (
            <>
              {users && lastPage > 1 && <Pagination page={currentPage} className={classes.pagination} count={lastPage} onChange={handlePaginationChange} variant="outlined" shape="rounded" />}
            </>
          )
        }
      </TableContainer>
    </DefaultLayout>
  )
};

export default UserList;
