import { Grid, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getAccessPoolText } from "../../../utils/campaign";
// import React from "react";
import useStyles from "./style";

const noImg = "/images/landing/diamond2.png";
// const noImg = "/images/no-img.jpg";

const LandingCard = (props: any) => {
  const styles = useStyles();

  const { cardInfo } = props;

  return (
    <Link to={`/buy-token/${cardInfo.id}`}>
      <Grid item className={styles.item} xs={12} md={11}>
        <div className={styles.borderCard}>
          <div className={styles.cardContainer}>
            <div className={styles.borderCardImage}>
              <div className={styles.cardImage}>
                <div className={styles.tag}>
                  <span>{getAccessPoolText(cardInfo)}</span>
                </div>
                <img
                  alt={cardInfo.title}
                  src={cardInfo.banner}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = noImg;
                  }}
                  className={styles.banner}
                />
                <img
                  alt={cardInfo.title}
                  src={cardInfo.token_images}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = noImg;
                  }}
                  className={styles.icon}
                />
              </div>
            </div>
            <Tooltip title={cardInfo.title}>
              <div className={styles.cardTittle}>{cardInfo.title}</div>
            </Tooltip>
            <div className={styles.cardContent}>{cardInfo.description}</div>
          </div>
        </div>
      </Grid>
    </Link>
  );
};

export default LandingCard;
