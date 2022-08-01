import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CurrencyInput from "react-currency-input-field";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { APP_NETWORK_NAMES, ETH_CHAIN_ID, TIERS } from '../../constants';
import { updateTiersSetting } from '../../request/tier';
import { alertFailure, alertSuccess } from '../../store/actions/alert';
import { getOwnerWalletAddress } from '../../store/actions/campaign';
import NetworkWaningPolygon from '../NetworkChange/NetworkWaningPolygon';
import useStyles from './styles';

export const DECIMALS = 18;
// const PRECISION = 0;
export interface TierItem {
    tier: number;
    token_amount: number;
    id?: number | string;
}

interface TiersAmountData {
    tier: {
        tier: string;
        token_amount: string;
    }[]
}

interface TierSettingFormPops {
    stakeAmounts: TierItem[];
    getTiersList: () => void;
}

const TierSettingForm: React.FC<any> = (props: TierSettingFormPops) => {
    const { wallet_address, currentNetworkId } = useSelector((state: any) => {
        return {
            ...state,
            currentNetworkId: state.userCurrentNetwork.currentNetworkId,
            wallet_address: state.user.data.wallet_address,
        };
    });

    const classes = useStyles();
    const dispatch = useDispatch();
    const { stakeAmounts } = props;
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [addressOwner, setAddressOwner] = useState<any>("");
    const checkOwner = Boolean(addressOwner !== wallet_address);
    const checkNetWork = currentNetworkId !== ETH_CHAIN_ID;


    useEffect(() => {
        const getOwner = async () => {
            if (currentNetworkId) {
                const addressOwner = await getOwnerWalletAddress(
                    APP_NETWORK_NAMES[currentNetworkId] || "",
                );
                setAddressOwner(addressOwner);
            }
        };
        getOwner();
    }, [currentNetworkId]);

    const { register, errors, handleSubmit, control, watch, setValue } = useForm({
        mode: "onChange",
        defaultValues: {
            tier: stakeAmounts.map((item) => ({
                ...item,
                tier: item.tier.toString(),
                token_amount: item.token_amount.toString()
            }))
        },
        reValidateMode: 'onChange',
    });
    const { fields } = useFieldArray({
        control,
        name: "tier"
    });

    const handleFormSubmit = async (data: TiersAmountData) => {
        const tiersAmount: TierItem[] = data.tier.map(({ tier, token_amount }) => ({
            tier: Number(tier),
            token_amount: Number(token_amount)
        }));
        setSubmitting(true);
        try {
            for (let i = 0; i < tiersAmount.length; i++) {
                const tier = tiersAmount[i];
                const originTier = stakeAmounts[i];
                if (tier.token_amount !== originTier.token_amount) {
                    await updateTiersSetting(tier);
                }
            }
            dispatch(alertSuccess('Updated successfully!'));
            setSubmitting(false);
        } catch (err) {
            dispatch(alertFailure('Updated failed!!'));
            setSubmitting(false);
        }
    }
    return (
        <>
            {(checkNetWork) ? (
                <NetworkWaningPolygon />
            ) : (<></>)}
            <div className={classes.tierFlex}>
                <label className={classes.tierTitle}>Tier Setting</label>
                <Button
                    className={classes.tierButton}
                    onClick={() => handleSubmit(handleFormSubmit)()}
                    disabled={!isEdited || submitting || checkOwner || checkNetWork}
                >Update</Button>
            </div>
            <TableContainer className={classes.fromTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tierTitle}>Tier</TableCell>
                            <TableCell className={classes.tierTitle} align='right'>Stake Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map((item, index) => {
                            const currentValue = watch(`tier.${index}.token_amount`);
                            const prevAmount = index ? Number(watch(`tier.${index - 1}.token_amount`)) : 0;
                            const error = errors.tier?.[index];
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className={classes.tierTitle}>{TIERS[index + 1]}</TableCell>
                                    <TableCell align='right'>
                                        <div className={classes.tierFlexEnd}>
                                            <input
                                                type="number"
                                                name={`tier.${index}.tier`}
                                                defaultValue={`${item.tier}`}
                                                className={classes.tierInput}
                                                ref={register({})}
                                                hidden
                                            />
                                            <input
                                                type="number"
                                                name={`tier.${index}.token_amount`}
                                                value={`${currentValue}`}
                                                className={classes.tierInput}
                                                ref={register({
                                                    required: true,
                                                    validate: value => { return Number(value) > prevAmount },
                                                })}
                                                readOnly
                                                hidden
                                            />
                                            <CurrencyInput
                                                disabled={checkOwner || checkNetWork}
                                                defaultValue={`${item.token_amount}`}
                                                decimalScale={2}
                                                groupSeparator=","
                                                decimalSeparator="."
                                                maxLength={25}
                                                className={classes.tierInput + (error ? " error" : "")}
                                                onValueChange={value => {
                                                    setValue(`tier.${index}.token_amount`, value, { shouldValidate: true });
                                                    if (Number(stakeAmounts[index]?.token_amount !== Number(value))) {
                                                        setIsEdited(true);
                                                    }
                                                }}
                                            />
                                            <label className={classes.tierSBX}>ANTE</label>
                                        </div>
                                        {error?.token_amount ?
                                            <div className={classes.formErrorMessage}>
                                                {error.token_amount.type === "validate" ?
                                                    `Stake amount must be greater than ${index ? "the previous tier" : 0}!`
                                                    : "This field is required!"
                                                }
                                            </div>
                                            : ""}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TierSettingForm;