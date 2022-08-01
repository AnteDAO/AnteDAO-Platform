
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { DEFAULT_LIMIT } from "../../../../constants";

const useGetList = (props: any) => {
  const { poolDetail, handleSearchFunction } = props;
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);

  const [query, setQuery] = useState('');
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInital, setIsInital] = useState(false);

  const handleCampaignSearch = (event: any) => {
    setCurrentPage(1);
    setQuery(event.target.value);
  };
  const searchDelay = debounce(handleCampaignSearch, 500);
  const search = () => {
    if (poolDetail && poolDetail.id) {
      setLoading(true);
      const searchParams = {
        search_term: query,
        page: currentPage,
        limit: DEFAULT_LIMIT,
      };
      handleSearchFunction &&
        handleSearchFunction(poolDetail.id, searchParams)
          .then((res: any) => {
            !isInital && setIsInital(true);
            setLoading(false);
            if (res?.status !== 200) {
              setFailure(true);
              return [];
            } else {
              let response = res.data || {};
              setFailure(false);
              setLastPage(response.lastPage || 1);
              (response.page !== currentPage) && setCurrentPage(response.page || 1);
              setTotalRecords(response.total || 1);

              let newData = response.data || [];
              setRows(newData);

              return newData;
            }
          });
    }
  };

  useEffect(() => {
    isInital && search();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, query, poolDetail]);

  const handlePaginationChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  return {
    rows, setRows,
    search, searchDelay,
    failure, loading,
    lastPage, currentPage, totalRecords, setCurrentPage,
    handlePaginationChange,
  }
};


export default useGetList;




