import { Hidden, withWidth } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./style";

const Guide = {
  name: "Guide",
  childs: [
    {
      title: "Before Joining IDOs",
      href: "https://antedao-user.sotatek.works/#/",
    },
    {
      title: "Tiers",
      href: "https://antedao-user.sotatek.works/#/",
    },
    {
      title: "How to Swap Tokens",
      href: "https://antedao-user.sotatek.works/#/",
    },
    
    {
      title: "How to claim tokens",
      href: "https://antedao-user.sotatek.works/#/",
    },
  ],
}

const FAQs = {
  name: "FAQs",
  childs: [
    {
      title: "Get started with AnteDAO",
      href: "https://antedao-user.sotatek.works/#/",
    },
    {
      title: "Allocation Result & Buying",
      href: "https://antedao-user.sotatek.works/#/",
    },
    {
      title: "KYC",
      href: "https://antedao-user.sotatek.works/#/",
    },
    {
      title: "Claim",
      href: "https://antedao-user.sotatek.works/#/",
    },
    {
      title: "Staking",
      href: "https://antedao-user.sotatek.works/#/",
    },
    {
      title: "Others",
      href: "https://antedao-user.sotatek.works/#/",
    },
    {
      title: "Whitelist",
      href: "https://antedao-user.sotatek.works/#/",
    },
  ],
};

const ButtonMailto = (props: any) => {
  return (
    <Link
    style={{color:'#FD849C'}}
      to="#"
      onClick={(e) => {
        window.location = props.mailto;
        e.preventDefault();
      }}
    >
      {props.label}
    </Link>
  );
};

const NeedHelp = (props: any) => {
  const styles = useStyles();
  // const [listQuestions] = useState(guideFAQs);

  return (
    <div className={styles.pageNeedHelp}>
      <h2 className={styles.title}>Need some help</h2>
      <div className={styles.sectionBody}>
        <Hidden smDown>
          <img
            className={styles.iconSectionBody}
            src="/images/account_v3/icons/support_email_icon.svg"
            alt=""
          />
        </Hidden>
        <div>
          <div className={styles.subTitle}>
            <Hidden mdUp>
              <img
                className={styles.iconSectionBody}
                src="/images/account_v3/icons/support_email_icon.svg"
                alt=""
              />
            </Hidden>
            Support Email
          </div>
          <div className={styles.des}>
            If you have any questions, please contact us at any moment via{" "}
            <ButtonMailto
              label="support@AnteDAO.fi"
              mailto="mailto:support@AnteDAO.fi"
            />
            .
          </div>
        </div>
      </div>
      <div className={`${styles.sectionBody} ${styles.sectionBodyQuestions}`}>
        <Hidden smDown>
          <img
            className={styles.iconSectionBody}
            src="/images/account_v3/icons/listquestionIcon.svg"
            alt=""
          />
        </Hidden>
        <div style={{ width: "100%" }}>
          <div className={styles.subTitle}>
            <Hidden mdUp>
              <img
                className={styles.iconSectionBody}
                src="/images/account_v3/icons/listquestionIcon.svg"
                alt=""
              />
            </Hidden>
            Guide & FAQs
          </div>
          <div className={styles.boxQuestions}>
            <div className={styles.nameQuestions}>{Guide.name}</div>
            <ul className={styles.listGuideQuestions}>
              {Guide.childs?.map((child, i) => {
                return (
                  <li key={i} className={styles.itemQuestions}>
                    <a href={child.href} target="_blank" rel="noreferrer">
                      {child.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className={styles.nameQuestions}>{FAQs.name}</div>
            <ul className={styles.listFAQsQuestions}>
              {FAQs.childs?.map((child, i) => {
                return (
                  <li key={i} className={styles.itemQuestions}>
                    <a href={child.href} target="_blank" rel="noreferrer">
                      {child.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withWidth()(NeedHelp);
