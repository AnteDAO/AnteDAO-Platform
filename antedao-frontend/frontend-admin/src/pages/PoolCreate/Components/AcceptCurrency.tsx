import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useEffect } from 'react';
import { Controller } from "react-hook-form";
import { getTiers } from "../../../request/tier";
import { renderErrorCreatePool } from "../../../utils/validate";
import useStyles from "../style";

function AcceptCurrency(props: any) {
  const classes = useStyles();
  const {
    setValue, errors, control,
    poolDetail
  } = props;
  const renderError = renderErrorCreatePool;

  useEffect(() => {
    if (poolDetail && poolDetail.accept_currency) {
      setValue('acceptCurrency', poolDetail.accept_currency);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetail]);

  useEffect(() => {
    if (poolDetail && poolDetail.id) {
      getTiers(poolDetail.id)
        .then((res) => {
        });
    }
  }, [poolDetail]);

  const isDeployed = !!poolDetail?.is_deploy;
  // const networkAvailable = watch('networkAvailable')
  // let nativeTokenLabel = 'ETH'
  // let usdtTokenLabel = 'USDT'
  // switch (networkAvailable) {
  //   case NETWORK_AVAILABLE.BSC:
  //     nativeTokenLabel = 'BNB'
  //     usdtTokenLabel = 'BUSD'
  //     break
  //   case NETWORK_AVAILABLE.POLYGON:
  //     nativeTokenLabel = 'MATIC'
  //     usdtTokenLabel = 'USDT'
  //     break
  //   default:
  //     // default is init value above
  // }

  // console.log('userCurrentNetwork', isBscNetworks);

  return (
    <>
      <div className={classes.formControl}>
        <FormControl component="fieldset">
          <label className={classes.formControlLabel}>Accept Currency</label>

          <Controller
            rules={{ required: true }}
            control={control}
            defaultValue="usdt"
            name="acceptCurrency"
            as={
              <RadioGroup row>
                <FormControlLabel
                  value="ante" control={<Radio />}
                  label={"ANTE"}
                  disabled={isDeployed}
                />
                <FormControlLabel
                value="usdt" control={<Radio />}
                label={"USDT"}
                disabled={isDeployed}
              />
                <FormControlLabel
                  value="usdc" control={<Radio />}
                  label="USDC"
                  disabled={isDeployed}
                />
                <FormControlLabel
                  value="busd" control={<Radio />}
                  label={"BUSD"}
                  disabled={isDeployed}
                />
              </RadioGroup>
            }
          />
          {errors.acceptCurrency &&
            <p className={classes.formErrorMessage}>
              {renderError(errors, 'acceptCurrency')}
            </p>
          }
        </FormControl>
      </div>
    </>
  );
}

export default AcceptCurrency;
