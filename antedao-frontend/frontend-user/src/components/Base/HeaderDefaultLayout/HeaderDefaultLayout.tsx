import { css } from "@emotion/core";
import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { AppContext } from "../../../AppContext";
import { TIERS } from "../../../constants";
import {
	ConnectorNames,
	connectorNames,
	connectorsByName
} from "../../../constants/connectors";
import { APP_NETWORKS_SUPPORT } from "../../../constants/network";
import useAuth from "../../../hooks/useAuth";
import { menuMyAccount } from "../../../pages/AccountV2";
import useStyle from "../../../pages/AccountV2/style";
import { getUserTier } from "../../../store/actions/sota-tiers";
import { AppNetworkState } from "../../../store/reducers/appNetwork";
import { WalletConnectionState } from "../../../store/reducers/wallet";
import { trimMiddlePartAddress } from "../../../utils/accountAddress";
import ButtonLink from "../ButtonLink";
import AppNetworkSwitch from "./AppNetworkSwitch";
import ConnectWalletModal from "./ConnectWalletModal";
import { HeaderContext } from "./context/HeaderContext";
import useStyles from "./styles";
import WalletInfomation from "./WalletInfomation";

const logo = "/images/landing/logo-brand.svg";
const iconHamburger = "/images/icons/hamburger.svg";

const HeaderDefaultLayout: React.FC<any> = (props: any) => {
	const styles = useStyles();
	const classes = useStyle();
	const dispatch = useDispatch();

	const [switchNetworkDialog, setSwitchNetworkDialog] =
		useState<boolean>(false);
	const query = new URLSearchParams(props.location.search);
	const currentTab = query.get("tab");
	let currentTabIndex = currentTab ? parseInt(currentTab) : 0;
	currentTabIndex =
		currentTabIndex < menuMyAccount.length ? currentTabIndex : 0;
	const [disconnectDialog, setDisconnectDialog] = useState<boolean>(false);
	const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
	const { data } = useSelector((state: any) => state.appNetwork) as AppNetworkState;
	const { appChainID, walletChainID } = data;
	const walletsInfo = useSelector((state: any) => state.wallet).entities;
	const [openSideBar, setOpenSideBar] = useState(false);
	const { data: userTier } = useSelector((state: any) => state.userTier);
	const [chainName, setChainName] = useState<String>("Ethereum");
	const [chainCurrency, setChainCurrency] = useState<String>("ETH");
	const { isAuth, connectedAccount, wrongChain } = useAuth();

	useEffect(() => {
		if (isAuth && connectedAccount && !wrongChain) {
			dispatch(getUserTier(connectedAccount));
		}
	}, [isAuth, wrongChain, connectedAccount, dispatch]);

	const navList = useMemo(() => [
		{
			router: '/',
			text: 'Home',
		},
		{
			router: '/dashboard',
			text: 'IDO',
		},
		{
			router: '/staking-pools',
			text: 'Staking',
		},
	], [])

	const {
		handleProviderChosen,
		walletName,
		setWalletName,
		loginError,
		currentConnectedWallet,
		setCurrentConnectedWallet,
		openConnectWallet,
		setOpenConnectWallet,
		connectWalletLoading,
	} = useContext(AppContext);

	const currentAccount =
		connectedAccount &&
		currentConnectedWallet &&
		currentConnectedWallet.addresses[0];
	const balance = currentConnectedWallet
		? currentConnectedWallet.balances[currentAccount]
		: 0;
	const handleConnectWalletClose = () => {
		setOpenConnectWallet && setOpenConnectWallet(false);
	};

	const handleConnectWalletOpen = () => {
		setOpenConnectWallet && setOpenConnectWallet(true);
		setOpenSideBar(false);
	};

	const handleDisconnectDialogOpen = () => {
		setDisconnectDialog((prev) => !prev);
		setOpenSideBar(false);
	};

	useEffect(() => {
		if (walletsInfo && walletName) {
			let isFound = false;
			Object.keys(walletsInfo).forEach((key) => {
				const wallet = walletsInfo[key];
				if (
					wallet.addresses.length > 0 &&
					wallet.connectionState === WalletConnectionState.CONNECTED &&
					!isFound
				) {
					isFound = true;
					setCurrentConnectedWallet && setCurrentConnectedWallet(wallet);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [walletsInfo, walletName]);

	useEffect(() => {
		if (walletsInfo) {
			let chooseWallet: connectorNames | undefined;
			let isFound = false;
			Object.keys(walletsInfo).forEach((key) => {
				const wallet = walletsInfo[key];
				if (
					wallet.addresses.length > 0 &&
					wallet.connectionState === WalletConnectionState.CONNECTED &&
					!isFound
				) {
					isFound = true;
					chooseWallet = key as connectorNames;
				}
			});

			if (chooseWallet && !walletName) {
				setWalletName?.(chooseWallet);
				handleProviderChosen?.(chooseWallet, connectorsByName[chooseWallet]);
			}
			else if (!chooseWallet && !walletName) {
				const provider = (window as any).ethereum;
				if (!sessionStorage?.getItem('disconnected') && provider) {
					handleProviderChosen?.(ConnectorNames.MetaMask, connectorsByName[ConnectorNames.MetaMask]);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const networkInfo = APP_NETWORKS_SUPPORT[Number(appChainID)];
		if (!networkInfo) {
			return;
		}
		setChainName(networkInfo.name || "Ethereum");
		setChainCurrency(networkInfo.currency || "ETH");
	}, [appChainID]);
	
	// eslint-disable-next-line
	const handleClickPoolList = (e: any) => {
		if (props?.location?.pathname === "/dashboard") {
			window.location.reload();
		}
	};

	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const isExpandedAccount = useMemo(() => isExpanded, [isExpanded]);

	const catchOnchangeExpanded = useCallback((event, expanded) => {
		setIsExpanded(expanded);
		return expanded
	}, [])

	return (
		<div
			className={`${styles.wrapHeaderStyle} ${openSideBar ? " active" : ""} ${props.isTransparentHeader ? "transparent" : ""
				}`}
		>
			<div className={styles.navBar}>
				{isWidthDown("sm", props.width) ? (
					<>
						<div>
							<Link to={"/"} className={styles.navbarLink}>
								<img className={styles.imgLogo} src={logo} alt="" />
							</Link>
						</div>
						<div
							className={
								styles.rightHeadMobile + (openSideBar ? " active" : "")
							}
						>
							<img
								src={iconHamburger}
								onClick={() => setOpenSideBar((prev) => !prev)}
								alt=""
							/>
						</div>
						<div className={styles.rightBar + (openSideBar ? " active" : "")}>
							<div className={styles.containerNavigation}>

								<div className="wrap-menu">
									{
										navList.map((itemNav, index) => (
											<ButtonLink
												key={`${itemNav.text}-${index}`}
												text={itemNav.text}
												to={itemNav.router}
												spacing={0}
												className={`${styles.btn} start ${props.location.pathname === itemNav.router ? styles.btnRouterActive : ''}`}
												isNew
											/>
										))
									}

								</div>

								{currentAccount && (<div className={styles.myAccount}>
									<Accordion className={styles.Accordion} onChange={catchOnchangeExpanded}>
										<AccordionSummary
											className={styles.AccordionSummary}
											expandIcon={
												<ExpandMore className={styles.ExpandMore} />
											}
										>
											<p
												className={`${styles.btn} start my-account ${styles.btnFontCustom} ${!isExpandedAccount ? 'isExpanded' : 'isCloseExpand'}`}
											>
												My Account
												{TIERS[userTier]
													? ` - ${TIERS[userTier]?.name}`
													: ` - none`}
											</p>
										</AccordionSummary>
										<AccordionDetails className={styles.AccordionDetails}>
											<>
												{menuMyAccount.map((item, index) => {
													return (
														<Link
															to={"/account?tab=" + index}
															key={index + item.name}
														>
															<li
																className={`${styles.itemTabAccount}  ${currentTabIndex === index ? "active" : ""}`}
																onClick={() => setOpenSideBar(false)}
																key={index + item.name}
															>
																<div
																	className={`${classes.iconItemTabAccount} ${currentTabIndex === index ? "active" : ""} `}
																	style={{
																		WebkitMaskImage: `url(${item.icon})`,
																		maskImage: `url(${item.icon})`,
																	}}
																></div>
																<span className={styles.textTabAccount}>{item.name}</span>
															</li>
														</Link>
													);
												})}
											</>
										</AccordionDetails>
									</Accordion>
								</div>)}
								<div className="wrap-btn-rightbar ">
									{(currentAccount && <div className={styles.boxWalletText}>
										<div className={styles.rowWalletText}>
											<div className={styles.labelWallet}>Address</div>
											<div className={styles.valueWallet}>{`${trimMiddlePartAddress(currentAccount)}`}</div>
										</div>
										<div className={`${styles.rowWalletText} ${styles.borderHeaderTextWallet}`}>
											<div className={styles.labelWallet}>Balance</div>
											<div className={styles.valueWallet}>
												{currentAccount &&
													(!loginError ? `${balance} ${chainCurrency}` : "0")}
											</div>
										</div>
									</div>)}
									{(currentAccount && <button
										className={`${styles.btn} ${styles.btnNetwork} ${styles.btnMarginRight0}`}
										onClick={() => {
											setSwitchNetworkDialog(true);
											setOpenSideBar(false);
										}}
									>
										<span className={styles.btnConnectText}>{chainName}</span>
									</button>)}
									<button
										className={`${styles.btn} ${styles.btnConnect} ${currentAccount ? styles.btnWalletConnect : styles.btnBoxConnect}`}
										onClick={() => {
											if (!connectWalletLoading) {
												!currentAccount
													? handleConnectWalletOpen()
													: handleDisconnectDialogOpen();
											}
										}}
										disabled={connectWalletLoading}
									>
										{!connectWalletLoading ? (
											<div>
												{currentAccount ? 'Disconnect' : 'Connect Wallet'}
											</div>
										) : (
											<BeatLoader
												color={"white"}
												css={css`
													margin-top: 3px;
												`}
												size={10}
											/>
										)}
									</button>
								</div>
								<div onClick={() => { setOpenSideBar(false) }} className={styles.navigationClose}>
									<img src="images/account_v3/icons/close-navigation.svg" alt="" />
								</div>
							</div>
						</div>
					</>
				) : (
					<>
						{/* logo brand */}
						<Link
							to={"/"}
							className={styles.navbarLogo}
							style={{ marginRight: currentAccount ? 60 : 0 }}
						>
							<img src={logo} className={styles.imgLogo} alt="" />
						</Link>

						{/* menu navbar */}
						<div
							className={`${styles.navbarMenu} ${props.location.pathname === '/' ? styles.navbarMenuLanding : styles.navbarMenuDefault}`}
							style={{ flex: "1" }}
						>
							{
								navList.map((itemNav, index) => (
									<ButtonLink
										key={`${itemNav.text}-${index}`}
										text={itemNav.text}
										to={itemNav.router}
										className={`${styles.btn} start narbarMenu-item`}
										isNew
									/>
								))
							}
						</div>
						{/* action navbar */}
						<div className={styles.navbarAction}>
							{currentAccount && (
								<a
									href={"/#/account"}
									className={`${styles.btn} start my-account ${styles.btnFontCustom}`}
									style={{ color: "white", marginLeft: '63.66px', marginRight: '0px' }}
								>
									My Account
									{TIERS[userTier] ? ` - ${TIERS[userTier]?.name}` : ` - none`}
								</a>
							)}

							<button
								className={`${styles.btn} ${styles.btnNetwork}`}
								onClick={() => {
									setSwitchNetworkDialog(true);
									setOpenSideBar(false);
								}}
							>
								<span style={{ margin: "0" }} className={styles.btnConnectText}>
									{chainName}
								</span>
							</button>

							<button
								className={`${styles.btn} ${styles.btnConnect}`}
								onClick={() => {
									if (!connectWalletLoading) {
										!currentAccount
											? handleConnectWalletOpen()
											: handleDisconnectDialogOpen();
									}
								}}
								style={{ marginLeft: '16px'}}
								disabled={connectWalletLoading}
							>
								{!connectWalletLoading ? (
									<>
										<span className={`${styles.btnBalance}`}>
											{currentAccount &&
												(!loginError ? `${balance} ${chainCurrency}` : "0")}
										</span>
										<span
											className={`${styles.btnConnectText} ${currentAccount ? styles.btnAccount : styles.btnConnectWallet}`}
										>
											{(currentAccount &&
												`${trimMiddlePartAddress(currentAccount)}`) ||
												"Connect Wallet"}
										</span>
									</>
								) : (
									<BeatLoader
										color={"white"}
										css={css`
											margin-top: 3px;
										`}
										size={10}
									/>
								)}
							</button>
						</div>
					</>
				)}
			</div>
			<HeaderContext.Provider value={{ agreedTerms, setAgreedTerms }}>
				<ConnectWalletModal
					opened={openConnectWallet as boolean}
					handleClose={handleConnectWalletClose}
				/>
				<AppNetworkSwitch
					opened={switchNetworkDialog}
					handleClose={() => setSwitchNetworkDialog(false)}
					changeDisplayOnly={!openConnectWallet && !walletChainID}
				/>
				<WalletInfomation
					opened={disconnectDialog}
					handleClose={() => {
						setDisconnectDialog((prev) => !prev);
						setAgreedTerms(false);
						setOpenSideBar(false);
					}}
					currentWallet={currentConnectedWallet}
				/>
			</HeaderContext.Provider>
		</div>
	);
};

export default withWidth()(withRouter(HeaderDefaultLayout));
