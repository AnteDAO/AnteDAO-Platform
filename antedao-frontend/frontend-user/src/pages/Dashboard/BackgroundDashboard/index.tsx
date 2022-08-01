import { useHistory } from "react-router";
import useStyles from "./style";

const telegramIcon = "/images/icons/baner-telegram-icon.svg";
const twitterIcon = "/images/icons/baner-twitter-icon.svg";
const mediumIcon = "/images/icons/meidum-icon.svg";

const BackgroundComponent = (props: any) => {
  const styles = useStyles();
  const history = useHistory();
  return (
    <>
      <div className={styles.backgroundComponent}>
        <div className={styles.mainContent}>
          <h1 className="title">
            Launchpad Platform For Crypto Startups{" "}
          </h1>
          <p className="description">
            The next step in evolving decentralized autonomous organizations.
          </p>
          <div className={styles.buttonArea}>
            <button
              onClick={() => history.push("/pools")}
              className="btn-crowdloan"
            >
              View all projects
            </button>
          </div>
          <ul className={styles.shareLink}>
            <li>
              <a
                href="https://t.me/AnteDAO_fi "
                target="_blank"
                rel="noreferrer"
              >
                <img src={telegramIcon} alt="telegram" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/AnteDAO_fi "
                target="_blank"
                rel="noreferrer"
              >
                <img src={twitterIcon} alt="twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@AnteDAO_fi"
                target="_blank"
                rel="noreferrer"
              >
                <img src={mediumIcon} alt="medium" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.backgroundCircle}>
        <div className="circle"></div>
      </div>
      <div className={styles.backgroundStar}>
        <div className="star"></div>
      </div>
    </>
  );
};

export default BackgroundComponent;
