import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
import {convertDateTimeToUnix} from '../../utils/convertDate';
import useStyles from './style';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import Button from '../../components/Base/ButtonLink';
import KycUserRow from './KycUserRow/KycUserRow'
import {adminRoute} from "../../utils";
import SearchForm from "./SearchForm";
import {getKycUserList} from "../../request/kyc-user";

const countries = require('../../data/countries.json');
const countriesMapping: any = {};
// eslint-disable-next-line array-callback-return
countries.map((item: any) => {
  countriesMapping[item.code] = item.name;
});

const tableHeaders = ["ID", "EMAIL", "WALLET ADDRESS", "COUNTRY", "KYC STATUS"];

const KycUserList: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const loginUser = useSelector((state: any) => state.user).data;
  // const { page = 1, lastPage, data: campaigns } = useSelector(( state: any ) => state.campaigns.data);

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

  const getAdminListInfo = async (currentPage: any, query: any, startTime: any, finishTime: any, filter: any) => {
    const queryParams = {
      page: currentPage,
      searchQuery: query,
    };

    try {
      setLoading(true);
      const resObject = await getKycUserList(queryParams);
      if (resObject.status === 200) {
        const { page, lastPage, data } = resObject.data;
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
    handleListQuery(currentPage, query, startTime, finishTime, filter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, query, startTime, finishTime, filter]);

  const handlePaginationChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: any) => {
    setCurrentPage(1);
    setQuery(event.target.value);
  };

  const handleListQuery = (currentPage: number, query: string, startTime: Date | null, finishTime: Date | null, filter: boolean) => {
    getAdminListInfo(currentPage, query, convertDateTimeToUnix(startTime), convertDateTimeToUnix(finishTime), filter);
  };

  const handleCurrentOpenSet = (id: string) => {
    setCurrentOpen(id);
  };

  return (
    <DefaultLayout>
      <div className={classes.header}>
        <div className="header-left">
          <Button to={adminRoute('/kyc-user-create')} text={'Create New Kyc User'} icon={'icon_plus.svg'} />
        </div>
        <SearchForm
          startTime={startTime}
          setStartTime={setStartTime}
          finishTime={finishTime}
          setFinishTime={setFinishTime}
          setCurrentPage={setCurrentPage}
          handleSearch={handleSearch}
        />
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
                admins && admins.length > 0 && admins.map((admin: any, index: number) =>  (
                    <KycUserRow key={admin.id} currentOpen={currentOpen} setCurrentOpen={handleCurrentOpenSet} admin={admin} countries={countriesMapping} />
                  ))
              }
              </TableBody>
            </Table>
        )}
        {
          failure ? <p className={classes.errorMessage}>{failure}</p> : ((!admins || admins.length === 0) && !loading)  ? <p className={classes.noDataMessage}>There is no data</p> : (
            <>
              {admins && lastPage > 1 && <Pagination page={currentPage} className={classes.pagination} count={lastPage} onChange={handlePaginationChange} />}
            </>
          )
        }
      </TableContainer>
    </DefaultLayout>
  )
};

export default KycUserList;
