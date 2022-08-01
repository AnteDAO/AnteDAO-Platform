import useStyles from "./styles";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

const byTokenLogo = "/images/landing/logo-brand.svg";
const twitter_icon = "/images/icons/twitter-icon.svg";
const telegram_icon = "/images/icons/telegram-icon.svg";
const m_icon = "/images/icons/m-icon.svg";
const textCopyRight = "©2022 AnteDAO. All rights reserved";

const FooterLandingLayout = () => {
  const styles = useStyles();

  return (
    <div className={styles.footer}>
      <div className={styles.bodyContent}>
        <Grid container className={styles.mainContent}>
          <Grid item xs={12} md={12} lg={4}>
            <div className={styles.infoBrand}>
              <Link className={styles.logo} to={"/"}>
                <img src={byTokenLogo} alt="" />
              </Link>
              <div className={styles.textContent}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={6} lg={2}>
            <div className={styles.footerComponent}>
              <ul>
                <li>
                  <a
                    className={styles.footerNavItem}
                    href="https://www.antedao.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    About
                  </a>
                </li>
                <li>
                  <a
                    className={styles.footerNavItem}
                    href="https://www.antedao.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Introduction
                  </a>{" "}
                </li>
                <li>
                  <a
                    className={styles.footerNavItem}
                    href="https://www.antedao.io/explore"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Token
                  </a>{" "}
                </li>
                <li>
                  <a
                    className={styles.footerNavItem}
                    href="https://www.antedao.io/explore"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Team
                  </a>{" "}
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={6} md={6} lg={2}>
            <div className={`${styles.footerComponent}`}>
              <ul>
                <li>
                  <a className={styles.footerNavItem} href="/#">
                    Contact
                  </a>{" "}
                </li>
                <li>
                  <a
                    className={styles.footerNavItem}
                    href="https://www.antedao.io/explore"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Roadmap
                  </a>{" "}
                </li>
                <li>
                  <a className={styles.footerNavItem} href="/#">
                    FAQ
                  </a>{" "}
                </li>
                <li>
                  <a className={styles.footerNavItem} href="/#">
                    Terms of service
                  </a>{" "}
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={6} md={4} lg={1}>
            <div className={styles.footerComponent}>
              <ul className={styles.shareLink}>
                <li>
                  <a
                    href="/#"
                    rel="noreferrer"
                  >
                    <img src={m_icon} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/Antedao"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={telegram_icon} alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/AnteDAO_IO"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={twitter_icon} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <div className={styles.copyRight}>
          {textCopyRight ? textCopyRight : ""}
        </div>
      </div>
    </div>
  );
};

export default FooterLandingLayout;
