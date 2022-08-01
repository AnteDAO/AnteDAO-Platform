/* eslint-disable react-hooks/exhaustive-deps */
import Pagination from "@material-ui/lab/Pagination";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import PoolList from "../../components/Pool/PoolList";
import useFetch from "../../hooks/useFetch";
import useCommonStyle from "../../styles/CommonStyle";
import useStyles from "./style";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import { SEO_IDO_LIST } from "../../utils/seoConfig";

const iconSearch = "images/icons/search.svg";

const LIMIT_MOBILE: number = 4;
const LIMIT_PC: number = 10;

const Pools = (props: any) => {
	const styles = useStyles();
	const commonStyle = useCommonStyle();
	const { data: appChain } = useSelector((state: any) => state.appNetwork);
	const { data: connector } = useSelector((state: any) => state.connector);
	const { connectedAccount } = useAuth();

	const [condition, setCondition] = useState<any>({
		limit: isWidthDown("xs", props.width) ? LIMIT_MOBILE : LIMIT_PC,
		page: 1,
		title: "",
	});

	const getPoolsPrefixUri = () => {
		let uri = connectedAccount ? `/pools?wallet_address=${connectedAccount}&` : "/pools?";
		return uri;
	};

	const { loading, data } = useFetch<any>(
		condition.title ? 
		`${getPoolsPrefixUri()}page=${condition?.page}&title=${encodeURIComponent(condition.title,)}` 
		:`${getPoolsPrefixUri()}page=${condition?.page}`,
	);

	useEffect(() => {
		setCondition({ ...condition });
	}, [appChain, connector]);

	useEffect(() => {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		};
		return () => {
			window.removeEventListener("onbeforeunload", () => window.scrollTo(0, 0));
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 300);
	}, [condition.page]);

	const handleSearch = debounce((e: any) => {
		setCondition({ ...condition, title: e.target.value?.toString(), page: 1 });
	}, 500);

	const handleChangePage = (page: any) => {
		setCondition({ ...condition, page });
	};

	return (
		<DefaultLayout>
			<Helmet>
				<title>{SEO_IDO_LIST.TITLE}</title>
				<meta name="description" content={SEO_IDO_LIST.DES}/>

				{/* <!-- Google / Search Engine Tags --> */}
				<meta item-prop="name" content={SEO_IDO_LIST.GOOGLE_META_NAME}/>
				<meta item-prop="description" content={SEO_IDO_LIST.GOOGLE_META_DES}/>
				<meta item-prop="image" content={SEO_IDO_LIST.GOOGLE_META_IMAGE}/>
			</Helmet>
			<div className={styles.poolsContainer}>
				<PoolList
					title={
						<div className={styles.topTitle}>
							<h2>List Pools</h2>
						</div>
					}
					loading={loading}
					data={data?.data}
					classNameTitle={styles.topTitle}
					headerRight={
						<div className={styles.searchGroup}>
							<input
								type="text"
								placeholder="Search by Pool name, Token Symbol"
								className={commonStyle.nnn1424h}
								onChange={handleSearch}
							/>
							<img alt="search-icon" src={iconSearch} />
						</div>
					}
				/>
				<div className={styles.pagination}>
					<Pagination
						shape="rounded"
						count={data?.lastPage}
						color="primary"
						onChange={(e: any, value: any) => {
							if (!loading) {
								handleChangePage(value);
							}
						}}
						page={condition?.page}
					/>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default withWidth()(withRouter(Pools));
