
import { useCommonStyle } from "../../styles";
import useStyles from './style';

const SearchForm = (props: any) => {
  const classes = useStyles();
  const commonStyle = useCommonStyle();
  const { handleSearch, seachValue } = props;
  return (
    <>
      <div className={classes.headerRight}>
        <div className={commonStyle.boxSearch}>
          <input className={commonStyle.inputSearch} value={seachValue} onChange={handleSearch} placeholder="Search by Wallet" />
          <img className={commonStyle.iconSearch} src="/images/icon-search.svg" alt="" />
        </div>
      </div>
    </>
  )
};

export default SearchForm;
