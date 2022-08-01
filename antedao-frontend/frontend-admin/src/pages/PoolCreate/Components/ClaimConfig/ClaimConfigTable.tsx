import { Button } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import BigNumber from "bignumber.js";
import moment from "moment";
import { useEffect, useState } from 'react';
import { DATETIME_FORMAT } from "../../../../constants";
import { convertClaimConfigToPeriod } from '../../../../utils/campaign';
import useStyles from "../../style";
import ClaimPolicy from "./ClaimPolicy";
import CreateEditClaimConfigForm from "./CreateEditClaimConfigForm";



function ClaimConfigTable(props: any) {
  const classes = useStyles();
  const {
    register, watch, setValue, control, errors,
    poolDetail,
  } = props;
  const [editData, setEditData] = useState<any | null>(null);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [rows, setRows] = useState<any[]>([{ start_time: null, max_percent_claim: 100 }]);

  useEffect(() => {
    if (poolDetail?.campaignClaimConfig?.length) {
      const dataFormatted = convertClaimConfigToPeriod(poolDetail.campaignClaimConfig).map((item: any) => {
        return ({
          ...item,
          start_time: item.start_time ? moment(item.start_time * 1000).format(DATETIME_FORMAT) : null
        })
      });
      setRows(dataFormatted);
    }
  }, [poolDetail]);


  const openPopupCreate = () => {
    setEditData({});
    setEditIndex(-1);
  };
  const handleClose = () => {
    setEditData(null);
  }
  const handleCreateUpdateData = (data: any) => {
    if (editIndex >= 0) {
      rows[editIndex] = data;
    } else {
      rows.push(data);
    }
    rows.sort((a, b) => a.start_time > b.start_time ? 1 : -1);
    setRows([...rows]);
    setValue('campaignClaimConfig', JSON.stringify([...rows]), { shouldValidate: true });
    setEditData(null);
  };

  const deleteRow = (rowIndex: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Do you want delete this record ?')) {
      return false;
    }
    const newRows = rows.filter((item: any, index: number) => index !== rowIndex);
    setRows(newRows);
    setValue('campaignClaimConfig', JSON.stringify(newRows), { shouldValidate: true });
  };
  const isDeployed = !!poolDetail?.is_deploy;
  const totalPercent: BigNumber = rows.reduce((sum: BigNumber, item: any) => sum.plus(item.max_percent_claim), new BigNumber(0));
  const disableCreate = totalPercent.gte(100);
  const endBuyTime = watch('finish_time')
  return (
    <>
      <div><label className={classes.exchangeRateTitle}>Claim Configuration</label></div>
      <ClaimPolicy
        poolDetail={poolDetail}
        register={register}
        setValue={setValue}
        errors={errors}
        control={control}
        watch={watch}
      />
      <div className={classes.formControl}>
        <Button
          variant="contained"
          className={`button-color ${classes.formButtonCreate}`}
          onClick={openPopupCreate}
          disabled={isDeployed || disableCreate}
        >Create</Button>
        <input
          type="hidden"
          name="campaignClaimConfig"
          value={JSON.stringify(rows)}
          ref={register({
            required: true,
            validate: {
              equalOneHunred: (value: string) => {
                try {
                  const arr: any[] = JSON.parse(value);
                  const total = arr.reduce((sum, item: any) => sum + Number(item.max_percent_claim), 0);
                  if (total !== 100) return false;
                } catch { }
                return true;
              },
              gearteThanEndBuyTime: (value: string) => {
                try {
                  if (!endBuyTime) return true;
                  const arr: any[] = JSON.parse(value);
                  const startClaimTime = arr[0]?.start_time;
                  if (!startClaimTime) return false;
                  const starClaimTimeUnix = moment(startClaimTime).unix();
                  const endBuyTimeUnix = moment(endBuyTime).unix();
                  return (starClaimTimeUnix > endBuyTimeUnix);
                } catch { }
                return true;
              }
            }
          })}
        />
        {errors.campaignClaimConfig &&
          <p className={classes.formErrorMessage}>
            {errors.campaignClaimConfig.type === "required" ?
              "This field is required"
              : errors.campaignClaimConfig.type === "equalOneHunred" ?
                "Total Max Claim (%) must be equal to 100%"
                : errors.campaignClaimConfig.type === "gearteThanEndBuyTime" ?
                  "Claim time must be after End Buy time"
                  : ""}
          </p>
        }
      </div>
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell align="right">Max Claim (%)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{row.start_time || '--'}</TableCell>
                  <TableCell align="right">{row.max_percent_claim}%</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => { setEditData(row); setEditIndex(index) }}
                      disabled={isDeployed}
                    >Edit</Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(e) => deleteRow(index)}
                      style={{ marginLeft: 10, marginTop: 0 }}
                      disabled={isDeployed}
                    >Delete</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {editData &&
        <CreateEditClaimConfigForm
          editData={editData}
          editIndex={editIndex}
          rows={rows}
          handleCreateUpdateData={handleCreateUpdateData}
          handleClose={handleClose}
        />
      }
    </>
  );
}

export default ClaimConfigTable;
