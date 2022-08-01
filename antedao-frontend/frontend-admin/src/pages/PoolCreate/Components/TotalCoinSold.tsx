import FormControl from '@material-ui/core/FormControl';
import { useEffect, useState } from 'react';
import useStyles from "../style";
// @ts-ignore
import CurrencyInput from 'react-currency-input-field';
import { fieldMustBeGreaterThanZero, renderErrorCreatePool } from "../../../utils/validate";

function TotalCoinSold(props: any) {
  const classes = useStyles();
  const {
    register, setValue, errors,
    poolDetail
  } = props;
  const [totalSoldCoin, setTotalSoldCoin] = useState('');
  const renderError = renderErrorCreatePool;

  useEffect(() => {
    if (poolDetail && poolDetail.total_sold_coin) {
      setTotalSoldCoin(poolDetail.total_sold_coin);
    }
  }, [poolDetail]);

  const handleChange = (value: any, name: any) => {
    setTotalSoldCoin(value);
    setValue('totalSoldCoin', value, { shouldValidate: true })
  };

  return (
    <>
      <FormControl component="fieldset" className={classes.formControl} style={{ width: '100%' }}>

        <label className={classes.formControlLabel}>Total Sold Coin</label>
        <CurrencyInput
          id="totalSoldCoin"
          placeholder="Please enter a number"
          value={totalSoldCoin}
          decimalsLimit={8}
          groupSeparator=","
          decimalSeparator="."
          onValueChange={handleChange}
          className={classes.formControlInput}
        // disabled={isDeployed}
        />
        <input
          type='hidden'
          name="totalSoldCoin"
          value={totalSoldCoin || ''}
          ref={register({
            required: true,
            validate: {
              totalSoldCoinGreaterThanZero: fieldMustBeGreaterThanZero
            }
          })}
        />
        {errors.totalSoldCoin &&
          <p className={classes.formErrorMessage}>
            {renderError(errors, 'totalSoldCoin')}
          </p>
        }
        {errors.totalSoldCoinGreaterThanZero &&
          <p className={classes.formErrorMessage}>
            {renderError(errors, 'totalSoldCoinGreaterThanZero')}
          </p>
        }
      </FormControl>
    </>
  );
}

export default TotalCoinSold;
