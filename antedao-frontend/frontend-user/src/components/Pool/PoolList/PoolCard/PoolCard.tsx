import { Grid } from "@material-ui/core";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ACCEPT_CURRENCY } from "../../../../constants";
import { Tooltip } from "@material-ui/core";
import {
	getAccessPoolText,
	getProgressWithPools,
	getTokenSold,
	showTotalRaisePrice
} from "../../../../utils/campaign";
import {
	numberWithCommas,
	nFormatterMilion,
} from "../../../../utils/formatNumber";
import { getIconCurrencyUsdt } from "../../../../utils/usdt";
import useStyles from "./styles";
import useFetch from "../../../../hooks/useFetch";

const PoolCard = (props: any): JSX.Element => {
	const styles = useStyles();
	const { pool, autoFetch, completeSalePoolsV3Display, id } = props;

	const [progress, setProgress] = useState("0");
	const [tokenSold, setTokenSold] = useState("0");
	const [totalSoldCoin, setTotalSoldCoin] = useState("0");

	const { data: participants } = useFetch<any>(`/user/counting/${pool.id}`);
	useEffect(() => {
		const getTokenProgressInfoByPool = async () => {
			if (autoFetch && pool) {
				pool.tokenSold = await getTokenSold(pool);
			}
			let {
				progress: progressPercent,
				tokenSold: totalTokenSold,
				totalSoldCoin: totalToken,
			} = getProgressWithPools(pool);
			setProgress(progressPercent);
			setTokenSold(totalTokenSold);
			setTotalSoldCoin(totalToken);
		};

		getTokenProgressInfoByPool();
		if (autoFetch) {
			const intervalProgress = setInterval(() => {
				getTokenProgressInfoByPool();
			}, 10000);

			return () => {
				intervalProgress && clearInterval(intervalProgress);
			};
		}
	}, [autoFetch, pool]);

	const { currencyName } = getIconCurrencyUsdt({
		purchasableCurrency: pool?.accept_currency,
		networkAvailable: pool?.network_available,
	});
	return (
		<Link to={`/buy-token/${pool.id}`}>
			<div className={`${styles.PoolCard} ${id === 4 ? 'borderBottom' : ''} `}>
				<Grid container spacing={3}>
					<Grid item xs={completeSalePoolsV3Display ? 4 : 3}>
						<div className={styles.introCard}>
							<div className={styles.imgContainer}>
							{pool.kyc_bypass === 1 ? 
							(
								<div className="groupImg">
									<div className="title_KYC">KYC</div>
									<img style={{border:`2px solid violet`}} src={pool.token_images} alt="" onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = "/images/no-img.jpg";
									}} />
								</div>

							) : (
									<img src={pool.token_images} alt="" onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = "/images/no-img.jpg";
								}} />
							)}
							</div>
							
							{
								completeSalePoolsV3Display ?
									<div className={styles.textLeft}>
										<h5>{pool.title}</h5>
										<p>
											{getAccessPoolText(pool)}
										</p>
									</div>
									: <Tooltip
										classes={{ tooltip: styles.tooltip }}
										title={`${pool.title} (${pool.symbol})`}
									>
										<p className={styles.title}>
											{pool.title}
											{` (${pool.symbol})`}
										</p>
									</Tooltip>
							}

						</div>
					</Grid>
					<Grid item xs={2}>
						<div className={`${styles.poolStatusWarning}`}>
							{completeSalePoolsV3Display ? showTotalRaisePrice(pool) : getAccessPoolText(pool)}
						</div>
					</Grid>
					{
						completeSalePoolsV3Display ? <Grid item xs={2}>
							<div className={`${styles.poolStatusWarning}`}>
								{ new BigNumber(participants).gt(0)
										? new BigNumber(participants).toFixed(2)
										:	'0.00'
									}
							</div>
						</Grid> :
							<Grid item xs={2}>
								<div className={`${styles.poolStatusWarning}`}>
									{pool.accept_currency === ACCEPT_CURRENCY.ETH && (
										<>{`${numberWithCommas(pool?.price_usdt, 4)} USD`}</>
									)}
									{pool.accept_currency !== ACCEPT_CURRENCY.ETH && (
										<>
											{numberWithCommas(pool?.token_conversion_rate, 4)}{" "}
											{currencyName}
										</>
									)}
								</div>
							</Grid>
					}
					<Grid item xs={completeSalePoolsV3Display ? 4 : 3}>
						<div className={styles.progressArea}>
							<div className={styles.progress}>
								<span
									className={`${styles.currentProgress} ${parseFloat(progress) > 0 ? "" : "inactive"
										}`}
									style={{
										width: `${parseFloat(progress) > 99
											? 100
											: Math.round(parseFloat(progress))
											}%`,
									}}
								></span>
							</div>
							<div className={styles.progressInfo}>
								<span>
									(
									{new BigNumber(progress).gte(100)
										? new BigNumber(progress).toFixed(0)
										: new BigNumber(progress).toFixed(0)}
									%)
								</span>
								<span>
									{nFormatterMilion(tokenSold, 1)}
									&nbsp;/&nbsp;
									{nFormatterMilion(totalSoldCoin, 1)}
									&nbsp;
									{pool.symbol}
								</span>
							</div>
						</div>
					</Grid>
					{
						completeSalePoolsV3Display ? '' :
							<Grid item xs={2}>
								<div
									className={`${styles.poolStatusWarning}`}
									style={{ textAlign: "center" }}
								>
									{pool.campaign_status}
								</div>
							</Grid>
					}

				</Grid>
			</div>
		</Link>
	);
};

export default PoolCard;
