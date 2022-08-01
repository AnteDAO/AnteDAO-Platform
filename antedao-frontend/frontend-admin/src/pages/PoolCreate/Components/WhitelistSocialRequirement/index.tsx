import React from 'react';
import WhitelistSocialField from "./WhitelistSocialField";
import useStyles from "../../style";

const socialRequirements = [
  { fieldName: 'self_twitter', label: 'Self Twitter', placeholder: 'Eg: AnteDAO' },
  { fieldName: 'self_channel', label: 'Self Telegram', placeholder: 'Eg: AnteDAO' },
  { fieldName: 'partner_twitter', label: 'Partner Twitter', placeholder: 'Eg: AnteDAO' },
  { fieldName: 'partner_channel', label: 'Partner Telegram', placeholder: 'Eg: AnteDAO' },
]

function WhitelistSocialRequirement(props: any) {
  const classes = useStyles();
  const {
    register, setValue, errors, watch, control,
    poolDetail,
  } = props;

  return (
    <>
      <div><label className={classes.exchangeRateTitle}>Whitelist Social Requirements</label></div>
      {socialRequirements.map(social => {
        return (
          <WhitelistSocialField
            key={social.fieldName}
            fieldName={social.fieldName}
            label={social.label}
            placeholder={social.placeholder}
            poolDetail={poolDetail}
            register={register}
            setValue={setValue}
            errors={errors}
            control={control}
            watch={watch}
          />
        );
      })}
    </>
  );
}

export default WhitelistSocialRequirement;
