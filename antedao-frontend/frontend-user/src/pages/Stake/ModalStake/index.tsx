import { Modal, Button } from "@material-ui/core";
import useStyles from "./style";

const logo = "/images/unstake-early.svg";

const ModalStake = (props: any) => {
	const styles = useStyles();
	const { open, onConfirm, onClose, text,title } = props;

	return (
		<Modal
			open={open}
			onClose={onClose}
			style={{ overflow: "auto", inset: "0", outline: "none" }}
		>
			<div className={styles.modalStake}>
				<div className="ant-modal-content">
					<div className="ant-modal-body">
						<div className="ant-modal-confirm-body-wrapper">
							<div className="ant-modal-confirm-body">
								<img src={logo} className="img" alt="" />
								<div className="ant-modal-confirm-title">{title}</div>
								<div className="ant-modal-confirm-content">{text}</div>
							</div>
							<div className="ant-modal-confirm-btns">
								<Button
									variant="contained"
									size="small"
									className="btn-1"
									onClick={onConfirm}
								>
									Yes, Sure
								</Button>
								<Button
									variant="contained"
									size="small"
									className="btn-2"
									onClick={onClose}
								>
									Cancel
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ModalStake;
