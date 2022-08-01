import { useEffect } from 'react';
import { Collapse, Switch } from "antd";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { renderErrorCreatePool } from "../../../../utils/validate";
import FormControl from "@material-ui/core/FormControl";
import useStyles from "../../style";
import { changePublicWinnerStatus } from "../../../../request/pool";
import { alertSuccess } from "../../../../store/actions/alert";

const { Panel } = Collapse;

function callback(key: any) {
}

function PublicWinnerSetting(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const renderError = renderErrorCreatePool;

  const {
    setValue, errors, control,
    poolDetail,
  } = props;

  useEffect(() => {
    if (poolDetail) {
      setValue('public_winner_status', !!poolDetail.public_winner_status);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetail]);

  const changeDisplay = async (value: any) => {
    const res = await changePublicWinnerStatus({
      pool_id: poolDetail.id,
      public_winner_status: value,
    });
    if (res.status === 200) {
      dispatch(alertSuccess('Change Public Winner Setting successful!'));
    }
    return value;
  };

  return (
    <>
      <div style={{ marginBottom: 30 }}>
        <Collapse onChange={callback}>
          <Panel header="Public Winner Settings" key="1">
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <>
                  <FormControl component="fieldset">
                    <Controller
                      control={control}
                      name="public_winner_status"
                      render={(field:any) => {
                        const { value, onChange } = field;
                        return (
                          <div className={classes.formControlFlex}>
                            <Switch
                              onChange={async (switchValue) => {
                                // eslint-disable-next-line no-restricted-globals
                                if (confirm('Do you want change this setting ?')) {
                                  await onChange(switchValue);
                                  await changeDisplay(switchValue);
                                }
                                else {
                                  await onChange(!switchValue);
                                }
                              }}
                              defaultChecked={!!poolDetail?.public_winner_status}
                              checked={value}
                              checkedChildren="Public"
                              unCheckedChildren="Hidden"
                            />
                            <div style={{ marginLeft: 10 }}><label className={classes.formControlLabel}>Public Winner</label></div>
                          </div>
                        )
                      }}
                    />
                    {errors.public_winner_status &&
                      <p className={classes.formErrorMessage}>
                        {renderError(errors, 'public_winner_status')}
                      </p>
                    }
                  </FormControl>
                  <br />
                </>
              </Grid>
            </Grid>
          </Panel>
        </Collapse>
      </div>
    </>
  );
}
export default withRouter(PublicWinnerSetting);
