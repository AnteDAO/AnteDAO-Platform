import { FC, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Hidden } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { convertTimeToStringFormat, unixTimeNow } from "../../../utils/convertDate";
import useStyles from "./styles";
import { showTotalRaisePrice } from "../../../utils/campaign";

type Props = {
  poolDetails: any;
};

const headers = ["Tier", "Allocation"];

const BuyTokenPoolDetails: FC<Props> = ({ poolDetails }) => {
  const styles = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [isUseAllocationPercent, setIsUseAllocationPercent] = useState(1)
  const startBuyTimeInDate = poolDetails?.startBuyTime
    ? new Date(Number(poolDetails?.startBuyTime) * 1000)
    : undefined;
  const releaseTimeInDate = poolDetails?.releaseTime
    ? new Date(Number(poolDetails?.releaseTime) * 1000)
    : undefined;
  const minTier = poolDetails?.minTier || 0;
  const handleClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    poolDetails &&  poolDetails.tiersWithDetails.some((tier: any) => {
      if (tier.percent !== 0) {
        setIsUseAllocationPercent(1)
        if (tier.percent === undefined || tier.multiple === null) {
          setIsUseAllocationPercent(-1)
        }
        return true
      }
      else if (tier.multiple !== 0) {
        setIsUseAllocationPercent(0)
        if (tier.multiple === undefined || tier.multiple === null) {
          setIsUseAllocationPercent(-1)
        }
        return true
      }
      return false
    })
  }, [poolDetails])

  return (
    <section className={styles.sectionBuyTokenPoolDetails}>
      <div className={styles.midSection}>
        <ul className={styles.listContent}>
          <li className={styles.itemListContent}>
            <span className={styles.nameItemListContent}>Token Swap Time</span>
            <span>
              {startBuyTimeInDate
                ? convertTimeToStringFormat(startBuyTimeInDate)
                : "TBA"}
            </span>
          </li>
          <li className={styles.itemListContent}>
            <span className={styles.nameItemListContent}>Type</span>
            <span style={{ textTransform: "capitalize" }}>
              {poolDetails?.type}
            </span>
          </li>
          {poolDetails?.website && (
            <li className={styles.itemListContent}>
              <span className={styles.nameItemListContent}>Website</span>
              <a
                target="_blank"
                href={poolDetails?.website ?? ""}
                rel="noreferrer"
              >
                <span>{poolDetails?.website ?? "TBA"}</span>
                {poolDetails?.website && (
                  <img
                    className={styles.iconBrank}
                    src="/images/icon_brank.svg"
                    alt=""
                  />
                )}
              </a>
            </li>
          )}
          <li className={styles.itemListContent}>
            <span className={styles.nameItemListContent}>Token Claim Time</span>
            <span>
              {releaseTimeInDate
                ? convertTimeToStringFormat(releaseTimeInDate)
                : "TBA"}{" "}
            </span>
          </li>
        </ul>
        <ul className={styles.listContent}>
          {
            poolDetails?.endJoinTime < unixTimeNow() && (
              <li className={styles.itemListContent}>
                <span className={styles.nameItemListContent}>Allocation by Tiers</span>
                <span
                  className={styles.btnOpenModal}
                  onClick={() => setOpenModal(true)}
                >Click here to see details</span>
              </li>
            )
          }

          <li className={styles.itemListContent}>
            <span className={styles.nameItemListContent}>Total Raise</span>
            <span>
              {showTotalRaisePrice(poolDetails)}
            </span>
          </li>
          <li className={styles.itemListContent}>
            <span className={styles.nameItemListContent}>Lock Schedule</span>
            {poolDetails?.lockSchedule ?
              <a
                className={styles.btnOpenModal}
                target="_blank"
                href={poolDetails?.lockSchedule}
                style={{ color: "#FD849C" }}
                rel="noreferrer"
              >View token release schedule</a>
              : "TBA"}
          </li>
          <li className={styles.itemListContent}>
            <span className={styles.nameItemListContent}>Social</span>
            <div className={styles.rightTopSection}>
              <a
                target="_blank"
                href={poolDetails?.socialNetworkSetting?.telegram_link}
                className={styles.itemSocsial}
                rel="noreferrer"
              >
                <img src="/images/socsials/instagram.svg" alt="" />
              </a>
              <a
                target="_blank"
                href={poolDetails?.socialNetworkSetting?.twitter_link}
                className={styles.itemSocsial}
                rel="noreferrer"
              >
                <img src="/images/socsials/twitter.svg" alt="" />
              </a>
              <a
                target="_blank"
                href={poolDetails?.socialNetworkSetting?.medium_link}
                className={styles.itemSocsial}
                rel="noreferrer"
              >
                <img src="/images/socsials/m.svg" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>

      {poolDetails?.description && (
        <>
          <div className={styles.titleBot}>Project Information</div>
          <div className={styles.botSection}>{poolDetails?.description}</div>
        </>
      )}

      <Dialog
        open={openModal}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={styles.modalTiers}
      >
        <div className={styles.modalContentTiers}>
          <DialogTitle className={styles.headerModal}>
          Allocation by Tiers
            <img
              src="/images/icons/close.svg"
              alt=""
              className={styles.btnCloseModal}
              onClick={handleClose}
            />
          </DialogTitle>
          <DialogContent className={styles.contentModal}>
            <Hidden mdUp>
              {poolDetails?.tiersWithDetails?.length > 0 &&
                poolDetails?.tiersWithDetails?.map(
                  (row: any, index: number) => {
                    if (index < minTier) {
                      return null;
                    }
                    return (
                      <div className={styles.boxTierMobile} key={index}>
                        <div className={styles.itemTierMobile}>
                          <div className={styles.nameItemTierMobile}>
                          Tier
                          </div>
                          <div className={styles.valueItemTierMobile}>
                          {row.name}
                          </div>
                        </div>

                        <div className={styles.itemTierMobile}>
                          <div className={styles.nameItemTierMobile}>
                          Allocation
                          </div>
                          <div className={styles.valueItemTierMobile}>
                              {
                                isUseAllocationPercent === 1 ? `${row.percent}%` : isUseAllocationPercent === 0 ? `${row.multiple}x` : 0
                              }
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </Hidden>

            <Hidden smDown>
              <TableContainer
                component={Paper}
                className={styles.tableContainer}
              >
                <Table className={styles.table} aria-label="simple table">
                  <TableHead className={styles.tableHeaderWrapper}>
                    <TableRow>
                      {headers.map((header, index: number) => (
                        <TableCell key={index} className={styles.tableHeader}>
                          <span>{header}</span>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody className={styles.tableBodyWrapper}>
                    {poolDetails?.tiersWithDetails?.length > 0 &&
                      poolDetails?.tiersWithDetails?.map(
                        (row: any, index: number) => {
                          if (index < minTier) {
                            return null;
                          }
                          return (
                            <TableRow key={index}>
                              <TableCell component="th" align="center" scope="row" className="valueItemTierWeb">
                                {row.name}
                              </TableCell>
                              <TableCell component="th" scope="row" align="center" className="valueItemTierWeb">
                                {
                                  isUseAllocationPercent === 1 ? `${row.percent}%` : isUseAllocationPercent === 0 ? `${row.multiple}x` : 0
                                }
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Hidden>
          </DialogContent>
        </div>
      </Dialog>
    </section>
  );
};

export default BuyTokenPoolDetails;
