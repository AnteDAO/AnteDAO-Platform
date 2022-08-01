/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { getOwnerWalletAddress } from "../../store/actions/campaign";
import { updateStakingPoolFee } from "../../store/actions/staking-pool";
import useStakingFee from "./../../hooks/useStakingFee";
import useStyles from "./style";

import { APP_NETWORK_NAMES, POLYGON_CHAIN_ID } from "./../../../src/constants";

import FieldInput from "../../components/Input";
import DefaultLayout from "../../components/Layout/DefaultLayout";

import {
	Button, CircularProgress, createStyles, FormControlLabel, Switch, Theme, withStyles
} from "@material-ui/core";
import NetworkWaningPolygon from "../NetworkChange/NetworkWaningPolygon";

const REQUIRED = "This field is required!";
const SAME = "Wallet address existed!";
const INVALID = "Invalid Wallet Address!";

// const transactionMessage = {
// 	rejected: "Transaction rejected!",
// 	error: "Transaction error!",
// 	completed: "Transaction completed!",
// };

const AntSwitch = withStyles((theme: Theme) =>
	createStyles({
		root: {
			width: 44,
			height: 22,
			padding: 0,
			display: "flex",
			zIndex: 100,
		},
		switchBase: {
			padding: 2,
			color: "#fff",
			"&$checked": {
				transform: "translateX(22px)",
				color: "#fff",
				"& + $track": {
					opacity: 1,
					backgroundColor: "#1890FF",
					borderColor: "#1890FF",
					backgroundImage:
						"linear-gradient(to right,#1890FF,#1890FF),linear-gradient(to right,#fff,#fff)",
				},
			},
		},
		thumb: {
			width: 18,
			height: 18,
			boxShadow: "none",
		},
		track: {
			border: `1px solid transparent`,
			borderRadius: 16,
			opacity: 1,
			backgroundImage:
				"linear-gradient(to right,rgba(0,0,0,.25),rgba(0,0,0,.25)),linear-gradient(to right,#fff,#fff)",
		},
		checked: {},
	}),
)(Switch);

const Setting = () => {
	const { handleSubmit } = useForm({
		mode: "onChange",
	});
	const classes = useStyles();
	const dispatch = useDispatch();
	const mainClass = classes.settingPage;
	const [addressOwner, setAddressOwner] = useState<any>("");
	const { wallet_address, currentNetworkId } = useSelector((state: any) => {
		return {
			...state,
			currentNetworkId: state.userCurrentNetwork.currentNetworkId,
			wallet_address: state.user.data.wallet_address,
		};
	});
	const checkNetWork = currentNetworkId !== POLYGON_CHAIN_ID;

	const [data, setData] = useState({
		stake: false,
		unstake: false,
		address: "",
		fee: "",
	});
	const [loadingUpdate, setLoadingUpdate] = useState(false);
	const [disable, setDisable] = useState(true)

	const [err, setErr] = useState({
		address: "",
		fee: "",
	});

	const {fetchStakingFee } = useStakingFee();

	const fetchData = async () => {
		const dataStakingFee = await fetchStakingFee();
		const { stakeFeeStatus, unstakeFeeStatus, feeVAlueRaw, treasuryAddress } =
			dataStakingFee as any;
		setData({
			...data,
			stake: stakeFeeStatus,
			unstake: unstakeFeeStatus,
			fee: (parseFloat(feeVAlueRaw) / 100).toString(),
			address: treasuryAddress,
		});
	};
	useEffect(() => {
		fetchData();
		getOwner();
	}, [currentNetworkId]);

	const getOwner = async () => {
		if (currentNetworkId) {
			const addressOwner = await getOwnerWalletAddress(
				APP_NETWORK_NAMES[currentNetworkId] || "",
			);
			setAddressOwner(addressOwner);
		}
	};

	const isOwner = addressOwner === wallet_address;

	const handleCheck = () => {
		if (
			(data.stake && data.unstake && !data?.fee) ||
			(data.stake && !data?.fee) ||
			(data.unstake && !data?.fee) ||
			(data.address && !data?.address)
		) {
			setErr({ ...err, fee: REQUIRED });
		} else {
			setErr({ ...err, fee: "" });
			handleSubmitData();
		}
	};

	const handleSubmitData = () => {
		setLoadingUpdate(true)
		dispatch(updateStakingPoolFee(data, setDisable, setLoadingUpdate));
	};

	const handleChangeAddress = debounce((value: any) => {
		setData({ ...data, address: value });
		const isAddress = Web3.utils.isAddress(value);
		const isSame = value === addressOwner;
		if (!isAddress) return setErr({ ...err, address: INVALID });
		if (isSame) return setErr({ ...err, address: SAME });
		return setErr({ ...err, address: "" });
	}, 500);

	const handleChangeFee = (value: any) => {
		const valueSplit = value.split(".")
		if(valueSplit && valueSplit.length > 1){
			setErr({ ...err, fee: "" });
			
			setData({ ...data, fee: `${valueSplit[0]}.${valueSplit[1].substring(0,2)}`});
		}else{
			setDisable(false);
			setErr({ ...err, fee: "" });
			setData({ ...data, fee: value });
		}
	};

	const handleSwitchStake = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.checked && !data.unstake) setErr({ ...err, fee: "" });
		setData({ ...data, [e.target.name]: e.target.checked });
		setDisable(false);

	};
	const handleSwitchUnstake = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.checked && !data.stake) setErr({ ...err, fee: "" });
		setData({ ...data, [e.target.name]: e.target.checked });
		setDisable(false);
	};

	return (
		<DefaultLayout>
			{(checkNetWork) ? (
				<NetworkWaningPolygon />
			) : (<></>)}
			<div className={mainClass}>
				<form onSubmit={handleSubmit(handleCheck)}>
					<div className="d-flex-1">
						<div className="label" style={{ width: 120 }}>
							Treasury Address
						</div>
						<div style={{ marginLeft: 47 }}>
							<FieldInput
								id="address"
								value={data?.address}
								label=""
								onChange={handleChangeAddress}
								InputLabelProps={{ shrink: true }}
								disabled={!isOwner}
								error={err.address}
							/>
						</div>
					</div>
					<div className="d-flex">
						<div className="label">Stake/Unstake fee</div>
						<div style={{ marginLeft: 47, display:"flex" }}>
							<FieldInput
								min={1}
								max={10}
								type="number"
								id="stake"
								value={data?.fee}
								onChange={handleChangeFee}
								endAdorn="%"
								disabled={!isOwner || (!data?.stake && !data.unstake)}
								error={err.fee}
								decimal={2}
							/>
						</div>
					</div>
					<div className="d-flex">
						<div className="label" style={{ width: 120 }}>
							Stake fee apply
						</div>
						<div className="sw">
							<FormControlLabel
								control={
									<AntSwitch
										onChange={handleSwitchStake}
										checked={data?.stake}
										name="stake"
										disabled={!isOwner}
									/>
								}
								label=""
							/>
						</div>
					</div>
					<br />
					<div className="d-flex">
						<div className="label" style={{ width: 120 }}>
							Unstake fee apply
						</div>
						<div className="sw">
							<FormControlLabel
								control={
									<AntSwitch
										onChange={handleSwitchUnstake}
										checked={data?.unstake}
										name="unstake"
										disabled={!isOwner}
									/>
								}
								label=""
							/>
						</div>
					</div>
					<Button
						type="submit"
						className={loadingUpdate ? 'btn-loading' : 'btn-update'}
						disabled={disable || !isOwner
						}
					>
						{loadingUpdate && <CircularProgress size={25} />}
              			{!loadingUpdate && 'Update'}
					</Button>
				</form>
				<div className="description">* Stake/UnStake fee range from 1% to 10%</div>
			</div>
		</DefaultLayout>
	);
};

export default Setting;
