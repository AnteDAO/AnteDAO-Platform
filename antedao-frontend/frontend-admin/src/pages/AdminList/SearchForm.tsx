import { debounce } from "lodash";
import React from 'react';
import { useCommonStyle } from "../../styles";
import useStyles from './style';


const SearchForm = (props: any) => {
  const classes = useStyles();
  const commonStyle = useCommonStyle();
  const { handleCampaignSearch,placeholder
  } = props;
  const delayCampaignSearch = debounce(handleCampaignSearch, 500);

  return (
    <>
      <div className={classes.headerRight}>

        <div className={commonStyle.boxSearch}>
          <input className={commonStyle.inputSearch} onChange={delayCampaignSearch} placeholder={placeholder ? placeholder :"Search" } />
          <img className={commonStyle.iconSearch} src="/images/icon-search.svg" alt="" />
        </div>
      </div>
    </>
  )
};

export default SearchForm;
