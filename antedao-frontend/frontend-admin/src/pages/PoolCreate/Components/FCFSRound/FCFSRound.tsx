import React, { useEffect, useState } from 'react';
import useStyles from "../../style";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import CurrencyInput from 'react-currency-input-field';

export interface RoundItem {
    allocation_bonus: string;
    before_buy_end_time: number;
}

const createDefaultRounds = (): RoundItem[] => {
    return ((new Array(4)).fill({ allocation_bonus: '', before_buy_end_time: '' }).map(i => ({ ...i })))
};

function FCFSRound(props: any) {
    const classes = useStyles();
    const { register, errors, getValues, poolDetail, setValue, needValidate } = props;

    const [rows, setRows] = useState<RoundItem[]>(createDefaultRounds());

    useEffect(() => {
        if (poolDetail?.fcfsRoundsSetting?.length) setRows(poolDetail.fcfsRoundsSetting);
    }, [poolDetail]);

    const handleChange = (index: number, field: string, value: string) => {
        value = value.replace('-', '');
        if (field === 'allocation_bonus') {
            rows[index].allocation_bonus = value;
        }
        else if (field === 'before_buy_end_time') {
            // eslint-disable-next-line array-callback-return
            rows.map((row, index) => {
                // eslint-disable-next-line array-callback-return
                if (index >= 4) return;
                row.before_buy_end_time = Number(value) / 4 * (4 - index);
            })
        }
        setRows([...rows]);
        setValue('fcfsRound', JSON.stringify([...rows]), { shouldValidate: true });
    }
    const isDeployed = !!poolDetail?.is_deploy;
    return (
        <>
            <div className={classes.exchangeRate}>
                <label className={classes.exchangeRateTitle}>FCFS Rounds</label>
                <p className={classes.formDescription}>FCFS Round 4 Allocation will be unlimited</p>
                <input
                    type="hidden"
                    name="fcfsRound"
                    value={JSON.stringify(rows)}
                    ref={register({
                        validate: {
                            overRangBuyTime: (value: any) => {
                                try {
                                    if (!needValidate) return true;
                                    const arr: any[] = JSON.parse(value);
                                    const beforeBuyEndTime = arr[0]?.before_buy_end_time;
                                    const startBuyTime = getValues('start_time');
                                    const endBuyTime = getValues('finish_time');
                                    if (!startBuyTime || !endBuyTime) return true;
                                    return (endBuyTime.unix() - startBuyTime.unix() >= Number(beforeBuyEndTime) * 60);
                                } catch { }
                                return true;
                            },
                            bonusRequired: (value: any) => {
                                try {
                                    const arr: any[] = JSON.parse(value);
                                    return !arr.slice(0, 3).some(value => !Number(value.allocation_bonus));
                                } catch { }
                                return true;
                            },
                            beforeBuyEndTimeRequired: (value: any) => {
                                try {
                                    if (!needValidate) return true;
                                    const arr: any[] = JSON.parse(value);
                                    return !!arr[0]?.before_buy_end_time;
                                } catch { }
                                return true;
                            }
                        }
                    })}
                />
                {errors.fcfsRound?.type === 'overRangBuyTime' &&
                    <p className={classes.formErrorMessage}>FCFS time must be in the range of overall Buy time of the pool</p>
                }
                <TableContainer >
                    <Table className={classes.tableFCFS} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Phase</TableCell>
                                <TableCell>Allocation bonus</TableCell>
                                <TableCell>Start Buy Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((item: any, index: any) => {
                                const { allocation_bonus, before_buy_end_time } = item;
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <p className={classes.p}>Phase {index + 1}</p>
                                        </TableCell>
                                        <TableCell >
                                            <div className={classes.relative}>
                                                <CurrencyInput
                                                    value={`${allocation_bonus}`}
                                                    groupSeparator=","
                                                    decimalSeparator="."
                                                    maxLength={25}
                                                    className={classes.formInput}
                                                    onValueChange={value => handleChange(index, 'allocation_bonus', value || '')}
                                                    disabled={isDeployed || index >= 3}
                                                    min={0}
                                                    title={`${index < 3 ? allocation_bonus : "Unlimited"}`}
                                                />
                                                <p className={classes.absolute}>%</p>
                                            </div>
                                            {index < 3 && !Number(allocation_bonus) && errors.fcfsRound?.type === 'bonusRequired' &&
                                                <p className={classes.formErrorMessage}>This field is required</p>
                                            }
                                        </TableCell>
                                        <TableCell >
                                            <div className={classes.flex}>
                                                <p className={classes.p}>Before</p>
                                                <div className={classes.relativeMIn}>
                                                    <CurrencyInput
                                                        value={`${before_buy_end_time}`}
                                                        decimalScale={0}
                                                        groupSeparator=","
                                                        decimalSeparator="."
                                                        maxLength={25}
                                                        className={classes.formInput + ' ' + classes.inputEndBuyTime}
                                                        onValueChange={value => handleChange(index, 'before_buy_end_time', value || '')}
                                                        disabled={(!!index || isDeployed)}
                                                        min={0}
                                                    />
                                                    <p className={classes.absolute}>Min</p>
                                                </div>
                                                <p className={classes.p}>End Buy Time</p>
                                            </div>
                                            {index === 0 && errors.fcfsRound?.type === 'beforeBuyEndTimeRequired' &&
                                                <p className={classes.formErrorMessage}>This field is required</p>
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default FCFSRound;