import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
	HashRouter as Router,
	Route, RouteComponentProps, Switch,
	withRouter
} from "react-router-dom";
import Stake from "././pages/Stake";
import AppContainer from "./AppContainer";
import { AppContext } from "./AppContext";
import ErrorBoundary from "./components/Base/ErrorBoundary";
import useProviderConnect from "./components/Base/HeaderDefaultLayout/hooks/useProviderConnect";
import AccountV2 from "./pages/AccountV2";
// import Deposit from "./pages/AccountV2/Deposit";
import Withdraw from "./pages/AccountV2/Withdraw";
import BuyToken from "./pages/BuyToken";
import ChangePassword from "./pages/ChangePassword";
import ComingSoon from "./pages/ComingSoon/ComingSoon";
import ConfirmEmail from "./pages/ConfirmEmail";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import InvestorLogin from "./pages/Login/InvestorLogin";
import NetworkChange from "./pages/NetworkChange";
import NotFoundPage from "./pages/NotFoundPage";
import Pools from "./pages/Pools";
// import InvestorRegister from "./pages/Register/InvestorRegister";
import { clearAlert } from "./store/actions/alert";
import {
	NetworkUpdateType, settingAppNetwork
} from "./store/actions/appNetwork";






/**
 * Main App routes.
 */
const Routes: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
	const dispatch = useDispatch();
	const alert = useSelector((state: any) => state.alert);
	const { history } = props;

	const { deactivate } = useWeb3React();
	const [binanceAvailable, setBinanceAvailable] = useState(false);
	const [openConnectWallet, setOpenConnectWallet] = useState<boolean>(false);
	const [currentConnectedWallet, setCurrentConnectedWallet] =
		useState<any>(undefined);

	const logout = () => {
		deactivate();
		dispatch(settingAppNetwork(NetworkUpdateType.Wallet, undefined));
		setCurrentConnectedWallet(undefined);
		handleConnectorDisconnect();
	};

	const {
		handleProviderChosen,
		connectWalletLoading,
		currentConnector,
		walletName,
		setWalletName,
		loginError,
		appNetworkLoading,
		handleConnectorDisconnect,
	} = useProviderConnect(
		setOpenConnectWallet,
		openConnectWallet,
		binanceAvailable,
	);

	useEffect(() => {
		document.onreadystatechange = function () {
			if (document.readyState === "complete") {
				setBinanceAvailable(true);
			}
		};
	}, []);

	useEffect(() => {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		};
		return () => {
			window.removeEventListener("onbeforeunload", () => window.scrollTo(0, 0));
		};
	}, []);

	useEffect(() => {
		const { type, message } = alert;
		if (type && message) {
			Store.addNotification({
				title: `${message || "Test message"}!`,
				type: type || "info",
				insert: "top",
				container: "top-right",
				animationIn: ["animate__animated", "animate__fadeIn"],
				animationOut: ["animate__animated", "animate__fadeOut"],
				dismiss: {
					duration: 5000,
					onScreen: true,
					showIcon: true,
				},
			});
		}
	}, [alert]);

	useEffect(() => {
		history.listen((location, action) => {
			dispatch(clearAlert());
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AppContext.Provider
			value={{
				binanceAvailable,
				handleProviderChosen,
				connectWalletLoading,
				walletName,
				setWalletName,
				loginError,
				appNetworkLoading,
				handleConnectorDisconnect,
				currentConnector,
				logout,
				setCurrentConnectedWallet,
				openConnectWallet,
				setOpenConnectWallet,
				currentConnectedWallet,
			}}
		>
			<div>
			<Switch>
					<Route exact path={`${"/dashboard"}`} component={Dashboard} />
					<Route path={`${"/buy-token/:id"}`} component={BuyToken} />
					<Route path={"/login"} component={InvestorLogin} />
					<Route path={"/confirm-email/:token"} component={ConfirmEmail} />
					<Route path={"/network-change"} component={NetworkChange} />
					<Route path={"/change-password/:role?"} component={ChangePassword} />
					<Route path={"/account"} component={AccountV2} />
					<Route path={"/unstake"} component={Withdraw} />
					<Route path={"/pools"} component={Pools} />
					<Route path={"/staking-pools"} component={Stake} />
					<Route path={"/"} component={Landing} />
					<Route path={"/coming-soon"} component={ComingSoon} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</AppContext.Provider>
	);
};

const RoutesHistory = withRouter(Routes);

const routing = function createRouting() {
	return (
		<>
			<ReactNotifications />
			<Router>
				<AppContainer>
					<ErrorBoundary>
						<RoutesHistory />
					</ErrorBoundary>
				</AppContainer>
			</Router>
		</>
	);
};
/**
 * Wrap the app routes into router
 *
 * PROPS
 * =============================================================================
 * @returns {React.Node}
 */
export default routing;
