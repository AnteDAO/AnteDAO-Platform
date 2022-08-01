import React, { useEffect } from 'react';
import useStyles from "../style";
import FormControl from '@material-ui/core/FormControl';
import { Controller } from "react-hook-form";
import { MenuItem, Select, Typography } from "@material-ui/core";
import { renderErrorCreatePool } from "../../../utils/validate";
import { TIERS } from "../../../constants";

function MinTier(props: any) {
  const classes = useStyles();
  const {
    setValue, errors, control,
    poolDetail
  } = props;
  const renderError = renderErrorCreatePool;

  useEffect(() => {
    if (poolDetail && !isNaN(poolDetail.min_tier)) {
      setValue('minTier', poolDetail.min_tier);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetail]);
  const isDeployed = !!poolDetail?.is_deploy;

  return (
    <>
      <Typography className={classes.exchangeRateTitle}>Tier &amp; Max Token Buy</Typography>
      <FormControl component="fieldset">
        <div className={classes.formControlFlex}>
          <label className={classes.formControlLabel} htmlFor="minTier">Min Tier</label>
          <Controller
            rules={{ required: true }}
            control={control}
            defaultValue={7}
            name="minTier"
            as={
              <Select
                labelId="minTier"
                id="minTier"
                name="minTier"
                // onChange={handleChange}
                disabled={isDeployed}
                style={{ marginLeft: 20, marginTop: 0 }}

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
            }
          />
        </div>
        {errors.minTier &&
          <p className={classes.formErrorMessage}>
            {renderError(errors, 'minTier')}
          </p>
        }
      </FormControl>
      <br />
    </>
  );
}

export default MinTier;
