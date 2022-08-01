

import { Button, TableCell, TableRow, Tooltip } from "@material-ui/core";
import BigNumber from "bignumber.js";
import * as H from 'history';
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NULL_AMOUNT, POOL_STATUS_JOINED } from "../../../constants";
import { getAccessPoolText } from "../../../utils/campaign";
import { unixTimeNow } from "../../../utils/convertDate";
import { getIconCurrencyUsdt } from "../../../utils/usdt";
import ClaimButtonCell from "./ClaimButtonCell";
import useStyles from "./style";


export type PoolItem = {
	id: number
	title: string;
	token_images: string;
	campaign_status: string;
	joined_status: string;
	allowcation_amount: string;
	preOrderUsers: any;
	start_pre_order_time: string;
	campaign_hash: string;
	pre_order_min_tier: number;
	poolStatus: string;
	networkAvailable: string;
	purchasableCurrency: string;
	accept_currency: string;
	network_available: string;
	allowcation_pre_order_amount: string;
}
type Props = {
	pool: PoolItem;
	handleCancel: (pool: PoolItem) => void;
	isMobile?: boolean;
	history: H.History<H.LocationState>
}

const PoolRow: React.FC<Props> = (props: Props) => {
	const styles = useStyles();
	const { pool, handleCancel, isMobile, history } = props;

	const { data: userTier = 0 } = useSelector((state: any) => state.userTier);
	const now = unixTimeNow();

	const renderPoolStatus = () => {
		switch (pool.joined_status) {
			case POOL_STATUS_JOINED.NOT_WHITELIST_OR_BUY_YET:
				return (
					<div className="status_pool">
						<span>Not Applied Whitelist</span>
					</div>
				);
			case POOL_STATUS_JOINED.CANCELED_WHITELIST:
				return (
					<div className="status_pool canceled-whitelist">
						<span>Canceled Whitelist</span>
					</div>
				);
			case POOL_STATUS_JOINED.APPLIED_WHITELIST:
				return (
					<div className="status_pool applied-whitelist">
						<span>Applied Whitelist</span>
					</div>
				);
			case POOL_STATUS_JOINED.WIN_WHITELIST:
				return (
					<div className="status_pool win-whitelist">
						<span>Win Whitelist</span>
					</div>
				);
			case POOL_STATUS_JOINED.NOT_WIN_WHITELIST:
				return (
					<div className="status_pool not-win-whitelist">
						<span>Not Win Whitelist</span>
					</div>
				);
			case POOL_STATUS_JOINED.SWAPPING:
				return (
					<div className="status_pool swapping">
						<span>Swapping</span>
					</div>
				);
			case POOL_STATUS_JOINED.CLAIMABLE:
				// return <ClaimStatusTextCell poolDetails={pool} />;
				return (
					<div className="status_pool claimable">
						<span>Claimable</span>
					</div>
				);
			case POOL_STATUS_JOINED.COMPLETED:
				return (
					<div className="status_pool completed">
						<span>Completed</span>
					</div>
				);
			default:
				return (
					<div className="status_pool none">
						<span>-</span>
					</div>
				);
		}
	};

	const allocationAmount = () => {
		if (!pool) return null;

		// Get Currency Info
		const { currencyName } = getIconCurrencyUsdt({
			purchasableCurrency: pool?.purchasableCurrency || pool?.accept_currency,
			networkAvailable: pool?.networkAvailable || pool?.network_available,
		});
		if (pool.allowcation_amount === NULL_AMOUNT) return "-";
		let allowcationAmount = pool.allowcation_amount;
		if (new BigNumber(allowcationAmount).lte(0)) return "-";

		const allowcationAmountText = `${new BigNumber(
			allowcationAmount || 0,
		).toFixed()} ${currencyName?.toUpperCase()}`;

		return allowcationAmountText;
	};

	const preOrderAmount = () => {
		if (!pool) return "-";
		if (pool.allowcation_pre_order_amount === NULL_AMOUNT) return "-";

		// Get Currency Info
		const { currencyName } = getIconCurrencyUsdt({
			purchasableCurrency: pool?.purchasableCurrency || pool?.accept_currency,
			networkAvailable: pool?.networkAvailable || pool?.network_available,
		});

		let allowcationAmount = pool.allowcation_pre_order_amount;
		if (new BigNumber(allowcationAmount).lte(0)) return "-";

		const allowcationAmountText = `${new BigNumber(
			allowcationAmount || 0,
		).toFixed()} ${currencyName?.toUpperCase()}`;

		return allowcationAmountText;
	};

	const actionButton = () => {
		if (
			pool.joined_status === POOL_STATUS_JOINED.NOT_WIN_WHITELIST ||
			pool.joined_status === POOL_STATUS_JOINED.CANCELED_WHITELIST ||
			pool.joined_status === POOL_STATUS_JOINED.SWAPPING ||
			pool.joined_status === POOL_STATUS_JOINED.COMPLETED
		)
			return null;

		if (pool.joined_status === POOL_STATUS_JOINED.APPLIED_WHITELIST) {
			return (
				<Button
					className={`${styles.btnAction} btnCancelWhitelist`}
					onClick={() => handleCancel(pool)}
				>
					Cancel Whitelist
				</Button>
			);
		}

		if (pool.joined_status === POOL_STATUS_JOINED.WIN_WHITELIST) {
			if (
				userTier < pool.pre_order_min_tier || // Not enough tier to PreOrder
				!pool.campaign_hash || // Not deploy yet
				!pool.start_pre_order_time || // Not set PreOrder Time in Admin
				now < parseInt(pool.start_pre_order_time) // Not reached to PreOrder Time yet
			)
				return null;

			if (pool.preOrderUsers && pool.preOrderUsers.length > 0) {
				const amountPreOrdered = pool.preOrderUsers[0]?.pivot?.amount || 0;
				if (
					pool.allowcation_amount !== NULL_AMOUNT &&
					new BigNumber(amountPreOrdered).gte(
						new BigNumber(pool.allowcation_amount),
					)
				) {
					return null;
				}
			}
			return (
				<Button
					// disabled={notEth}
					className={`${styles.btnAction} btnPreOrder`}
					onClick={() => history.push(`/buy-token/${pool.id}`)}
				>
					Pre-Order
				</Button>
			);
		}

		if (pool.joined_status === POOL_STATUS_JOINED.CLAIMABLE) {
			return (
				<ClaimButtonCell
					poolDetails={pool}
				// notEth={notEth}
				/>
			);
		}

		return null;
	};

	return (
		isMobile ?
			<div className={styles.boxDataMobile}>
				<div className={styles.infoMobile}>
					<div>
						<div className={styles.nameMobile}>Pool Name</div>
						<Link to={`/buy-token/${pool.id}`} className={styles.toDetailPool} 	>
							<img className={styles.iconTokenMobile} src={pool.token_images} alt="" />
							<Tooltip title={pool.title}>
								<span className={styles.nameTokenMobile}>{pool.title}</span>
							</Tooltip>
						</Link>
					</div>
					<div>
						<div className={styles.nameMobile}>Type</div>
						<div className={styles.valueMobile}>
							{getAccessPoolText(pool)}
						</div>
					</div>
				</div>
				<ul>
					<li>
						<div className={styles.nameMobile}>Status</div>
						<div className={styles.valueMobile}>{renderPoolStatus()}</div>
					</li>
					<li>
						<div className={styles.nameMobile}>Allocation</div>
						<div className={styles.valueMobile}>
							{allocationAmount()}
						</div>
					</li>
					<li>
						<div className={styles.nameMobile}>Pre-order</div>
						<div className={styles.valueMobile}>{preOrderAmount()}</div>
					</li>
					<li>
						<div className={styles.nameMobile}>Action</div>
						<div>{actionButton()}</div>
					</li>
				</ul>
			</div>
			:
			<TableRow >
				<TableCell className={styles.tableCellBody} component="th" scope="pool" 	>
					<Link to={`/buy-token/${pool?.id}`} className={styles.toDetailPool} 	>
						<img className={styles.iconToken} src={pool.token_images} alt="" />
						<Tooltip title={pool.title}>
							<span className={styles.nameToken}>{pool.title}</span>
						</Tooltip>
					</Link>
				</TableCell>
				<TableCell className={styles.tableCellBody}>
					{getAccessPoolText(pool)}
				</TableCell>
				<TableCell className={styles.tableCellBody}>
					{renderPoolStatus()}
				</TableCell>
				<TableCell className={styles.tableCellBody}>
					{allocationAmount()}
				</TableCell>
				<TableCell className={styles.tableCellBody}>
					{preOrderAmount()}
				</TableCell>
				<TableCell className={styles.tableCellBody} align="center">
					{actionButton()}
				</TableCell>
			</TableRow>
	);
};

export default PoolRow;
