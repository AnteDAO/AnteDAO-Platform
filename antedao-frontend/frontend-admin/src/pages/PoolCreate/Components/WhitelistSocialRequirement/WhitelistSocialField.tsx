import React  from 'react';
import useStyles from "../../style";
import { renderErrorCreatePool } from "../../../../utils/validate";

function WhitelistSocialField(props: any) {
  const classes = useStyles();
  const { register, errors, poolDetail, fieldName, placeholder, label } = props;
  const renderError = renderErrorCreatePool;
  // const isDeployed = !!poolDetail?.is_deploy;


  return (
    <>
      <div className={classes.formControl}>
        <label className={classes.formControlLabel} style={{ textTransform: 'capitalize' }}>{label}</label>
        <input
          type="text"
          placeholder={placeholder ? placeholder : ''}
          name={fieldName}
          defaultValue={poolDetail?.socialRequirement?.[fieldName]}
          ref={register({
            // required: true
          })}
          maxLength={255}
          className={classes.formControlInput}
        />
        <p className={classes.formErrorMessage}>
          {
            renderError(errors, fieldName)
          }
        </p>
      </div>
    </>
  );
}

export default WhitelistSocialField;
