import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import {
	getAccessPoolText,
	getProgressWithPools,
	getTokenSold,
	showTotalRaisePrice
} from "../../../../utils/campaign";
import { nFormatterMilion } from "../../../../utils/formatNumber";
import useStyles from "./styles";

const PoolCardMobile = (props: any): JSX.Element => {
	const styles = useStyles();
	const { pool, autoFetch } = props;
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

	// const { currencyName } = getIconCurrencyUsdt({
	//     purchasableCurrency: pool?.accept_currency,
	//     networkAvailable: pool?.network_available,
	// });
	return (
		<Link to={`/buy-token/${pool.id}`}>
			<div className={styles.boxCarMoblie}>
				<p className={styles.title}>Project</p>
				<div className={styles.introCard}>
					<div className={styles.imgContainer}>
						{pool?.kyc_bypass === 1 
						?
						(<>
						 <div className="title_kyc">KYC</div> 
						<img style={{border:'2px solid violet'}} src={pool.token_images} alt="" />
						</>)
						: 
						(<img src={pool.token_images} alt="" />)
						}
					</div>
					<div className={styles.textLeft}>
						<p>
							{getAccessPoolText(pool)} &nbsp;|&nbsp;{pool.campaign_status}
						</p>
						<p>{pool.title}</p>
					</div>
				</div>
				<div className={styles.infoMid}>
					<div className={styles.totalRaised}>
						<p className={styles.title}>Total Raised</p>
						<p className={styles.totalRaisedValue}>{showTotalRaisePrice(pool)}</p>
					</div>
					<div>
						<p className={styles.title}>Participants</p>
						<p className={styles.totalRaisedValue}>{participants}</p>
					</div>
				</div>
				<div className={styles.infoEnd}>
					<p className={styles.title}>Progress</p>
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
				</div>
			</div>
		</Link>
	);
};

export default PoolCardMobile;
