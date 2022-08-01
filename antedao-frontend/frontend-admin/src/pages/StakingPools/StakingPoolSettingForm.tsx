import { TableCell, TableRow } from '@material-ui/core';
import { Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import useStyles from './style';


const StakingPoolSettingForm: React.FC<any> = (props: any) => {
  const { checkNetWork, checkOwner } = props
  const classes = useStyles();
  const [minStake, setMinStake] = useState(100);
  const [, setEarnReward] = useState(false);
  const [unStakeFee, setUnStakeFee] = useState(0);

  useEffect(() => {
    setMinStake(props.pool.minStake)
    setEarnReward(props.pool.earnReward)
    setUnStakeFee(props.pool.unStakeFee)
  }, [props.pool])

  return (
    <>
      <TableRow>
        <TableCell className={classes.tableHeader}>
          {props.pool.lockDuration / 3600 / 24} days
        </TableCell>

        <TableCell align='center'>
          <div className={classes.flexInput} style={{justifyContent:'center'}}>
            <CurrencyInput
              disabled={checkNetWork || checkOwner}
              allowNegativeValue={false}
              decimalsLimit={8}
              groupSeparator=","
              decimalSeparator="."
              value={props.pool.minStakeChange}
              className={classes.inputTable}
              onValueChange={(e: any) => {
                if(Number(e) === undefined){
                  props.handleChange(props.index, 'minStakeChange', e);
                }
                else {
                  props.handleChange(props.index, 'minStakeChange', e)
                } 
                setMinStake(e)
                }
              } 
              />
            <div className={classes.token}>ANTE</div>
          </div>
            { minStake === undefined  ? <span className={classes.textMessage}>Input cannot be empty</span> : ''}
        </TableCell>

        <TableCell align='center'>
          <div className={classes.flexInput} style={{justifyContent:'center'}}>
            <CurrencyInput
              disabled={checkNetWork || checkOwner}
              allowNegativeValue={false}
              decimalsLimit={2}
              groupSeparator=","
              decimalSeparator="."
              value={props.pool.unStakeFeeChange}
              className={classes.inputTable}
              onValueChange={(e: any) => { 
                if(Number(e) <= 90){
                  props.handleChange(props.index, 'unStakeFeeChange', e)
                }
                else {
                    props.handleChange(props.index, 'unStakeFeeChange', e)
                  }
                setUnStakeFee(e)
              }}
              />
            <div className={classes.token}>%</div>
          </div>
          { unStakeFee < 1 || unStakeFee > 90 || unStakeFee === undefined  ? <span className={classes.textMessage}>Early unstake fee from 1% - 90%</span>: ''}
        </TableCell>

        <TableCell className={classes.swicthButton}>
          {checkNetWork || checkOwner ? (
            <Switch
              disabled={true}
              checked={props.pool.earnRewardChange}
            />
          ) : (
            <Switch
              checked={checkNetWork || checkOwner ? false : props.pool.earnRewardChange}
              onClick={(e) => props.handleChange(props.index, 'earnRewardChange', e)} />
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

export default StakingPoolSettingForm