import { useEffect, useState } from 'react';
// @ts-ignore
import CurrencyInput from 'react-currency-input-field';
import { between0And100, renderErrorCreatePool } from "../../../../utils/validate";
import useStyles from "../../style";

function ProgressDisplay(props: any) {
  const classes = useStyles();
  const {
    register, setValue, errors,
    poolDetail
  } = props;
  const [progressDisplay, setProgressDisplay] = useState('');
  const renderError = renderErrorCreatePool;

  useEffect(() => {
    if (poolDetail && poolDetail.progress_display) {
      setProgressDisplay(poolDetail.progress_display);
    }
  }, [poolDetail]);

  const handleChange = (value: any, name: any) => {
    setProgressDisplay(value);
    setValue('progress_display', value, { shouldValidate: true })
  };

  return (
    <>
      <div className={classes.formControl}>
        <label className={classes.formControlLabel}>Progress Display (%)</label>
        <p className={classes.formDescription}>This field (if set), this will be display as swap progress if this value is higher than actual swap progress</p>
        <CurrencyInput
          groupSeparator=","
          decimalSeparator="."
          id="progress_display"
          placeholder="Please enter a number"
          value={progressDisplay}
          onValueChange={handleChange}
          className={classes.formControlInput}
          min={0}
        />
        <input
          type='hidden'
          name="progress_display"
          value={progressDisplay || ''}
          ref={register({
            validate: {
              between0And100: between0And100
            }
          })}
        />
        {errors.progress_display &&
          <p className={classes.formErrorMessage}>
            {renderError(errors, 'progress_display')}
          </p>
        }
      </div>
    </>
  );
}

export default ProgressDisplay;
