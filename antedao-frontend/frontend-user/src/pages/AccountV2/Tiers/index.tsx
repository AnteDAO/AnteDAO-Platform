/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { TIERS } from "../../../constants";
import useAuth from "../../../hooks/useAuth";
import { nFormatterMilion } from "../../../utils/formatNumber";
import TierList from "../TierList";
import useStyles from "./style";

const Tiers = (props: any) => {
	const history = useHistory();
	const styles = useStyles();
	const [loading, setLoading] = useState(true);
	const { isAuth, connectedAccount, wrongChain } = useAuth();

	const {
		showMoreInfomation = false,
		tiersBuyLimit,
		tokenSymbol,
		total,
		hideStatistics,
		isKYC,
		userInfo,
		userTier,
		tiers,
		totalRedKitePoints,
		pointsLeftToNextTier,
	} = props;

	const [currentProcess, setCurrentProcess] = useState(undefined) as any;

	const calculateProcess = (ListData: any, current: any) => {
		let tierA = 0;
		let tierB = 0;
		let overTier = true;
		for (let i = 0; i < ListData.length; i++) {
			if (ListData[i] > parseFloat(current) && overTier) {
				if (i === 0) {
					tierA = 0;
					tierB = ListData[0];
				} else {
					tierA = ListData[i - 1];
					tierB = ListData[i];
				}
				overTier = false;
			}
		}
		if (overTier) {
			return 100;
		}
		let process = ((parseFloat(current) - tierA) * 100) / (tierB - tierA);
		if (process > 100) process = 100;
		return process;
	};

	useEffect(() => {
		if (!_.isEmpty(tiers)) {
			setLoading(false);
		}
		if (showMoreInfomation && userTier) {
			setCurrentProcess(0);
			return;
		}
		if (!showMoreInfomation && userInfo?.totalStaked) {
			let process = calculateProcess(tiers, userInfo?.totalStaked);
			setCurrentProcess(process);
		}
	}, [
		tiers,
		userTier,
		userInfo,
		tiersBuyLimit,
		showMoreInfomation,
		tokenSymbol,
		connectedAccount,
		isAuth,
		wrongChain,
		total,
	]);

	useEffect(() => {
		if (currentProcess !== undefined) setLoading(false);
	}, [currentProcess, userTier]);

	return (
		<div
			className={
				styles.tierComponent +
				(!loading ? " active" : " inactive") +
				(showMoreInfomation ? " bg-none" : "")
			}
		>
			<div className={styles.tierTitle}>My Tier</div>

			{userInfo.totalStaked > 0 ? (
				<>
					{" "}
					<ul className={styles.listInfo}>
						<li className={styles.itemInfo}>
							<div className={styles.nameItemInfo}>Current Tier</div>
							<div className={styles.valueItemInfo}>
								{connectedAccount ? TIERS[userTier]?.name : ""}
							</div>
						</li>
						<li className={styles.itemInfo}>
							<div className={styles.nameItemInfo}>Staked amount</div>
							<div className={styles.valueItemInfo}>
								{connectedAccount && totalRedKitePoints ? `${nFormatterMilion(totalRedKitePoints, 1)} ANTE` : "-"}
							</div>
						</li>
						<li className={styles.itemInfo}>
							<div className={styles.nameItemInfo}>ANTE left to next tier</div>
							<div className={styles.valueItemInfo}>
								{connectedAccount && pointsLeftToNextTier ? (
									<>{userTier > 8 ? "-" : `${pointsLeftToNextTier} ANTE`}</>
								) : (
									"-"
								)}
							</div>
						</li>
					</ul>
					<div className={styles.bodyPage}>
						<>
							<TierList
								tiersBuyLimit={tiersBuyLimit}
								tiers={tiers}
								userTier={userTier}
								loading={loading}
								currentProcess={currentProcess}
								showMoreInfomation={showMoreInfomation}
								hideStatistics={hideStatistics}
							/>
							<div style={{ textAlign: "center" }}>
								<Button
									disabled={!isKYC}
									className={
										styles.btnStake + (isKYC ? " active" : " inactive")
									}
									onClick={() =>
										history.push("/staking-pools?benefit=ido-only")
									}
								>
									Stake
								</Button>
							</div>
						</>
					</div>
				</>
			) : (
				<div className={styles.noneKYC}>
					<div> You currently have 0 ANTE staked</div>
					<Button
						// style={{ width: '50%', margin: '12px 0' }}
						disabled={!isKYC}
						className={styles.btnStake + (isKYC ? " active notStake" : " inactive notStake")}
						onClick={() => history.push("/staking-pools?benefit=ido-only")}
					>
						Stake Now
					</Button>
				</div>
			)}

			<>
				<div>Learn more about how to achieve AnteDAO Tier here: </div>
				<ul className={styles.showMore}>
					<li>
						<a href="/#/staking-pools" target="_blank">
							How to stake?
						</a>
					</li>
					<li>
						<a href="/#/staking-pools" target="_blank">
							What is AnteDAO Tiers?
						</a>
					</li>
					<li>
						<a href="" target="_blank">
							My Tier FAQs
						</a>
					</li>
				</ul>
			</>
		</div>
	);
};

export default withWidth()(Tiers);
