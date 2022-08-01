import React, { useEffect, useState } from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import BigNumber from 'bignumber.js';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import { getTiersSetting } from '../../request/tier';
import useStyles from './styles';
import TierSettingForm, { TierItem } from './TierSettingForm';
import { useDispatch } from 'react-redux';
import { alertFailure } from '../../store/actions/alert';
import NetworkWarningBanner from '../../components/Base/RightDefaultLayout/NetworkWarningBanner';


const Tier: React.FC<any> = (props: any) => {
    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(true);
    const [failure, setFailure] = useState<string>('');
    const [stakeAmounts, setStakeAmounts] = useState<TierItem[]>([]);

    const dispatch = useDispatch();

    const getTiersList = async () => {
        setLoading(true);
        try {
            const resObject = await getTiersSetting();
            if (resObject.status === 200) {
                const dataFilled = resObject.data.map((item: TierItem | string, index: number) => {
                    if (typeof item === 'string') {
                        return ({ tier: index + 1, token_amount: new BigNumber(item) })
                    }
                    else return item
                });
                setStakeAmounts(dataFilled);
            } else {
                dispatch(alertFailure('Updated failed!!'));
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setFailure('Fetch failed');
            dispatch(alertFailure('Updated failed!!'));
        }
    };
    useEffect(() => {
        getTiersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <DefaultLayout>
            <NetworkWarningBanner/>
            {loading ?
                [...Array(9)].map((num, index) =>
                    <div key={index}>
                        <Skeleton className={classes.skeleton} width={'100%'} />
                    </div>
                )
                :
                <TierSettingForm
                    stakeAmounts={stakeAmounts}
                    getTiersList={getTiersList}
                />
            }
            {failure && <p className={classes.errorMessage}>{failure}</p>}
        </DefaultLayout>
    )
}

export default Tier;