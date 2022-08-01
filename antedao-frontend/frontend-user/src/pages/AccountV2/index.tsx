import { Backdrop } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Loader from "../../components/Loader";
import { USER_STATUS } from "../../constants";
import { ChainId } from "../../constants/network";
import useAuth from "../../hooks/useAuth";
import useTokenDetails from "../../hooks/useTokenDetails";
import useUserTier from "../../hooks/useUserTier";
import axios from "../../services/axios";
import { getBalance } from "../../store/actions/balance";
import {
	getTiers,
	getUserInfo,
	getUserInfoLegacy
} from "../../store/actions/sota-tiers";
import { getAllowance } from "../../store/actions/sota-token";
import { trimMiddlePartAddress } from "../../utils/accountAddress";
import { numberWithCommas } from "../../utils/formatNumber";
import AccountInformation from "./AccountInformation";
import MyPools from "./MyPools";
import NeedHelp from "./NeedHelp";
import useStyles from "./style";
import Tiers from "./Tiers";


const TOKEN_ADDRESS = process.env.REACT_APP_ANTE || "";

const iconWarning = "/images/warning-red.svg";

export const menuMyAccount = [
	{
		name: "My Profile",
		icon: "/images/account_v3/icons/icon_my_profile.svg",
	},
	{
		name: "My Tier",
		icon: "/images/account_v3/icons/icon_my_tier.svg",
	},
	{
		name: "My Pools",
		icon: "/images/account_v3/icons/icon_my_pools.svg",
	},
	{
		name: "Need Help",
		icon: "/images/account_v3/icons/icon_need_help.svg",
	},
];

const AccountV2 = (props: any) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { data: balance = {} } = useSelector((state: any) => state.balance);
	const { data: userInfo = {} } = useSelector((state: any) => state.userInfo);
	const { isAuth, connectedAccount, wrongChain } = useAuth();
	const [loadingGetHistory, setLoadingGetHistory] = useState(false);

	const { tokenDetails: tokenSBXDetails } = useTokenDetails(
		TOKEN_ADDRESS,
		"eth",
	);


	const query = new URLSearchParams(props.location.search);
	const currentTab = query.get("tab");
	let currentTabIndex = currentTab ? parseInt(currentTab) : 0;
	currentTabIndex =
		currentTabIndex < menuMyAccount.length ? currentTabIndex : 0;
	const [emailVerified, setEmailVeryfied] = useState(0);
	const [email, setEmail] = useState<string>("");
	const [twitter, setTwitter] = useState<string>("");
	const [telegram, setTelegram] = useState<string>("");
	const [isKYC, setIsKYC] = useState(false);
	const [isLoadingKYC, setIsLoadingKYC] = useState(true);
	const [, setListTokenDetails] = useState([]) as any;
	const { data: appChainID } = useSelector((state: any) => state.appNetwork);
	const { currentTier, total } = useUserTier(connectedAccount || "", "eth");
	const [tabAccount] = useState(menuMyAccount);
	const [activeMenuAccount, setActiveMenuAccount] = useState(
		menuMyAccount[currentTabIndex].name,
	);
	const [updatedSuccess, setUpdatedSuccess] = useState(false);
	const [dataHistories, setDataHistories] = useState({}) as any;
	const { data: tiers = {} } = useSelector((state: any) => state.tiers);
	const { data: userTier = 0 } = useSelector((state: any) => state.userTier);

	useEffect(() => {
		dispatch(getTiers());
	});

	useEffect(() => {
		setActiveMenuAccount(menuMyAccount[Number(currentTab) || 0]?.name);
	}, [currentTab]);

	useEffect(() => {
		if (isAuth && connectedAccount && !wrongChain) {
			dispatch(getBalance(connectedAccount));
			dispatch(getAllowance(connectedAccount));
		}
	}, [isAuth, wrongChain, connectedAccount, dispatch]);

	useEffect(() => {
		setEmail("");
		setTwitter("");
		setTelegram("");
		setEmailVeryfied(USER_STATUS.UNVERIFIED);
		setIsKYC(false);
	}, [connectedAccount]);

	useEffect(() => {
		setListTokenDetails([tokenSBXDetails ]);
	}, [tokenSBXDetails]);

	useEffect(() => {
		setUpdatedSuccess(false);
	}, [activeMenuAccount]);

	useEffect(() => {
		if (isAuth && connectedAccount && !wrongChain && updatedSuccess) {
			getUserProfile();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updatedSuccess, connectedAccount]);

	const getUserHistory = async () => {
		setLoadingGetHistory(true);
		const response = await axios.get(
			`/reputation/histories/${connectedAccount}?hideZeroTx=flase&page=1&limit=10`,
		);

		if (response.data) {
			setLoadingGetHistory(false);
			if (response.data.status === 200) {
				setDataHistories(response?.data?.data);
			}

			if (response.data.status !== 200) {
				setDataHistories({});
			}
		}
	};

	const selectTab = (name: any, index: any) => {
		setActiveMenuAccount(name);
		props.history.push("/account?tab=" + index);
	};

	useEffect(() => {
		if (connectedAccount) {
			getUserHistory();
			getUserProfile();
			dispatch(getUserInfo(connectedAccount));
			dispatch(getUserInfoLegacy(connectedAccount))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connectedAccount]);

	const getUserProfile = async () => {
		if (!connectedAccount) {
			setEmail("");
			setTwitter("");
			setTelegram("");
			setEmailVeryfied(USER_STATUS.UNVERIFIED);
			setIsKYC(false);
		} else {
			setIsLoadingKYC(true);
			const response = await axios.get(
				`/user/profile?wallet_address=${connectedAccount}`,
			);
			if (response.data) {
				if (response.data.status === 200) {
					const user = response?.data?.data?.user;
					setEmail(user?.email);
					setTwitter(user?.user_twitter);
					setTelegram(user?.user_telegram);
					setEmailVeryfied(user?.status);
					setIsLoadingKYC(false);
					setIsKYC(user?.is_kyc === 1 ? true : false);
				}

				if (response.data.status !== 200) {
					setEmail("");
					setTwitter("");
					setTelegram("");
					setEmailVeryfied(USER_STATUS.UNVERIFIED);
					setIsKYC(false);
					setIsLoadingKYC(false);
				}
			}
		}
	};

	const totalRedKitePoints = userInfo?.totalStaked
		? Number(userInfo?.totalStaked).toString()
		: "0";
	const pointsLeftToNextTier = userInfo?.totalStaked
		? numberWithCommas(
			(tiers[userTier] - Number(userInfo?.totalStaked)).toString() || "0",
		)
		: "0";

	return (
		<DefaultLayout isKYC={isKYC}>
			<div className={classes.accountContainer}>
				{!isKYC && connectedAccount && !isLoadingKYC && (
					<div className={classes.alertVerifyEmail}>
						<img src={iconWarning} style={{ marginRight: "12px" }} alt="" />
						<span>
							The connected wallet address (
							{trimMiddlePartAddress(connectedAccount)}) is unverified.&nbsp;
							<a
								href="https://verify-with.blockpass.org/?clientId=antedao_555e9&serviceName=AnteDAO&env=prod"
								target="_blank"
								rel="noreferrer"
								style={{color:"#fd849c"}}
							>
								Please submit KYC now
							</a>
							&nbsp;or switch to a verified address.
						</span>
					</div>
				)}

				{/* appChainID > KOVAN ID => Not Ethereum mainnet/testnet */}
				{+appChainID?.appChainID !== ChainId.RINKEBY &&
					isKYC &&
					activeMenuAccount === "My Tier" && (
						<div
							className={`${classes.alertVerifyEmail} ${classes.errorSwich}`}
						>
							<img src={iconWarning} style={{ marginRight: "12px" }} alt="" />
							<span>Please switch to the Ethereum network to join these staking pools</span>
						</div>
					)}


				{updatedSuccess && (
					<div className={classes.messageUpdateSuccess}>
						<img
							src="/images/account_v3/icons/update_success_icon.svg"
							alt=""
						/>
						Your profile has been updated successfully
					</div>
				)}

				{/* {cancelWhitelistSuccess &&
          <div className={classes.messageUpdateSuccess}>
            <img src="/images/account_v3/icons/icon_updated_success.svg" alt="" />
            You have successfully cancelled your whitelist application.
          </div>
        } */}

				<div className={classes.bodyContentMyAccount}>
					<div className={classes.leftAccount}>
						<nav className={classes.tabAccount}>
							{tabAccount.map((item, index) => {
								return (
									<li
										className={`${classes.itemTabAccount}  ${activeMenuAccount === item.name ? "active" : ""
											}`}
										key={index}
										onClick={() => selectTab(item.name, index)}
									>
										<div
											className={`${classes.iconItemTabAccount} ${activeMenuAccount === item.name ? "active" : ""
												}`}
											style={{
												WebkitMaskImage: `url(${item.icon})`,
												maskImage: `url(${item.icon})`,
											}}
										></div>
										{item.name}
									</li>
								);
							})}
						</nav>
					</div>

					<div className={classes.rightAccount}>
						{activeMenuAccount === "My Profile" && (
							<AccountInformation
								notEth={+appChainID?.appChainID > ChainId.KOVAN}
								classNamePrefix="account-infomation"
								balance={balance}
								userInfo={userInfo}
								tokenSBXDetails={tokenSBXDetails}
								email={email}
								twitter={twitter}
								telegram={telegram}
								emailVerified={emailVerified}
								setEmail={setEmail}
								setEmailVeryfied={setEmailVeryfied}
								isKYC={isKYC}
								isLoadingKYC={isLoadingKYC}
								kycStatus={isKYC ? 1 : 0}
								setUpdatedSuccess={setUpdatedSuccess}
							/>
						)}

						{activeMenuAccount === "My Tier" && (
							<div className={classes.tier}>
								<Tiers
									showMoreInfomation={false}
									tokenSymbol={tokenSBXDetails?.symbol}
									total={total}
									isKYC={isKYC}
									tiers={tiers}
									userInfo={userInfo}
									userTier={userTier}
									emailVerified={emailVerified}
									connectedAccount={connectedAccount}
									dataHistories={dataHistories}
									totalRedKitePoints={totalRedKitePoints}
									pointsLeftToNextTier={pointsLeftToNextTier}
								/>
							</div>
						)}

						{activeMenuAccount === "My Pools" && (
							<MyPools
								notEth={+appChainID?.appChainID > ChainId.KOVAN}
								userTier={currentTier}
							/>
						)}

						{activeMenuAccount === "Need Help" && <NeedHelp />}
					</div>
				</div>
			</div>

			<Backdrop
				open={loadingGetHistory || isLoadingKYC}
				className={classes.backdrop}
			>
				<Loader />
			</Backdrop>
		</DefaultLayout>
	);
};

export default withRouter(AccountV2);
