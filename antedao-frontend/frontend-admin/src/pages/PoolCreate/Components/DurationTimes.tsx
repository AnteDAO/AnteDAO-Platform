import { DatePicker } from "antd";
import moment from "moment";
import { useEffect } from 'react';
import { Controller } from "react-hook-form";
import { DATETIME_FORMAT } from "../../../constants";
import { useCommonStyle } from "../../../styles";
import { campaignClaimConfigFormat } from "../../../utils/campaign";
import { renderErrorCreatePool } from "../../../utils/validate";
import useStyles from "../style";

function DurationTime(props: any) {
  const classes = useStyles();
  const commonStyle = useCommonStyle();
  const {
    setValue, getValues, errors, control, watch,
    poolDetail, needValidate,
  } = props;
  const renderError = renderErrorCreatePool;

  useEffect(() => {
    if (poolDetail) {
      // Join Times
      if (poolDetail.start_join_pool_time) {
        setValue('start_join_pool_time', moment(poolDetail.start_join_pool_time, DATETIME_FORMAT));
      }
      if (poolDetail.end_join_pool_time) {
        setValue('end_join_pool_time', moment(poolDetail.end_join_pool_time, DATETIME_FORMAT));
      }

      // Pre-Order Times
      if (poolDetail.start_pre_order_time) {
        setValue('start_pre_order_time', moment(poolDetail.start_pre_order_time, DATETIME_FORMAT));
      }

      // Min tier Pre-Order
      setValue('pre_order_min_tier', poolDetail.pre_order_min_tier);

      // Swap Times
      if (poolDetail.start_time) {
        setValue('start_time', moment(poolDetail.start_time, DATETIME_FORMAT));
      }
      if (poolDetail.finish_time) {
        setValue('finish_time', moment(poolDetail.finish_time, DATETIME_FORMAT));
      }

      // Release Time
      if (poolDetail.release_time) {
        setValue('release_time', moment(poolDetail.release_time, DATETIME_FORMAT));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetail]);
  const isDeployed = !!poolDetail?.is_deploy;

  // Convert and format campaignClaimConfig table
  const campaignClaimConfigJSON = watch('campaignClaimConfig');
  useEffect(() => {
    if (campaignClaimConfigJSON) {
      try {
        let campaignClaimConfig = campaignClaimConfigFormat(campaignClaimConfigJSON);
        if (campaignClaimConfig && campaignClaimConfig.length > 0) {
          if (campaignClaimConfig[0]?.start_time) {
            setValue('release_time', moment(campaignClaimConfig[0]?.start_time));
          }
        } else {
          setValue('release_time', null);
        }
      } catch (e) {
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignClaimConfigJSON]);

  return (
    <>
      <div className={classes.exchangeRate}>
        <label className={classes.exchangeRateTitle}>Whitelist time</label>
        <div className={classes.formControlFlex}>
          <div className={classes.formControlFlexBlock}>
            <label className={classes.formControlLabel}>Start Whitelist Time</label>
            <div style={{ marginBottom: 25 }}>
              <Controller
                control={control}
                rules={{
                  required: needValidate,
                }}
                name="start_join_pool_time"
                render={(field:any) => {
                  return (
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder=''
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                        format: "HH:mm"
                      }}
                      onSelect={(datetimeSelected: any) => {
                        setValue(field.name, datetimeSelected, { shouldValidate: true });
                      }}
                      minuteStep={15}
                      className={`${commonStyle.DateTimePicker} ${classes.formDatePicker}`}
                      disabled={isDeployed}
                    />
                  )
                }}
              />
            </div>
            <div className={`${classes.formErrorMessage} ${classes.formErrorMessageAbsolute}`}>
              {
                renderError(errors, 'start_join_pool_time')
              }
            </div>
          </div>

          <div className={classes.formControlFlexBlock}>
            <label className={classes.formControlLabel}>End Whitelist Time</label>
            <div style={{ marginBottom: 25 }}>
              <Controller
                control={control}
                rules={{
                  required: needValidate,
                  validate: {
                    greateOrEqualStartJoinPoolTime: (value:any) => {
                      if (!needValidate && !value) return true;
                      const startTime = getValues('start_join_pool_time');
                      const valueUnix = moment(value).unix();
                      const startTimeUnix = moment(startTime).unix();

                      return startTime ? valueUnix > startTimeUnix : true;
                    }
                    // validDate: (value: string) => {
                    //   if (timeTypeMenu === 'start time') {
                    //     if (new Date(value) > new Date(matchedCampaign.closeTime * 1000)) {
                    //       return 'The start time must before finish time.';
                    //     } else if (new Date(value) >= new Date(matchedCampaign.releaseTime * 1000)) {
                    //       return 'The start time must before release time.';
                    //     }
                    //   } else if (timeTypeMenu === 'finish time') {
                    //     if (new Date(value) < new Date(matchedCampaign.startTime * 1000)) {
                    //       return 'The finish time must after start time.';
                    //     } else if (new Date(value) >= new Date(matchedCampaign.releaseTime * 1000)) {
                    //       return 'The finish time must before release time.';
                    //     }
                    //   } else if (timeTypeMenu === 'release time') {
                    //     if (new Date(value) < new Date(matchedCampaign.closeTime * 1000)) {
                    //       return 'The release time must after finish time.';
                    //     } else if (new Date(value) < new Date(matchedCampaign.startTime * 1000)) {
                    //       return 'The release time must after start time.';
                    //     }
                    //   }
                    //
                    //   return true;
                    // }
                  }
                }}
                name="end_join_pool_time"
                render={(field:any) => {
                  return (
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder=''
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                        format: "HH:mm"
                      }}
                      onSelect={(datetimeSelected: any) => {
                        setValue(field.name, datetimeSelected, { shouldValidate: true });
                      }}
                      minuteStep={15}
                      className={`${commonStyle.DateTimePicker} ${classes.formDatePicker}`}
                      disabled={isDeployed}
                    />
                  )
                }}
              />
            </div>
            <div className={`${classes.formErrorMessage} ${classes.formErrorMessageAbsolute}`}>
              {errors.end_join_pool_time?.type === 'greateOrEqualStartJoinPoolTime' ?
                "Start Time must be before End time"
                : renderError(errors, 'end_join_pool_time')
              }
            </div>
          </div>
        </div>
      </div>






      {/* <div className={classes.formControlFlex}>

        <div className={classes.formControlFlexBlock}>
          <label className={classes.formControlLabel}>Min Tier Pre-Order</label>
          <div style={{ marginBottom: 25 }}>
            <Controller
              control={control}
              defaultValue={4}
              name="pre_order_min_tier"
              render={(field) => {
                return (
                  <Select
                    {...field}
                    onChange={(event) => setValue(field.name, event.target.value)}
                    disabled={isDeployed || isBuyTypeFCFS}
                  >
                    {
                      TIERS.map((value, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={index}
                          >
                            {value}
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                )
              }}
            />
          </div>
          <div className={`${classes.formErrorMessage} ${classes.formErrorMessageAbsolute}`}>
            {
              renderError(errors, 'pre_order_min_tier')
            }
          </div>
        </div>

        <div className={classes.formControlFlexBlock}>
          <label className={classes.formControlLabel}>Start Pre-Order Time</label>
          <div style={{marginBottom: 25}}>
            <Controller
              control={control}
              rules={{
                // required: (needValidate && !isBuyTypeFCFS),
                validate: {
                  // greaterOrEqualToday: (value) => {
                  //   if (isDeployed || isBuyTypeFCFS) return true;
                  //   return new Date(value) >= new Date();
                  // },
                }
              }}
              name="start_pre_order_time"
              render={(field) => {
                return (
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{
                      defaultValue: moment("00:00:00", "HH:mm:ss"),
                      format: "HH:mm"
                    }}
                    onSelect={(datetimeSelected: any) => {
                      setValue(field.name, datetimeSelected, {shouldValidate: true});
                    }}
                    minuteStep={15}
                    className={`${commonStyle.DateTimePicker} ${classes.formDatePicker}`}
                    disabled={isDeployed || isBuyTypeFCFS}
                  />
                )
              }}
            />
          </div>
          <div className={`${classes.formErrorMessage} ${classes.formErrorMessageAbsolute}`}>
            {
              renderError(errors, 'start_pre_order_time')
            }
          </div>
        </div>

      </div> */}






      <div className={classes.exchangeRate}>
        <label className={classes.exchangeRateTitle}>Start/End Buy Time</label>
        <div className={classes.formControlFlex}>
          <div className={classes.formControlFlexBlock}>
            <label className={classes.formControlLabel}>Start Buy Time</label>
            <div style={{ marginBottom: 15 }}>
              <Controller
                control={control}
                rules={{
                  required: needValidate,
                  validate: {
                    greateOrEqualWhitelistTime: (value:any) => {
                      if (!needValidate && !value) return true;
                      const endWhitelistTime = getValues('end_join_pool_time');
                      const valueUnix = moment(value).unix();
                      const endWhitelistTimeUnix = moment(endWhitelistTime).unix();

                      return endWhitelistTime ? valueUnix > endWhitelistTimeUnix : true;
                    }
                  }
                }}
                name="start_time"
                render={(field:any) => {
                  return (
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder=''
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                        format: "HH:mm"
                      }}
                      onSelect={(datetimeSelected: any) => {
                        setValue(field.name, datetimeSelected, { shouldValidate: true });
                      }}
                      minuteStep={15}
                      className={`${commonStyle.DateTimePicker} ${classes.formDatePicker}`}
                      disabled={isDeployed}
                    />
                  )
                }}
              />
            </div>
            <div className={`${classes.formErrorMessage} ${classes.formErrorMessageAbsolute}`}>
              {errors.start_time?.type === 'greateOrEqualWhitelistTime' ?
                "Start/End Buy Time must be after Whitelist time"
                : renderError(errors, 'start_time')
              }
            </div>
          </div>
          {/* <img className={classes.formControlIcon} src="/images/icon-line.svg" alt="" /> */}
          <div className={classes.formControlFlexBlock}>
            <label className={classes.formControlLabel}>End Buy Time</label>
            <div style={{ marginBottom: 15 }}>
              <Controller
                control={control}
                rules={{
                  required: needValidate,
                  validate: {
                    greateOrEqualStartTime: (value:any) => {
                      if (!needValidate && !value) return true;
                      const startTime = getValues('start_time');
                      const valueUnix = moment(value).unix();
                      const startTimeUnix = moment(startTime).unix();

                      return startTime ? valueUnix > startTimeUnix : true;
                    }
                  }
                }}
                name="finish_time"
                render={(field:any) => {
                  return (
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder=''
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                        format: "HH:mm"
                      }}
                      onSelect={(datetimeSelected: any) => {
                        setValue(field.name, datetimeSelected, { shouldValidate: true });
                      }}
                      minuteStep={15}
                      className={`${commonStyle.DateTimePicker} ${classes.formDatePicker}`}
                      disabled={isDeployed}
                    />
                  )
                }}
              />
            </div>
            <div className={`${classes.formErrorMessage} ${classes.formErrorMessageAbsolute}`}>
              {renderError(errors, 'finish_time')}
            </div>
          </div>
        </div>
      </div>

      <Controller
        control={control}
        rules={{}}
        name="release_time"
        render={(field:any) => {
          return (
            <input
              type="hidden"
              {...field}
            />
          )
        }}
      />

      {/* 
      <div className={classes.formControl}>
        <label className={classes.formControlLabel}>Claim time</label>
        <div style={{marginBottom: 15}}>
          <Controller
            control={control}
            rules={{
              required: (needValidate && !isPoolTypeSwap),
              validate: {
                greaterOrEqualFinishTime: value => {
                  if (!needValidate) return true;
                  if (isPoolTypeSwap) return true;
                  const startTime = getValues('finish_time');
                  const valueUnix = moment(value).unix();
                  const startTimeUnix = moment(startTime).unix();

                  return startTime ? valueUnix > startTimeUnix : valueUnix > moment().unix();
                }
              }
            }}
            name="release_time"
            render={(field) => {
              return (
                <DatePicker
                  {...field}
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime={{
                    defaultValue: moment("00:00:00", "HH:mm:ss"),
                    format: "HH:mm"
                  }}
                  onSelect={(datetimeSelected: any) => {
                    setValue(field.name, datetimeSelected, {shouldValidate: true});
                  }}
                  minuteStep={15}
                  className={`${commonStyle.DateTimePicker} ${classes.formDatePicker}`}
                  // disabled={isDeployed || isPoolTypeSwap}
                  disabled={true} // Always disable. Fill first record of Claim Configuration to this field
                />
              )
            }}
          />
        </div>
        <div style={{ color: 'blue' }}>
          <p>
            Please config first record of Claim Configuration Table.
          </p>
          <p>
            This field will auto fill from first record of Claim Configuration Table.
          </p>
        </div>
        <div className={`${classes.formErrorMessage} ${classes.formErrorMessageAbsolute}`}>
          {
            renderError(errors, 'release_time')
          }
        </div>
      </div> */}

    </>
  );
}

export default DurationTime;
