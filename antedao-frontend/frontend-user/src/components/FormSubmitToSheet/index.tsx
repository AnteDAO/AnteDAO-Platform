/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";
import {
	OutlinedInput,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
	Dialog,
	Button,
	FormControl,
	FormHelperText,
	TextareaAutosize,
} from "@material-ui/core/";
import { DialogProps } from "@material-ui/core/Dialog";
import { useDispatch } from "react-redux";
import { alertFailure, alertSuccess } from "../../store/actions/alert";
import useStyles from "./style";

const closeIcon = "/images/close.svg";

const scriptUrl = process.env.REACT_APP_API_GOOGLE_SHEET || "";

const Form = (props: any) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const formRef = useRef<any>(null);
	const descriptionElementRef = useRef<HTMLElement>(null);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
	const [data, setData] = useState<any>({});

	useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	useEffect(() => {
		if (props.onRef) {
			props.onRef({
				handleClickOpen,
			});
		}
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
		setScroll("paper");
	};

	const handleClose = () => {
		setOpen(false);
		setData({});
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setLoading(true);
		fetch(scriptUrl, {
			method: "POST",
			body: new FormData(formRef.current),
		})
			.then((res) => {
				setOpen(false);
				setLoading(false);
				setData({});
				dispatch(alertSuccess("Completed!"));
			})
			.catch((err) => dispatch(alertFailure(err)));
	};

	const handleChangeForm = debounce((e: any) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}, 300);

	const validateEmail = (text: any) => {
		return String(text)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			);
	};

	const isDisabled = !data?.name || !data?.email || !data?.project_name;

	const isNotEmail = data?.email && !validateEmail(data?.email);

	return (
		<div className={styles.submitFormContainer}>
			<a onClick={handleClickOpen} style={{ cursor: "pointer" }}>
				Apply to launch
			</a>
			<Dialog
				open={open}
				onClose={handleClose}
				scroll={scroll}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle
					id="scroll-dialog-title"
					color="inherit"
					style={{
						background: "#1F242C",
						color: "#FFFFFF",
						position: "relative",
					}}
				>
					<span
						style={{
							fontSize: "1.1rem",
						}}
					>
						Want your project on AnteDAO
					</span>
					<img
						src={closeIcon}
						style={{
							position: "absolute",
							right: "22px",
							cursor: "pointer",
							top: "22px",
						}}
						alt=""
						width={24}
						height="auto"
						onClick={handleClose}
					/>
				</DialogTitle>
				<DialogContent
					dividers={scroll === "paper"}
					style={{ background: "#1F242C" }}
				>
					<DialogContentText
						id="scroll-dialog-description"
						ref={descriptionElementRef}
					>
						<form
							ref={formRef}
							onSubmit={handleSubmit}
							name="google-sheet"
							autoComplete="off"
							className="form-google-sheet"
						>
							<FormControl
								variant="outlined"
								fullWidth
								margin="dense"
								required
								className="fix_1"
							>
								<label htmlFor="component-outlined">Name</label>
								<OutlinedInput
									id="name"
									name="name"
									placeholder="Enter your full name"
									onChange={handleChangeForm}
								/>
							</FormControl>
							<FormControl
								variant="outlined"
								fullWidth
								margin="dense"
								required
								error={isNotEmail}
								className="fix_1"
							>
								<label htmlFor="component-outlined">E-mail</label>
								<OutlinedInput
									id="email"
									name="email"
									placeholder="We will contact you by your email"
									type="email"
									onChange={handleChangeForm}
								/>
								{isNotEmail ? (
									<FormHelperText id="my-helper-text">
										Please enter correct email!
									</FormHelperText>
								) : null}
							</FormControl>
							<FormControl
								variant="outlined"
								fullWidth
								margin="dense"
								required
								className="fix_1"
							>
								<label htmlFor="component-outlined">Project name</label>
								<OutlinedInput
									id="project_name"
									name="project_name"
									placeholder="Enter the name of your project"
									onChange={handleChangeForm}
								/>
							</FormControl>
							<FormControl
								variant="outlined"
								fullWidth
								margin="dense"
								className="fix_2"
							>
								<label htmlFor="component-outlined">Project description</label>
								<TextareaAutosize
									minRows={3}
									id="project_description"
									name="project_description"
									placeholder="Briefly tell us more about your project and its status idea, concept, stage"
									onChange={handleChangeForm}
								/>
							</FormControl>
							<FormControl
								variant="outlined"
								fullWidth
								margin="dense"
								className="fix_2"
							>
								<label htmlFor="component-outlined">
									Additional Information
								</label>
								<TextareaAutosize
									minRows={3}
									id="additional_information"
									name="additional_information"
									placeholder="Provide other important data: website or whitepaper link, etc"
									onChange={handleChangeForm}
								/>
							</FormControl>
							<input type="submit" hidden />
						</form>
					</DialogContentText>
				</DialogContent>
				<DialogActions
					style={{
						background: "#1F242C",
						justifyContent: "center",
						padding: "12px 8px",
						paddingBottom: "20px",
					}}
				>
					<Button
						onClick={handleSubmit}
						disabled={loading || isDisabled}
						className="btn-apply"
					>
						{loading ? "SENDING..." : "APPLY"}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Form;
