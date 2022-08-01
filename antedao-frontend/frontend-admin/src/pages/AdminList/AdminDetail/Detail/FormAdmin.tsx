import React from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import useStyles from '../styles';
import { useCommonStyle } from '../../../../styles';
import { createAdmin, updateAdmin } from "../../../../request/admin";
import { alertFailure, alertSuccess } from "../../../../store/actions/alert";
import { useDispatch } from "react-redux";
import { adminRoute } from "../../../../utils";
import { isValidAddress } from '../../../../services/web3';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const renderError = (errors: { [key: string]: any }, field: string) => {
  if (errors[field]) {
    const errorType = errors[field].type;
    switch (errorType) {
      case 'required': {
        return 'This field is required';
      }
      case 'validAddress': {
        return "Invalid Wallet Address.";
      }
      case 'validEmail': {
        return 'Please enter a correct email, example "abc @mail.com"';
      }
      case 'maxLength': {
        return 'Max length is 255'
      }
    };
  }
}


const FormAdmin = (props: any) => {
  const styles = useStyles();
  const commonStyle = useCommonStyle();
  const dispatch = useDispatch();

  const { history, isCreate } = props;
  let { id, username, email, firstname, lastname, wallet_address, is_active } = props.admin;
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      username,
      email,
      firstname,
      lastname,
      wallet_address,
      password: '1',
      is_active
    },
  });

  const onSubmit = (values: any) => {
    if (isCreate) {
      createAdmin(values)
        .then((res) => {
          if (res.status === 200) {
            dispatch(alertSuccess('Create success'));
            history.push(adminRoute('/admins'));
          } else {
            dispatch(alertFailure(res.message || 'Something went wrong'));
          }
        });
    } else {
      updateAdmin(id, values)
        .then((res) => {
          if (res.status === 200) {
            dispatch(alertSuccess('Update success'));
            history.push(adminRoute('/admins'));
          } else {
            dispatch(alertFailure(res.message || 'Something went wrong'));
          }
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.groupInput}>
          <label className={styles.inputLabel}>
            Username  <span className={commonStyle.required}>*</span>
          </label>
          <input
            className={styles.inputG}
            name="username"
            placeholder=""
            ref={register({ required: true, maxLength: 255 })}
          />
          {errors.username && <span className={styles.error}>{renderError(errors, 'username')}</span>}
        </div>
        <div className={styles.groupInput} style={{ display: 'none' }}>
          <label className={styles.inputLabel}>
            Password
            {isCreate && <span className={commonStyle.required}>*</span>}
          </label>
          <input
            className={styles.inputG}
            name="password"
            placeholder=""
            ref={register({})}
          />
          {errors.password && <span className={styles.error}>{renderError(errors, 'password')}</span>}
        </div>
        <div className="clearfix" />
        <div className={styles.groupInput}>
          <label className={styles.inputLabel}>
            Email
            <span className={commonStyle.required}>*</span>
          </label>
          <input
            className={styles.inputG}
            name="email"
            placeholder="Email"
            ref={register({
              required: true,
              maxLength: 255,
              validate: {
                validEmail: (value: any) => EMAIL_REGEX.test(value)
              }
            })}
          />
          {errors.email && <span className={styles.error}>{renderError(errors, 'email')}</span>}
        </div>
        <div className="clearfix" />
        <div className={styles.groupInput}>
          <label className={styles.inputLabel}>
            Wallet address
            <span className={commonStyle.required}>*</span>
          </label>
          <input
            className={styles.inputG}
            name="wallet_address"
            placeholder=""
            ref={register({
              required: true, maxLength: 255,
              validate: {
                validAddress: (value: any) => isValidAddress(value)
              }
            })}
          />
          {errors.wallet_address && <span className={styles.error}>{renderError(errors, 'wallet_address')}</span>}
        </div>
        <div className="clearfix" />
        <div className={styles.groupInput}>
          <label className={styles.inputLabel}>First Name</label>
          <input
            className={styles.inputG}
            name="firstname"
            placeholder=""
            ref={register({ maxLength: 255 })}
          />
          {errors.firstname && <span className={styles.error}>{renderError(errors, 'firstname')}</span>}
        </div>
        <div className="clearfix" />
        <div className={styles.groupInput}>
          <label className={styles.inputLabel}>Last Name</label>
          <input
            className={styles.inputG}
            name="lastname"
            placeholder=""
            ref={register({ maxLength: 255 })}
          />
          {errors.lastname && <span className={styles.error}>{renderError(errors, 'lastname')}</span>}
        </div>
        <div className="clearfix" />
        <div className={styles.listBtn}>
          <Button
            type="submit"
            className={styles.btnSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default withRouter(FormAdmin);
