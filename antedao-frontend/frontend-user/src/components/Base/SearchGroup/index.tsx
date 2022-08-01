import { useCommonStyle } from '../../../styles';
import useStyles from './style';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ClickAwayListener, isWidthDown } from '@material-ui/core';
import useFetch from '../../../hooks/useFetch';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';

const iconSearch = "images/icons/search.svg";

const LIMIT_PC: number = 10;

const SearchGroup = (props: any) => {
    const styles = useStyles();
    const commonStyle = useCommonStyle();
    const { data: appChain } = useSelector((state: any) => state.appNetwork);
    const { data: connector } = useSelector((state: any) => state.connector);
    const [open, setOpen] = useState(false);

    const getPoolsPrefixUri = () => {
        let uri = "/pools";
        return uri;
    };

    const [condition, setCondition] = useState<any>({
        limit: isWidthDown("xs", props.width), LIMIT_PC,
        page: 1,
        title: "",
    });
    
    const { data } = useFetch<any>(
        `${getPoolsPrefixUri()}?page=${condition?.page}&title=${condition?.title}`,
    );
    useEffect(() => {
        setCondition({ ...condition });
        // eslint-disable-next-line
    }, [appChain, connector]);

    const handleSearch = debounce((e: any) => {
        setCondition({ ...condition, title: e.target.value?.toString(), page: 1 });
    }, 500);

    const handleClickAway = () => {
        setOpen(false);
    };
    const handleClick = () => {
        setOpen(true);
    };
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={`${styles.searchGroup} ${props.customClass}`}>
                <input
                    placeholder="Search everything"
                    className={commonStyle.nnn1424h}
                    onChange={handleSearch}
                    onFocus={handleClick}
                />
                <img alt="search-icon" src={iconSearch} />
                {open && data?.data.length > 0  ? (
                    <ul className={styles.listbox}>
                        {data?.data.map((pool: any, index: any) => (
                            <Link to={`/buy-token/${pool.id}`} key={pool.id}>
                                <li>
                                    {pool.title} ({pool.symbol})
                                </li>
                            </Link>

                        ))}
                    </ul>
                ) : (open && !data?.data.length &&
                    <ul className={styles.listbox}>
                        <li>No Data</li>
                    </ul>
                )}
            </div>
        </ClickAwayListener  >
    );
};

export default SearchGroup;
