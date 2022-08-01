import { useEffect, useRef, useState } from 'react';
import useStyles from "../../style";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Controller } from "react-hook-form";
import { Switch } from "antd";
import CreateEditTierForm from "./CreateEditTierForm";
import moment from "moment";
import BigNumber from 'bignumber.js';
import { DATETIME_FORMAT, TIERS } from "../../../../constants";
import { renderErrorCreatePool } from "../../../../utils/validate";

const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  },
});

const createData = (name: string, startTime: any, endTime: any, isEdit: boolean, percent = 0, multiple = 0, level: number) => {
  return { name, startTime, endTime, isEdit, percent, multiple, level };
};
const allocationDefault = [0, 1, 2, 2, 2, 3, 6, 14, 22, 28];
const allocationPercentDefault = [0, 0, 0, 0, 0, 0, 0, 10, 30, 60];

const createDefaultTiers = () => {
  return TIERS.map((tier, index) => createData(tier, null, null, false, allocationPercentDefault[index], allocationDefault[index], index))
};

function TierTable(props: any) {
  const classes = useStyles();
  const classesTable = useStylesTable();
  const {
    register, watch,
    poolDetail, isEdit,
    setValue, errors, control
  } = props;
  const renderError = renderErrorCreatePool;
  const [isOpenEditPopup, setIsOpenEditPopup] = useState(false);
  const [editData, setEditData] = useState({});
  const [editRow, setEditRow] = useState(0);
  const [isFormEdit, setIsFormEdit] = useState(true);
  const [rows, setRows] = useState(createDefaultTiers());
  const prevIsPercentRef = useRef();


  const watchStartTime = watch('start_time');
  const watchEndTime = watch('finish_time');

  const isDeployed = !!poolDetail?.is_deploy;
  const minTier = watch('minTier');
  const is_use_allocation_percent = watch('is_use_allocation_percent');


  useEffect(() => {
    if (poolDetail && poolDetail.tiers) {
      if (poolDetail.tiers.length) {
        const dataFormatted = poolDetail.tiers.slice(0, 10).map((item: any, index: any) => {
          return createData(
            TIERS[index],
            item.start_time ? moment(item.start_time * 1000).format(DATETIME_FORMAT) : null,
            item.end_time ? moment(item.end_time * 1000).format(DATETIME_FORMAT) : null,
            false,
            item.percent || 0,
            item.multiple || 0,
            index,
          );
        });
        setRows(dataFormatted);
      }
      else {
        setRows(createDefaultTiers());
      }
      setValue('is_use_allocation_percent', !!poolDetail.is_use_allocation_percent)
    }
    else if (!isEdit) {
      setValue('is_use_allocation_percent', true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetail]);

  useEffect(() => {
    if (prevIsPercentRef.current !== undefined) {
      setRows(createDefaultTiers());
      setValue('minTier', is_use_allocation_percent ? 7 : 1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_use_allocation_percent]);



  const openPopupEdit = (e: any, row: any, index: number) => {

    setEditData(row);
    setEditRow(index);
    setIsFormEdit(true);
    setIsOpenEditPopup(true);
  };

  const handleCreateUpdateData = (responseData: any) => {
    if (isFormEdit && editRow !== -1) {
      // Update
      // @ts-ignore
      rows[editRow] = responseData;
      setRows([...rows]);
    }
    setIsOpenEditPopup(false);
  };

  useEffect(() => {
    //assign the ref's current value to the count Hook
    prevIsPercentRef.current = is_use_allocation_percent;
  }, [is_use_allocation_percent]);


  return (
    <>
      {isOpenEditPopup &&
        <CreateEditTierForm
          isOpenEditPopup={isOpenEditPopup}
          setIsOpenEditPopup={setIsOpenEditPopup}
          renderError={renderError}
          editData={editData}
          isEdit={isFormEdit}
          handleCreateUpdateData={handleCreateUpdateData}
          is_use_allocation_percent={is_use_allocation_percent}
          watchStartTime={watchStartTime}
          watchEndTime={watchEndTime}
        />
      }

      <div className={classes.formControl}>
        <div className={classes.flexRowStart} style={{ marginBottom: 15, marginTop: 10 }}>
          <label className={classes.formControlLabel}>Tier Configuration</label>
          <FormControl component="fieldset">
            <div className={classes.flexRowStart} style={{ marginTop: 0, marginLeft: 50 }}>
              <Controller
                control={control}
                name="is_use_allocation_percent"
                defaultValue={is_use_allocation_percent}
                disabled={isDeployed}
                as={
                  <Switch checked={is_use_allocation_percent} onChange={value => setValue('is_use_allocation_percent', value)} />}
              />
              <div style={{ marginLeft: 10 }}><label className={classes.formControlLabel}>Allocate by percentage</label></div>
            </div>
          </FormControl>
        </div>
        {errors.is_use_allocation_percent &&
          <p className={classes.formErrorMessage}>
            {renderError(errors, 'is_use_allocation_percent')}
          </p>
        }
        <input
          type="hidden"
          name="tierConfiguration"
          value={JSON.stringify(rows)}
          ref={register({
            validate: {
              allocationEqualOneHunred: (value: string) => {
                if (!is_use_allocation_percent) return true;
                try {
                  const arr: any[] = JSON.parse(value);
                  const total: BigNumber = arr.reduce((sum: BigNumber, item: any) => sum.plus(item.percent), new BigNumber(0));
                  if (!total.eq(100)) return false;
                } catch { }
                return true;
              },
              mustBeInTheRangeOfOverallBuyTimeOfThePool: (value: string) => {
                const watchStartTimeUnix = watchStartTime && moment(watchStartTime).unix();
                const watchEndTimeUnix = watchEndTime && moment(watchEndTime).unix();
                try {
                  const arr: any[] = JSON.parse(value);
                  const isError = arr.some((item: any) => {
                    if (item.startTime) {
                      const startTimeUnix = moment(item.startTime).unix();
                      if (watchStartTime && startTimeUnix < watchStartTimeUnix) return true;
                    }
                    if (item.endTime) {
                      const endTimeUnix = item.endTime && moment(item.endTime).unix();
                      if (watchEndTime && endTimeUnix > watchEndTimeUnix) return true;
                    }
                    return false;
                  });
                  return !isError
                } catch { }
                return true;
              },
              allocationHigherThanZero: (value: string) => {
                try {
                  const arr: any[] = JSON.parse(value);
                  return !arr.some(tier => (
                    tier.level >= minTier && (
                      (is_use_allocation_percent && !tier.percent)
                      ||
                      (!is_use_allocation_percent && !tier.multiple)
                    )
                  ))
                } catch { }
                return true;
              }
            }
          })}
        />
        {errors.tierConfiguration &&
          <p className={classes.formErrorMessage}>
            {renderErrorCreatePool(errors, 'tierConfiguration')}
          </p>
        }
      </div>
      <TableContainer className={classes.table} component={Paper}>
        <Table className={classesTable.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Allocation</TableCell>
              {/* <TableCell align="center">Start Buy Time</TableCell>
              <TableCell align="center">End Time</TableCell> */}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => {
              let { startTime, endTime, percent, multiple, name } = row;
              startTime = startTime ? moment(startTime).format(DATETIME_FORMAT) : '-';
              endTime = endTime ? moment(endTime).format(DATETIME_FORMAT) : '-';
              if (index < minTier) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                startTime = '-';
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                endTime = '-';
                percent = 0;
                multiple = 0;
              }
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="center">
                    {is_use_allocation_percent ?
                      (Number(percent) + "%")
                      :
                      (Number(multiple) + "x")
                    }
                  </TableCell>
                  {/* <TableCell align="center">{startTime}</TableCell>
                  <TableCell align="center">{endTime}</TableCell> */}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.formButtonEdit}
                      onClick={(e) => openPopupEdit(e, row, index)}
                      disabled={isDeployed || (index < minTier)}
                    >Edit</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TierTable;
