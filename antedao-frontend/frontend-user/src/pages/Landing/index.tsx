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
import _ from "lodash";
// import Slider from "react-slick";

const urlApi = process.env.REACT_APP_API_LASQUARE;
const url = process.env.REACT_APP_LASQUARE_DEEP_LINK;
const urlView = process.env.REACT_APP_LASQUARE_VIEW_MORE_LINK;
const urlDetail = process.env.REACT_APP_LASQUARE_POOL_DETAIL_LINK;

type NFTData = [];
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

  const { data: lasquareNFT, loading: loadingLasquareNFT } = useFetch<NFTData>(
    `${urlApi}v1/nfts?limit=6&sort=RECENT`
  );
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
        <div className={styles.lasquare}>
          <div className="lasquare_info">
            <p className="title">Lasquare</p>
            <p className="description">
              The NFT Marketplace aims to provide a platform for users to trade
              their digital creations as NFTs (non-fungible token), allowing a
              safe and secure environment for creators to generate funding for
              their projects, as well as collectors to purchase and collect
              digital assets.
            </p>
          </div>

          <div>
            {/* <Grid container spacing={3}> */}
            {lasquareNFT && lasquareNFT.length > 0 && (
              <Grid container className="center_align">
                <Grid
                  container
                  item
                  xs={12}
                  md={6}
                  spacing={3}
                  className="left"
                >
                  {_.take(lasquareNFT, 3).map((pool: any, index) => {
                    return (
                      <Grid item xs={6} key={index}>
                        <div className="item_lasquare">
                          <a
                            href={`${urlDetail}${pool.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={`${url}${pool.largeImage}`} alt="" />
                          </a>

                          <p className="name">{pool.name}</p>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  md={6}
                  spacing={3}
                  className="right"
                >
                  {_.takeRight(lasquareNFT, 3).map((pool: any, index) => {
                    return (
                      <Grid item xs={6} key={index}>
                        <div className="item_lasquare">
                          <a
                            href={`${urlDetail}${pool.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={`${url}${pool.largeImage}`} alt="" />
                          </a>
                          <p className="name">{pool.name}</p>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            )}
          </div>
          <div className="view_more">
            <a
              href={urlView}
              className="btn btn-view"
              target="_blank"
              rel="noreferrer"
            >
              View more
            </a>
          </div>
        </div>
        {showModal && <ModalContent setShowModal={setShowModal} />}
      </div>
    </LandingLayout>
  );
};

export default withWidth()(withRouter(Dashboard));
