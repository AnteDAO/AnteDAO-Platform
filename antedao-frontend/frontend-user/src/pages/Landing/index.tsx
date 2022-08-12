/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid } from "@material-ui/core";
import withWidth, { isWidthDown, isWidthUp } from "@material-ui/core/withWidth";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import FormSubmitToSheet from "../../components/FormSubmitToSheet";
import LandingLayout from "../../components/Layout/LandingLayout";
import { SEO_INDEX } from "../../utils/seoConfig";
import BackgroundComponent from "../Dashboard/BackgroundComponent";
import ModalContent from "./ModalContent";
import useStyles from "./style";
import LiveProject from "./LiveProject";
import SliderComponent from "./Upcoming";
import Completed from "./Completed";
import SearchGroup from "../../components/Base/SearchGroup";
import useFetch from "../../hooks/useFetch";
// import Slider from "react-slick";

type PoolData = {
  data: [];
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
};
const Dashboard = (props: any) => {
  const styles = useStyles();
  const [showModal, setShowModal] = useState(false);

  const [upcomingPoolsV3Display, setUpcomingPoolsV3Display] = useState<
    Array<any>
  >([]);

  const { data: upcomingPoolsV3, loading: loadingUpcomingPoolV3 } =
    useFetch<PoolData>(`/pools/v3/upcoming-pools?is_private=0&page=1&limit=8`);

  // const currentTime = Math.floor(new Date().getTime()/1000.0)

  const setStatusPools = async (pools: Array<any>) => {
    await Promise.all(
      pools.map(async (pool: any) => {
        pool.status = pool.campaign_status;
      })
    );
  };
  // upcoming pool
  useEffect(() => {
    if (!upcomingPoolsV3 || !loadingUpcomingPoolV3) return;
    if (upcomingPoolsV3?.data && upcomingPoolsV3.data.length) {
      let pools = upcomingPoolsV3.data;
      setStatusPools(pools).then(() => {
        setUpcomingPoolsV3Display(
          pools.filter((p: any) => p?.is_private === 3)
        );
        setUpcomingPoolsV3Display(
          pools.filter((p: any) => p?.is_private !== 3)
        );
      });
    }
  }, [loadingUpcomingPoolV3, upcomingPoolsV3]);

  useEffect(() => {
    if (!lasquareNFT || !loadingLasquareNFT) return;
    if (lasquareNFT && lasquareNFT.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let pools = lasquareNFT;
    }
  }, [lasquareNFT, loadingLasquareNFT]);

  return (
    <LandingLayout isTransparentHeader>
      <Helmet>
        <title>{SEO_INDEX.TITLE}</title>
        <meta name="description" content={SEO_INDEX.DES} />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta item-prop="name" content={SEO_INDEX.GOOGLE_META_NAME} />
        <meta item-prop="description" content={SEO_INDEX.GOOGLE_META_DES} />
        <meta item-prop="image" content={SEO_INDEX.GOOGLE_META_IMAGE} />
      </Helmet>
      <BackgroundComponent />
      <div className={styles.space}>
        <LiveProject />
        {upcomingPoolsV3Display && upcomingPoolsV3Display.length > 0 && (
          <>
            <div className={styles.upcoming}>
              <div className="container">
                <SliderComponent
                  cardsInfo={upcomingPoolsV3Display}
                  title={"Upcoming Projects"}
                />
              </div>
            </div>
          </>
        )}

        <div className={styles.cardContainer3}>
          {isWidthUp("sm", props.width) && (
            <>
              <div className="title_wrap">
                <div style={{ marginBottom: "58px" }} className="title">
                  Completed Sales
                </div>
                <SearchGroup></SearchGroup>
              </div>
              <Completed />
            </>
          )}
          {isWidthDown("sm", props.width) && (
            <>
              <div>
                <div className="title">Completed Sales</div>
                <SearchGroup customClass="search"></SearchGroup>
              </div>
              <Completed />
            </>
          )}
        </div>
        <div className={styles.card4Border}>
          <div className={styles.cardContainer4}>
            <div className={styles.info}>
              {isWidthUp("sm", props.width) && (
                <div className="slogan">
                  {" "}
                  Want to launch your project <br /> on <b>AnteDAO</b>
                </div>
              )}
              {isWidthDown("sm", props.width) && (
                <div>
                  <div className="slogan">
                    {" "}
                    Want to launch your project <br /> on <b>AnteDAO</b>
                  </div>
                </div>
              )}
              <FormSubmitToSheet />
            </div>
          </div>
        </div>
        {showModal && <ModalContent setShowModal={setShowModal} />}
      </div>
    </LandingLayout>
  );
};

export default withWidth()(withRouter(Dashboard));
