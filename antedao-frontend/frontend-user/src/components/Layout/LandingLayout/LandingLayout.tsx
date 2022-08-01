import { useCommonStyle } from "../../../styles";
import FooterLandingLayout from "../../Base/FooterLandingLayout";
import HeaderDefaultLayout from "../../Base/HeaderDefaultLayout";
import MainDefaultLayout from "../../Base/MainDefaultLayout";

const LandingLayout = (props: any) => {
	const commonStyle = useCommonStyle();
	const { isTransparentHeader } = props;
	return (
		<div className={commonStyle.DefaultLayout}>
			<HeaderDefaultLayout
				isTransparentHeade={isTransparentHeader}
				isKYC={props.isKYC}
			/>
			<MainDefaultLayout
				isTransparentHeader={isTransparentHeader}
				backgroundColor="#020618"
			>
				{props.children}
			</MainDefaultLayout>
			<FooterLandingLayout />
		</div>
	);
};

export default LandingLayout;
