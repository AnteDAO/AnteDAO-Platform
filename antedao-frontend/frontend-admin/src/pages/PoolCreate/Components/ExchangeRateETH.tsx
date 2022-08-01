import { Tooltip, Typography } from "@material-ui/core";
import { useEffect, useState } from 'react';
import CurrencyInput from "react-currency-input-field";
import { getIconCurrencyUsdt } from "../../../utils/usdt";
import { fieldMustBeGreaterThanZero, renderErrorCreatePool } from '../../../utils/validate';
import useStyles from "../style";

function ExchangeRateETH(props: any) {
  const classes = useStyles();
  const { register, setValue, errors, watch, poolDetail, token } = props;
  const [rateValue, setRateValue] = useState('');

  useEffect(() => {
    if (poolDetail && poolDetail.token_conversion_rate) {
      setRateValue(poolDetail.token_conversion_rate);
    }
  }, [poolDetail]);

  const isDeployed = !!poolDetail?.is_deploy;
  const purchasableCurrency = watch('acceptCurrency');
  const networkAvailable = watch('networkAvailable');
  let { currencyName } = getIconCurrencyUsdt({ purchasableCurrency, networkAvailable });

  return (
    <>
      <Typography className={classes.exchangeRateTitle}>Exchange Rates</Typography>
      <div className={classes.formControlFlex}>
        <div className={classes.formControlFlexBlock}>
          <label className={`${classes.formControlLabel} ${classes.formControlBlurLabel}`}>You have</label>
          <div className={classes.formControlRate}>
            <input
              type="number"
              name="ethFor"
              disabled={true}
              value={1}
              className={`${classes.formInputBox} ${classes.formInputBoxEther}`}
            />
            <button className={classes.box}>{token?.symbol || ""}</button>
          </div>
        </div>
        <div>
          <img className={classes.formControlIconExchange} src="/images/icon-exchange.svg" alt="" />
        </div>
        <div className={classes.formControlFlexBlock}>
          <label className={`${classes.formControlLabel} ${classes.formControlBlurLabel}`}>You get*</label>
          <div className={classes.formControlRate}>
            <CurrencyInput
              value={rateValue}
              decimalsLimit={4}
              groupSeparator=","
              decimalSeparator="."
              maxLength={25}
              onValueChange={(value: any) => {
                setRateValue(value);
                setValue('tokenRate', value, { shouldValidate: true })
              }}
              className={`${classes.formInputBox} ${classes.formInputBoxBS}`}
              disabled={isDeployed}
            />
            <input
              type='hidden'
              name={'tokenRate'}
              value={rateValue}
              ref={register({
                required: true,
                validate: {
                  greaterThanZero: fieldMustBeGreaterThanZero,
                }
              })}
              disabled={isDeployed}
            />
            <Tooltip title={currencyName}>
              <button className={`${classes.box} ${classes.boxEther}`}>
                {currencyName}
              </button>
            </Tooltip>
          </div>
          {errors.tokenRate &&
            <div className={`${classes.formErrorMessage} ${classes.formErrorMessageAbsolute}`}>
              {renderErrorCreatePool(errors, 'tokenRate')}
            </div>
          }
        </div>

      </div>

    </>
  );
}

export default ExchangeRateETH;
