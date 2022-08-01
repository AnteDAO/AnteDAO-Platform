import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import {
	createStyles,
	Theme,
	withStyles,
	WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import useStyles from "./style";
import WhitelistFollowSocial from "./WhitelistFollowSocial";

// const TWITTER_REGEX = /^[A-Za-z0-9_]{1,60}$/;

const titleStyles = (theme:any) =>
	createStyles({
		root: {
			margin: 0,
			background: theme.custom.colors.darkDeepBlack,
			padding: 0,
			textAlign: "left",
			fontSize: "24px",
			lineHeight: "18px",
			fontWeight: "bold",
		},
		closeButton: {
			position: "absolute",
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.custom.colors.grey6,
			backgroundColor: theme.custom.colors.darkDeepBlack,
			padding: 4,
		},
		svgIcon: {
			fontSize: 5,
		},
	});

export interface DialogTitleProps extends WithStyles<typeof titleStyles> {
	id: string;
	children: React.ReactNode;
	onClose: () => void;
	customClass: string;
	networkAvailable?: string;
}

export interface ComponentProps {
	opened: boolean;
	handleClose: () => void;
}

const DialogTitle = withStyles(titleStyles)((props: DialogTitleProps) => {
	const { children, classes, customClass, onClose, ...other } = props;

	const customStyles = {
		color: "#FCFCFD",
		fontSize: "24px",
		fontWeight: 700,
	};

	return (
		<MuiDialogTitle
			disableTypography
			className={`${classes.root} ${customClass}`}
			{...other}
		>
			<Typography variant="h5" style={customStyles}>
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme: Theme) => ({
	root: {
		padding: 0,
		color: "#FCFCFD",
		marginLeft: 0,
		marginBottom: "24px",
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
	root: {
		marginTop: theme.spacing(5),
		"& > :not(:first-child)": {
			marginLeft: theme.spacing(2),
		},
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			"& > :not(:first-child)": {
				marginLeft: 0,
				marginTop: theme.spacing(1),
			},
		},
	},
}))(MuiDialogActions);

const PendingAlert = () => {
	return (
		<div style={{ display: "flex", marginBottom: "1rem" }}>
			<svg
				width="14"
				height="14"
				style={{ marginTop: ".1rem", minWidth: "14px", minHeight: "14px" }}
				viewBox="0 0 14 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7 0C3.14005 0 0 3.14005 0 7C0 10.86 3.14005 14 7 14C10.86 14 14 10.86 14 7C14 3.14005 10.86 0 7 0ZM10.3291 10.6207C10.2153 10.7345 10.066 10.7917 9.9167 10.7917C9.76738 10.7917 9.61795 10.7345 9.5043 10.6207L6.5876 7.7041C6.47791 7.59505 6.4167 7.44679 6.4167 7.2917V3.5C6.4167 3.17743 6.67796 2.9167 7 2.9167C7.32204 2.9167 7.5833 3.17743 7.5833 3.5V7.0502L10.3291 9.7959C10.5571 10.024 10.5571 10.3927 10.3291 10.6207Z"
					fill="#FFD058"
				/>
			</svg>
			<p style={{ marginLeft: ".5rem", color: "#FFD058", fontSize: "14px" }}>
				We will verify your application WITHIN 1 DAY. We will send you an email
				at support@polkafoundry.com to explain why your application is pending
				approval. Please be patient and keep an eye on the email.
			</p>
		</div>
	);
};

const RejectedAlert = () => {
	return (
		<div style={{ display: "flex", marginTop: 8, marginBottom: "1rem" }}>
			<svg
				width="14"
				height="14"
				style={{ marginTop: ".1rem", minWidth: "14px", minHeight: "14px" }}
				viewBox="0 0 14 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7.02734 0C3.18254 0 0 3.12785 0 6.97266C0 10.8175 3.18254 14 7.02734 14C10.8721 14 14 10.8175 14 6.97266C14 3.12785 10.8721 0 7.02734 0ZM10.4787 9.26379C10.7986 9.58371 10.7986 10.1041 10.4787 10.4243C10.1612 10.7414 9.64086 10.7466 9.3182 10.4243L7.02734 8.13258L4.68152 10.4245C4.3616 10.7445 3.84125 10.7445 3.52105 10.4245C3.20113 10.1046 3.20113 9.58426 3.52105 9.26406L5.81246 6.97266L3.52105 4.68125C3.20113 4.36105 3.20113 3.8407 3.52105 3.52078C3.84125 3.20086 4.3616 3.20086 4.68152 3.52078L7.02734 5.81273L9.3182 3.52078C9.63758 3.20141 10.1579 3.20031 10.4787 3.52078C10.7986 3.8407 10.7986 4.36105 10.4787 4.68125L8.18727 6.97266L10.4787 9.26379Z"
					fill="#D01F36"
				/>
			</svg>
			<p
				style={{
					marginLeft: ".5rem",
					color: "#ec0c29",
					fontSize: "14px",
					fontWeight: 400,
				}}
			>
				You haven't followed or subscribed to these accounts.
			</p>
		</div>
	);
};

const renderError = (errors: { [key: string]: any }, field: string) => {
	if (errors[field]) {
		const errorType = errors[field].type;
		switch (errorType) {
			case "required": {
				return "This field is required";
			}
			case "maxLength": {
				return "Only alphanumeric characters and underscores only and can not exceed 60 characters";
			}
			case "pattern": {
				return 'Only alphanumeric characters and underscores only and can not exceed 60 characters"';
			}
		}
	}
};

const ApplyWhitelistModal: React.FC<any> = (props: any) => {
	const {
		poolDetails,
		connectedAccount,
		alreadyJoinPool,
		joinPoolSuccess,
		joinPool,
		handleClose,
		whitelistSubmission,
	} = props;
	const styles = useStyles();

	const [loading, setLoading] = useState(false);
	const [rejectedSubmission, setRejectedSubmission] = useState(undefined);
	const [pendingSubmission] = useState(false);

	const { register, errors, handleSubmit } = useForm({
		mode: "onChange",
		defaultValues: {
			user_twitter: "",
			user_telegram: "",
		},
	});
	const handleApply = async (data: any) => {
		setRejectedSubmission(undefined);
		joinPool(
			{
				wallet_address: connectedAccount,
				user_twitter: data.user_twitter,
				user_telegram: data.user_telegram,
			},
			(isError: boolean, error?: any) => {
				setLoading(false);
				if (isError) {
					if (error) setRejectedSubmission(error);
					else handleClose();
				} else handleClose();
			},
		);
	};

	const handleSubmitForm = () => {
		setLoading(true);
		handleSubmit(handleApply, (err) => setLoading(false))();
	};

	return (
		<Dialog
			open
			fullWidth={true}
			maxWidth={"md"}
			className={styles.socialDialog}
		>
			<DialogTitle
				id="customized-dialog-title"
				onClose={handleClose}
				customClass={styles.dialogTitle}
			>
				Welcome to {poolDetails?.title} IDO on AnteDAO
			</DialogTitle>
			<DialogContent>
				<div>
					<p
						style={{
							margin: "12px 0px 26px",
							color: "#777E90",
							lineHeight: "21px",
							fontSize: "14px",
							fontWeight: "400",
						}}
					>
						In order to participate in the IDO, you must fulfill requirements as
						below.
					</p>
				</div>
				<div>
					<WhitelistFollowSocial
						poolDetails={poolDetails}
						whitelistSubmission={whitelistSubmission || rejectedSubmission}
					/>
				</div>
				{pendingSubmission && <PendingAlert />}
				{rejectedSubmission && <RejectedAlert />}
				<div>
					<div className="socialForm">
						{poolDetails?.socialRequirement?.self_retweet_post && (
							<div className={styles.socialStep}>
								<p style={{ fontWeight: 700 }}>
									Like and retweet the &nbsp;
									<a
										target="_blank"
										rel="noopener noreferrer"
										className={styles.socialAnchorlink}
										href={poolDetails?.socialRequirement?.self_retweet_post}
									>
										{poolDetails?.title} IDO announcement
									</a>{" "}
									on AnteDAO’s Twitter
									{poolDetails?.socialRequirement
										?.self_retweet_post_hashtag && (
										<span>
											&nbsp;with the hashtags{" "}
											<span style={{ color: "rgb(99, 152, 255)" }}>
												{
													poolDetails?.socialRequirement
														?.self_retweet_post_hashtag
												}
											</span>
										</span>
									)}
								</p>
							</div>
						)}
						<div className="row">
							<div className="input-group">
								<div className="label">
									Your Twitter Username{" "}
									{poolDetails?.socialRequirement?.partner_twitter ||
									poolDetails?.socialRequirement?.self_twitter ? (
										<span style={{ color: "#ff4d4f" }}>*</span>
									) : null}
								</div>
								<input
									type="text"
									disabled={alreadyJoinPool || joinPoolSuccess}
									autoComplete="off"
									name="user_twitter"
									placeholder="@username"
									ref={register({
										required:
											poolDetails?.socialRequirement?.partner_twitter ||
											poolDetails?.socialRequirement?.self_twitter,
										maxLength: 60,
										pattern: new RegExp(/^[a-zA-Z0-9_]*$/),
									})}
								/>
								{errors.user_twitter && (
									<div className={styles.error}>
										{renderError(errors, "user_twitter")}
									</div>
								)}
							</div>
							<div className="input-group">
								<div className="label">
									Your Telegram Username{" "}
									{poolDetails?.socialRequirement?.partner_channel ||
									poolDetails?.socialRequirement?.self_channel ? (
										<span style={{ color: "#ff4d4f" }}>*</span>
									) : null}
								</div>
								<input
									type="text"
									disabled={alreadyJoinPool || joinPoolSuccess}
									autoComplete="off"
									name="user_telegram"
									placeholder="@username"
									ref={register({
										required:
											poolDetails?.socialRequirement?.partner_channel ||
											poolDetails?.socialRequirement?.self_channel,
										maxLength: 60,
										pattern: new RegExp(/^[a-zA-Z0-9_]*$/),
									})}
								/>
								{errors.user_telegram && (
									<div className={styles.error}>
										{renderError(errors, "user_telegram")}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
			{!alreadyJoinPool && !joinPoolSuccess && (
				<DialogActions>
					<Button
						text={"Submit"}
						onClick={handleSubmitForm}
						loading={loading}
						disabled={
							loading || !!errors.user_telegram || !!errors.user_twitter
						}
						className={styles.footerButton}
			
					/>
					<Button
						text={"Cancel"}
						onClick={handleClose}
						className={`${styles.footerButton}  ${styles.close}`}
					/>
				</DialogActions>
			)}
		</Dialog>
	);
};

export default ApplyWhitelistModal;
