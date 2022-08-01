import React, { useEffect } from 'react';
import useStyles from "../style";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from "react-hook-form";
import { renderErrorCreatePool } from "../../../utils/validate";
import {
  BSC_NETWORK_ACCEPT_CHAINS,
  ETH_NETWORK_ACCEPT_CHAINS,
  POLYGON_NETWORK_ACCEPT_CHAINS,
  NETWORK_AVAILABLE
} from "../../../constants";
import { useSelector } from "react-redux";

function NetworkAvailable(props: any) {
  const classes = useStyles();
  const {
    setValue, errors, control,
    poolDetail, needValidate,
  } = props;
  const renderError = renderErrorCreatePool;
  const { currentNetworkId } = useSelector((state: any) => state).userCurrentNetwork;

  useEffect(() => {
    if (poolDetail && poolDetail.network_available) {
      setValue('networkAvailable', poolDetail.network_available);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetail]);
  const isDeployed = !!poolDetail?.is_deploy;

  return (
    <>
      <div className={classes.formControl}>
        <FormControl component="fieldset">
          <label className={classes.formControlLabel}>Network Available</label>

          <Controller
            rules={{
              required: true,
              validate: {
                networkNotMatch: (value:any) => {
                  // Validate Only click Deploy button
                  if (!needValidate) return true;
                  let acceptNet = '';
                  switch (value) {
                    case 'bsc':
                      acceptNet = BSC_NETWORK_ACCEPT_CHAINS[currentNetworkId]
                      break
                    case 'polygon':
                      acceptNet = POLYGON_NETWORK_ACCEPT_CHAINS[currentNetworkId]
                      break
                    default:
                      acceptNet = ETH_NETWORK_ACCEPT_CHAINS[currentNetworkId]
                  }
                  if (!acceptNet) {
                    console.log('Network Deploy not match!!!');
                    return false;
                  }
                  return true;
                }
              }
            }}
            control={control}
            defaultValue={NETWORK_AVAILABLE.ETH}
            name="networkAvailable"
            as={
              <RadioGroup row>
                <FormControlLabel
                  value={NETWORK_AVAILABLE.POLYGON} control={<Radio />}
                  label="POLYGON"
                  disabled={isDeployed}
                />
                <FormControlLabel
                  value={NETWORK_AVAILABLE.ETH} control={<Radio />}
                  label="Ethereum"
                  disabled={isDeployed}
                />
                <FormControlLabel
                  value={NETWORK_AVAILABLE.BSC} control={<Radio />}
                  label="BSC"
                  disabled={isDeployed}
                />
              </RadioGroup>
            }
          />
          {(errors.networkAvailable || errors.networkNotMatch) &&
            <p className={classes.formErrorMessage}>
              {renderError(errors, 'networkAvailable')}
              {renderError(errors, 'networkNotMatch')}
            </p>
          }
        </FormControl>
      </div>
    </>
  );
}

export default NetworkAvailable;
