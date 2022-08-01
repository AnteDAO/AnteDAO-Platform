import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
import { convertDateTimeToUnix } from '../../utils/convertDate';
import useStyles from './style';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import Button from '../../components/Base/ButtonLink';
import AdminRow from './AdminRow/AdminRow'
import { adminRoute } from "../../utils";
import SearchForm from "./SearchForm";
import { getAdminList } from "../../request/admin";
import NetworkWarningBanner from '../../components/Base/RightDefaultLayout/NetworkWarningBanner';
import { getOwnerWalletAddress } from '../../store/actions/campaign';
import { APP_NETWORK_NAMES, ETH_CHAIN_ID } from '../../constants';
import NetworkWaningPolygon from '../NetworkChange/NetworkWaningPolygon';

const tableHeaders = ["WALLET", "EMAIL", "NAME"];

const AdminList: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const loginUser = useSelector((state: any) => state.user).data;
  // const { page = 1, lastPage, data: campaigns } = useSelector(( state: any ) => state.campaigns.data);
  const { wallet_address, currentNetworkId } = useSelector((state: any) => {
    return {
      ...state,
      currentNetworkId: state.userCurrentNetwork.currentNetworkId,
      wallet_address: state.user.data.wallet_address,
    };
  });
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState(false);
  const [currentOpen, setCurrentOpen] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [finishTime, setFinishTime] = useState<Date | null>(null);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [addressOwner, setAddressOwner] = useState<any>("");
  const checkNetWork = currentNetworkId !== ETH_CHAIN_ID;


  const getAdminListInfo = async (currentPage: any, query: any, startTime: any, finishTime: any, filter: any) => {
    const queryParams = {
      page: currentPage,
      searchQuery: query,
    };

    try {
      setLoading(true);
      const resObject = await getAdminList(queryParams);
      if (resObject.status === 200) {
        const {  page, lastPage, data } = resObject.data;
        setPage(page);
        setLastPage(lastPage);
        setAdmins(data);
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

  useEffect(() => {
    handleCampaignQuery(currentPage, query, startTime, finishTime, filter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, query, startTime, finishTime, filter]);

  const handlePaginationChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  const handleCampaignSearch = (event: any) => {
    setCurrentPage(1);
    setQuery(event.target.value);
  };

  const handleCampaignQuery = (currentPage: number, query: string, startTime: Date | null, finishTime: Date | null, filter: boolean) => {
    getAdminListInfo(currentPage, query, convertDateTimeToUnix(startTime), convertDateTimeToUnix(finishTime), filter);
  };

  const handleCurrentOpenSet = (id: string) => {
    setCurrentOpen(id);
  };
  useEffect(() => {
    const getOwner = async () => {
      if (currentNetworkId) {
        const addressOwner = await getOwnerWalletAddress(
          APP_NETWORK_NAMES[currentNetworkId] || "",
        );
        setAddressOwner(addressOwner);
      }
    };
    getOwner();
  }, [currentNetworkId]);




  return (
    <DefaultLayout>
      {checkNetWork ? <NetworkWaningPolygon /> : <></>}
      <NetworkWarningBanner />
      <div className={classes.header}>
        <div className="header-left">
          <Button to={adminRoute('/admin-create')} text={'Create New Admin'} icon={'icon_plus.svg'}
            disabled={Boolean(addressOwner !== wallet_address) || checkNetWork}
          />
        </div>
        <SearchForm
          startTime={startTime}
          setStartTime={setStartTime}
          finishTime={finishTime}
          setFinishTime={setFinishTime}
          setCurrentPage={setCurrentPage}
          handleCampaignSearch={handleCampaignSearch}
          placeholder='Search by Wallet, Email'
        />
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
                  admins && admins.length > 0 && admins.map((admin: any, index: number) => (
                    <AdminRow key={admin.id} currentOpen={currentOpen} setCurrentOpen={handleCurrentOpenSet} admin={admin} isOwner={addressOwner === wallet_address && !checkNetWork} />
                  ))
                }
              </TableBody>
            </Table>
          )}
        {
          failure ? <p className={classes.errorMessage}>{failure}</p> : ((!admins || admins.length === 0) && !loading) ? <p className={classes.noDataMessage}>There is no data</p> : (
            <>
              {admins && lastPage > 1 && <Pagination page={currentPage} className={classes.pagination} count={lastPage} onChange={handlePaginationChange} variant="outlined" shape="rounded" />}
            </>
          )
        }
      </TableContainer>
    </DefaultLayout>
  )
};

export default AdminList;
