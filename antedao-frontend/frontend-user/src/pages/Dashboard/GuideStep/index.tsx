import { useHistory } from "react-router";
import useStyles from "./styles";

const GuideStep = (props: any) => {
	const styles = useStyles();
	const history = useHistory();
	return (
		<div className={styles.guideStep} onClick={() => history.push("/")}>
			<h2>
				Easy to join with 5 steps to join the project on AnteDAO
			</h2>
			<div className={styles.step}>
				<div className="wrap-circle-step">
					<div className={`${styles.circleStep} s-1`}>
						<div className="circle">
							<div className="step-icon">
								<img src="/images/icons/step-icon.svg" alt="" />
							</div>
							<span className="step-number">1</span>
						</div>
						<span className="step-name">Stake</span>
					</div>
					<div className={styles.shapeStep}></div>
					<div className={`${styles.circleStep} s-2`}>
						<span className="circle">
							<div className="step-icon">
								<img src="/images/icons/step-icon.svg" alt="" />
							</div>
							<span className="step-number">2</span>
						</span>
						<span className="step-name">KYC</span>
					</div>
					<div className={styles.shapeStep}></div>
					<div className={`${styles.circleStep} s-3`}>
						<span className="circle">
							<div className="step-icon">
								<img src="/images/icons/step-icon.svg" alt="" />
							</div>
							<span className="step-number">3</span>
						</span>
						<span className="step-name">Apply Whitelist</span>
					</div>
					<div className={styles.shapeStep}></div>
					<div className={`${styles.circleStep} s-4`}>
						<span className="circle">
							<div className="step-icon">
								<img src="/images/icons/step-icon.svg" alt="" />
							</div>
							<span className="step-number">4</span>
						</span>
						<span className="step-name">Swap</span>
					</div>
					<div className={styles.shapeStep}></div>
					<div className={`${styles.circleStep} s-5`}>
						<span className="circle">
							<div className="step-icon">
								<img src="/images/icons/step-icon.svg" alt="" />
							</div>
							<span className="step-number">5</span>
						</span>
						<span className="step-name">Claim</span>
					</div>
				</div>

				
			</div>
		</div>
	);
};

export default GuideStep;
