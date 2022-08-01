import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import {
	Backdrop,
	// CircularProgress,
	FormControl,
	Hidden,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	withWidth,
} from "@material-ui/core";

import Pagination from "@material-ui/lab/Pagination";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "../../../services/axios";
import useAuth from "../../../hooks/useAuth";
import { POOL_IS_PRIVATE } from "../../../constants";
import useWalletSignature from "../../../hooks/useWalletSignature";
import { alertFailure, alertSuccess } from "../../../store/actions/alert";
import ModalWhitelistCancel from "./ModalWhitelistCancel";
import useStyles from "./style";
import Loader from "../../../components/Loader";
import { getUrl } from "../../../utils";
import PoolRow from "./PoolRow";
import { BaseRequest } from "../../../request/Request";

const limit = 7;

const listTypes = [
	{ value: 1000, babel: "All types" },
	{ value: POOL_IS_PRIVATE.MARKET, babel: "Market" },
	{ value: POOL_IS_PRIVATE.VC, babel: "VC" },
];

type FilterType = {
	type: string | number;
	babel: string;
}
type ChangeEvent = React.ChangeEvent<{ name?: string; value: unknown }>;

const MyPools = (props: any) => {
	const styles = useStyles();

	const history = useHistory();
	const dispatch = useDispatch();
	const { account } = useWeb3React();
	const { signature, signMessage } = useWalletSignature();
	const { connectedAccount } = useAuth();
	const [input, setInput] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [pools, setPools] = useState([]);
	const [poolCancel, setPoolCancel] = useState({});
	const [openModalCancel, setOpenModalCancel] = useState(false);
	const [loadingClaimInfo, setLoadingClaimInfo] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');


	const [filterType, setFilterType] = useState<FilterType>({ type: 1000, babel: "", });

	const handleChangeType = (event: ChangeEvent) => {
		const name = event.target.name as keyof typeof filterType;
		const value = event.target.value as keyof typeof filterType;
		setFilterType({
			...filterType,
			[name]: value,
		});
	};
	useEffect(() => {
		if (connectedAccount) getJoinedPool(1, input);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connectedAccount, filterType])


	const getJoinedPool = async (newPage?: number, search?: string) => {

		try {
			setLoading(true);
			const url = getUrl(`/pools/user/${connectedAccount}/all-pools-status`, {
				page: newPage || currentPage,
				limit,
				title: search,
				type: filterType.type,
				// status: filterStatus.status
			});
			const baseRequest = new BaseRequest();
			const response = await baseRequest.get(url) as any;
			const resObject = await response.json();
			if (resObject.status === 200) {
				const { lastPage, page, data } = resObject.data;
				setCurrentPage(Number(page));
				setTotalPage(lastPage);
				setPools(data);
				setLoadingClaimInfo(false);
				setLoading(false);
				setError('')
			}
			else throw (new Error("Cannot get Joined pool"))
		} catch (err: any) {
			setLoading(false);
			setLoadingClaimInfo(false);
			setPools([]);
			setError(err?.response?.message);
			setCurrentPage(1);
			setTotalPage(1);
		}
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceSearch = useCallback(debounce((newQuery: string) => getJoinedPool(1, newQuery), 1000),
		[connectedAccount, filterType]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
		setCurrentPage(1);
		debounceSearch(e.target.value);
	}

	const onShowModalCancel = async (pool: any) => {
		setPoolCancel(pool);
		if (!signature) {
			await signMessage();
		} else {
			setOpenModalCancel(true);
		}
	};

	useEffect(() => {
		if (signature && connectedAccount) {
			setOpenModalCancel(true);
		}
	}, [signature, connectedAccount]);

	const onCloseModalCancel = () => {
		setPoolCancel({});
		setOpenModalCancel(false);
	};

	const onCancelPool = async (pool: any) => {

		if (signature) {
			const config = {
				headers: {
					msgSignature: process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE,
				},
			};
			const response = (await axios.post(
				`/user/unjoin-campaign`,
				{
					signature,
					campaign_id: pool?.id,
					wallet_address: account,
				},
				config as any,
			)) as any;

			if (response.data) {
				if (response.data.status === 200) {
					setPoolCancel({});
					setOpenModalCancel(false);
					dispatch(alertSuccess("You have successfully cancelled your whitelist application."));
					getJoinedPool(currentPage, input);
				}

				if (response.data.status !== 200) {
					dispatch(alertFailure(response.data.message));
				}
			}
		}
	};

	return (
		<div className={styles.pageMyPools}>
			<h2 className={styles.title}>My Pools</h2>
			<div className={styles.des}>
				Here are all pools that you have participated in.Note:
			</div>
			<ul className={styles.listDes}>
				<li>
					You can cancel the whitelist during the whitelisting time of the pool.{" "}
				</li>
				<li>
					Pre-order function for Phoenix members.{" "}
				</li>
			</ul>
			<div className={styles.headTable}>
				<div className={styles.leftFillter}>
					<FormControl className={styles.formControlSelect}>
						<Select
							className={`${styles.selectBox}`}
							native
							IconComponent={ExpandMoreIcon}
							value={filterType.type}
							onChange={handleChangeType}
							inputProps={{
								name: "type",
								id: "list-types",
							}}
						>
							{listTypes?.map((item, index) => {
								return (
									<option value={item.value} key={index}>
										{item.babel}
									</option>
								);
							})}
						</Select>
					</FormControl>
				</div>

				<div className={styles.groupSearch}>
					<img src="/images/icons/search.svg" alt="" />
					<input
						type="text"
						placeholder="Search pool name"
						onChange={handleChange}
					/>
				</div>
			</div>

			<Hidden smDown>
				<TableContainer component={Paper} className={styles.tableContainer}>
					<Table aria-label="simple table">
						<TableHead style={{background:'#23262F'}}>
							<TableRow>
								<TableCell className={styles.tableCellHead}>
									Pool Name
								</TableCell>
								<TableCell className={styles.tableCellHead}>Type</TableCell>
								<TableCell className={styles.tableCellHead}>Status</TableCell>
								<TableCell className={styles.tableCellHead}>
									Allocation
								</TableCell>
								<TableCell className={styles.tableCellHead}>
									Pre-order
								</TableCell>
								<TableCell className={styles.tableCellHead} align="center">
									Action
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{!error && pools.map((row: any, index: number) => (
								<PoolRow
									key={index}
									history={history}
									handleCancel={onShowModalCancel}
									pool={row}
								/>

							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Hidden>

			<Hidden mdUp>
				{!error && pools.map((row: any, index: number) => (
					<PoolRow
						key={index}
						isMobile={true}
						history={history}
						handleCancel={onShowModalCancel}
						pool={row}
					/>
				))}
			</Hidden>
			{!loading && !loadingClaimInfo && !pools.length ?
				<div className={styles.empty}>
					<h2>No data</h2>
				</div>
				: ''}
			<div className={styles.pagination}>
				{totalPage > 1 && (
					<Pagination
						count={totalPage}
						color="primary"
						style={{ marginTop: 30 }}
						className={styles.pagination}
						onChange={(e: any, value: any) => {
							if (!loading) {
								getJoinedPool(value, input)
							}
						}}
						page={currentPage}
					/>
				)}
			</div>

			<ModalWhitelistCancel
				poolCancel={poolCancel}
				openModalCancel={openModalCancel}
				onCloseModalCancel={() => onCloseModalCancel()}
				onCancelPool={(pool: any) => onCancelPool(pool)}
			/>

			<Backdrop
				open={loading || loadingClaimInfo}
				className={styles.backdrop}
			>
				<Loader />
			</Backdrop>
		</div>
	);
};

export default withWidth()(withRouter(MyPools));
