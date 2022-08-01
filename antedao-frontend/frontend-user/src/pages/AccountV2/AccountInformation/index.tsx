/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Hidden, TextField, withWidth } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { KYC_STATUS } from "../../../constants";
import useAuth from "../../../hooks/useAuth";
import useWalletSignature from "../../../hooks/useWalletSignature";
import axios from "../../../services/axios";
import { alertFailure } from "../../../store/actions/alert";
import ModalVerifyEmail from "../ModalVerifyEmail";
import useStyles from "./style";

const msgValidate = "Only alphanumeric characters and underscores only and can not exceed 60 characters";

const AccountInformation = (props: any) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const [openModalVerifyEmail, setOpenModalVerifyEmail] = useState(false);
	const { connectedAccount } = useAuth();
	const [onEditProfile, setOnEditProfile] = useState(false);
	const { signature, signMessage, setSignature } = useWalletSignature();
	const { account } = useWeb3React();

	const handleKYC = () => {
		window.open(
			"https://verify-with.blockpass.org/?clientId=antedao_555e9&serviceName=AnteDAO&env=prod",
			"_blank",
		);
	};

	const {
		email,
		setEmail,
		setEmailVeryfied,
		kycStatus,
		twitter,
		telegram,
		setUpdatedSuccess,
		isKYC,
		isLoadingKYC,
	} = props;

	useEffect(() => {
		setOnEditProfile(false);
		setSignature("");
	}, [connectedAccount]);

	const { register, errors, handleSubmit, setValue } = useForm({
		mode: "onChange",
		defaultValues: {
			twitter,
			telegram,
		},
	});

	const onSetEditProfile = async () => {
		if (!signature) {
			// return;
			await signMessage();
		} else {
			setOnEditProfile(true);
			setUpdatedSuccess(false);
		}
	};

	useEffect(() => {
		if (signature && connectedAccount) {
			setOnEditProfile(true);
			setUpdatedSuccess(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signature]);

	useEffect(() => {
		if (onEditProfile) {
			setValue("twitter", twitter);
			setValue("telegram", telegram);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}
	}, [onEditProfile]);

	const handleFormSubmit = async (data: any) => {
		if (signature) {
			const config = {
				headers: {
					msgSignature: process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE,
				},
			};

			const response = (await axios.put(
				`/user/update-profile`,
				{
					signature,
					wallet_address: account,
					user_twitter: data?.twitter,
					user_telegram: data?.telegram,
				},
				config as any,
			)) as any;

			if (response.data) {
				if (response.data.status === 200) {
					setOnEditProfile(false);
					setUpdatedSuccess(true);
				}

				if (response.data.status !== 200) {
					dispatch(alertFailure(response.data.message));
				}
			}
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.headPage}>
				<h2 className={styles.title}>My Profile</h2>
				{connectedAccount && !onEditProfile && isKYC && (
					<Hidden smDown>
						<Button
							variant="contained"
							className={styles.btnEditProfile}
							onClick={() => onSetEditProfile()}
						>
							<img src="/images/account_v3/icons/edit-two.svg" alt="" />
							<span>Edit Profile</span>
						</Button>
					</Hidden>
				)}
			</div>

			<div className={styles.mainInfomation}>
				<div className={styles.inputGroup}>
					<span>Your Wallet Address</span>
					<span style={{ wordBreak: "break-word" }}>{connectedAccount}</span>
				</div>

				<div className={styles.inputGroup}>
					<span>KYC Status</span>
					{connectedAccount && (
						<div className="flex">
							{isLoadingKYC ? (
								<span>Loading...</span>
							) : (
								<span>
									{(!kycStatus || kycStatus === KYC_STATUS.INCOMPLETE) && (
										<span className="unverified">
											Unverified
											<img
												className={styles.iconStatus}
												src="/images/account_v3/icons/icons8-cancel.svg"
												alt=""
											/>
										</span>
									)}
									{(!kycStatus || kycStatus === KYC_STATUS.INCOMPLETE) && (
										<button className="verify-email" onClick={handleKYC}>
											KYC Now
										</button>
									)}

									{kycStatus === KYC_STATUS.APPROVED && (
										<span className="verified">
											Verified
											<img
												className={styles.iconStatus}
												src="/images/account_v3/icons/icon_verified.svg"
												alt=""
											/>
										</span>
									)}

									{kycStatus === KYC_STATUS.RESUBMIT && (
										<span style={{ color: "red", overflow: "unset" }}>
											Rejected
										</span>
									)}
								</span>
							)}
						</div>
					)}
				</div>
				<div className={styles.inputGroup}>
					<span>Email Address</span>
					{connectedAccount && (
						<>
							{!kycStatus || kycStatus === KYC_STATUS.INCOMPLETE ? (
								<span>
									Your email used to complete KYC on Blockpass will be
									automatically reflected here. <br />
									Please complete KYC first.
								</span>
							) : (
								<span className={styles.nameSocial}>{email}</span>
							)}
						</>
					)}
				</div>

				{connectedAccount && kycStatus === KYC_STATUS.APPROVED && (
					<form id="hook-form" onSubmit={handleSubmit(handleFormSubmit)}>
						<div className={styles.inputGroup}>
							<span className={styles.spanError}>Twitter Account</span>
							{connectedAccount && (
								<>
									{onEditProfile ? (
										<div className={styles.groupInput}>
											<TextField
												autoComplete="off"
												className={styles.inputNewValue}
												defaultValue={twitter}
												placeholder="Enter your account name, EX: account"
												name="twitter"
												error={!!errors.twitter}
												helperText={
													!!errors.twitter &&
													msgValidate
												}
												inputRef={register({
													required: false,
													pattern: new RegExp(/^[a-zA-Z0-9_]*$/),
													maxLength: 60,
												})}
												onKeyDown={(e: any) => {
													if (e.keyCode === 32) {
														e.preventDefault();
													}
												}}
											/>
										</div>
									) : (
										<span className={styles.nameSocial}>{twitter ?? "-"}</span>
									)}
								</>
							)}
						</div>

						<div className={styles.inputGroup}>
							<span className={styles.spanError}>Telegram Account</span>
							{connectedAccount && (
								<>
									{onEditProfile ? (
										<div className={styles.groupInput}>
											<TextField
												autoComplete="off"
												className={styles.inputNewValue}
												defaultValue={telegram}
												placeholder="Enter your account name, EX: account"
												name="telegram"
												error={!!errors.telegram}
												helperText={
													errors.telegram &&
													msgValidate
												}
												inputRef={register({
													required: false,
													pattern: new RegExp(/^[a-zA-Z0-9_]*$/),
													maxLength: 60,
												})}
												onKeyDown={(e: any) => {
													if (e.keyCode === 32) {
														e.preventDefault();
													}
												}}
											/>
										</div>
									) : (
										<span>{telegram ?? "-"}</span>
									)}
								</>
							)}
						</div>
					</form>
				)}

				<div className={styles.inputGroup} style={{ marginBottom: 5 }}>
					<span></span>
					{connectedAccount && (
						<>
							<span style={{ color: "red", display: "inline-block" }}>
								{kycStatus === KYC_STATUS.RESUBMIT &&
									"Please send information to support@polkafoundry.com to resubmit KYC."}
							</span>
						</>
					)}
				</div>
			</div>

			{connectedAccount && !onEditProfile && kycStatus === KYC_STATUS.APPROVED && (
				<Hidden mdUp>
					<Button
						variant="contained"
						className={styles.btnEditProfile}
						onClick={() => onSetEditProfile()}
					>
						<img src="/images/account_v3/icons/icon_edit.svg" alt="" />
						Edit Profile
					</Button>
				</Hidden>
			)}

			{connectedAccount && onEditProfile && kycStatus === KYC_STATUS.APPROVED && (
				<div className={styles.footerPage}>
					<Button
						form="hook-form"
						type="submit"
						variant="contained"
						className={styles.btnUpdateProfile}
						onClick={() => handleFormSubmit}
					>
						Update Profile
					</Button>
				</div>
			)}

			<ModalVerifyEmail
				setOpenModalVerifyEmail={setOpenModalVerifyEmail}
				email={email}
				setEmail={setEmail}
				open={openModalVerifyEmail}
				setEmailVeryfied={setEmailVeryfied}
			/>
		</div>
	);
};

export default withWidth()(AccountInformation);
