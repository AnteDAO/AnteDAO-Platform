import React, { useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
// import useFetch from "../../../hooks/useFetch";
import useStyles from "./style";
import { Grid, Tooltip } from "@material-ui/core";
import CountDownCounter from "../../ComingSoon/CountDownCounter";
import moment from "moment";
import Slider from "react-slick";
import useFetch from "../../../hooks/useFetch";
import { unixTimeNow } from "../../../utils/convertDate";
import { Link } from "react-router-dom";
import { getAccessPoolText } from "../../../utils/campaign";

const EthereumIcon = "/images/ethereum.svg";
const BSCIcon = "/images/bsc.svg";
const PolygonIcon = "/images/polygon-matic.svg";

type PoolData = {
  data: [];
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
};

const LiveProject: React.FC<any> = (props: any) => {
  const styles = useStyles();
  const countdown = props.countdown;
  const countDownUnix = moment(countdown || new Date()).unix();

  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} />;
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} />;
  }
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useState<Array<any>>([]);
  const [activePoolsV3Display, setActivePoolsV3Display] = useState<Array<any>>(
    []
  );

  const { data: activePoolsV3, loading: loadingActivePoolsV3 } =
    useFetch<PoolData>(`/pools/v3/active-pools?is_private=1&page=1&limit=8`);

  const setStatusPools = async (pools: Array<any>) => {
    await Promise.all(
      pools.map(async (pool: any) => {
        pool.status = pool.campaign_status;
      })
    );
  };
  useEffect(() => {
    if (!activePoolsV3 || !loadingActivePoolsV3) return;
    if (activePoolsV3?.data && activePoolsV3.data.length) {
      let pools = activePoolsV3.data;
      setStatusPools(pools).then(() => {
        setActivePoolsV3Display(pools);
      });
    }
  }, [activePoolsV3, loadingActivePoolsV3]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = unixTimeNow();
      if (!now && now >= countDownUnix) {
        window.location.reload();
      }
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {activePoolsV3Display && activePoolsV3Display.length > 0 && (
        <div className={styles.liveProject}>
          <div className={styles.container}>
            <div className="title">Live Projects</div>
            <div className="container">
              <div className="active_pools">
                <Slider {...settings}>
                  {activePoolsV3Display.map((pool: any, _index) => {
                    return (
                      <div key={pool.id} className="p-10">
                        <Grid container spacing={4} className="content">
                          <Grid item xs={12} md={7}>
                            <div className={styles.info}>
                              <Link to={`/buy-token/${pool.id}`}>
                                <img
                                  src={pool.banner}
                                  alt=""
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "/images/no-img.jpg";
                                  }}
                                />
                              </Link>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={5} className="project_info">
                            <div>
                              <Tooltip
                                classes={{ tooltip: styles.tooltip }}
                                title={pool.title}
                                arrow
                                placement="top"
                              >
                                <p className="title-project">{pool.title}</p>
                              </Tooltip>

                              <div>
                                <Grid container spacing={2} className="content">
                                  <Grid item>
                                    {(() => {
                                      switch (pool?.network_available) {
                                        case "bsc":
                                          return (
                                            <img
                                              src={BSCIcon}
                                              alt=""
                                              className="chain-ico"
                                            />
                                          );
                                        case "polygon":
                                          return (
                                            <img
                                              src={PolygonIcon}
                                              alt=""
                                              className="chain-ico"
                                            />
                                          );
                                        case "eth":
                                        default:
                                          return (
                                            <img
                                              src={EthereumIcon}
                                              alt=""
                                              className="chain-ico"
                                            />
                                          );
                                      }
                                    })()}
                                  </Grid>
                                  <Grid item xs={7} md={8}>
                                    <p className="project-type">
                                      {pool.campaign_status}
                                    </p>
                                    <p className="project-name">
                                      {pool.symbol}
                                    </p>
                                  </Grid>
                                  <Grid
                                    item xs={2}
                                    className={styles.tag}
                                  >
                                    <span>{getAccessPoolText(pool)}</span>
                                  </Grid>
                                </Grid>
                                <div className={styles.countdown}>
                                  <p>Token Swap ends in</p>
                                  <CountDownCounter
                                    customClass={styles.timer_item}
                                    customItem={styles.timer_number}
                                    childItem={`${styles.timer_text} text`}
                                    border={styles.border}
                                    countdown={pool.finish_time * 1000}
                                    campaignDetail={pool}
                                  />
                                </div>

                                <p>
                                  <Link
                                    to={`/buy-token/${pool.id}`}
                                    className="btn btn-join"
                                  >
                                    Join Sale
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withWidth()(LiveProject);
