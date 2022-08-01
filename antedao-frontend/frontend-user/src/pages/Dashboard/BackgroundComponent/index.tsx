import { useHistory } from "react-router";
import useStyles from "./style";
import withWidth, { isWidthDown, isWidthUp } from "@material-ui/core/withWidth";

const assets1 = "/images/star_group.png";
const assets2 = "/images/landing/Asset_2.png";
const BackgroundComponent = (props: any) => {
  const styles = useStyles();
  const history = useHistory();
  return (
    <div className={styles.backgroundComponent}>
      <div className={styles.mainContent}>
        <p className="description">Welcome to AnteDAO</p>
        {isWidthUp("md", props.width) && (
          <>
            <h1 className="title hidden">
              Launchpad Platform <br /> For Crypto Startups{" "}
            </h1>
          ss</>
        )}
        {isWidthDown("sm", props.width) && (
          <h1 className="title">
            Launchpad <br />
            Platform For <br />
            Crypto Startups{" "}
          </h1>
        )}
        <p className="sub-des">
          The next step in evolving decentralized autonomous organizations.
        </p>
        <img src={assets1} alt="" className="asset_bg" />
        <img src={assets2} alt="" className="asset_sm" />
        <div className={styles.buttonArea}>
          <a
            href="https://antedao-1.gitbook.io/antedao/"
            className="btn btn-whitepaper"
            target="_blank" 
            rel="noreferrer"
          >
            White Paper
          </a>
          <span
            onClick={() => history.push("/pools")}
            className="btn btn-launch"
          >
            Launch APP
          </span>
        </div>
      </div>
    </div>
  );
};

export default withWidth()(BackgroundComponent);
