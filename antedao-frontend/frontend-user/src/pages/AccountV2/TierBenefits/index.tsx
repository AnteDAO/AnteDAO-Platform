import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, withWidth, Hidden } from '@material-ui/core';
import { numberWithCommas } from "../../../utils/formatNumber";
import useStyles from './style';

function createData(name: string, dove: number, hawk: number, eagle: number, phoenix: number) {
  return { name, dove, hawk, eagle, phoenix };
}

const rows = [
  createData('Minimum stalking time required (PKF/LP-PKF)', 0, 0, 0, 0),
  createData('Social interaction requirements', 1, 1, 0, 0),
  createData('Guaranteed allocation', 0, 0, 1, 1),
  createData('Exclusive pools', 0, 0, 1, 1),
  createData('Occasional airdrop of NFT and tokens', 0, 0, 0, 1),
  createData('Private prosperity group', 0, 0, 0, 1),
];

const rowsMobile = [
  {
    name: 'DOVE',
    values: [
      'Minimum amount of Red Kite point required :<span>500</span>',
      'Social interaction requirements',
    ]
  },
  {
    name: 'HAWK',
    values: [
      'Minimum amount of Red Kite point required :<span>5,000</span>',
      'Social interaction requirements',
    ]
  },
  {
    name: 'EAGLE',
    values: [
      'Minimum amount of Red Kite point required :<span>40,000</span>',
      'Guaranteed allocation',
      'Exclusive pools'
    ]
  },
  {
    name: 'PHOENIX',
    values: [
      'Minimum amount of Red Kite point required :<span>80,000</span>',
      'Guaranteed allocation',
      'Exclusive pools',
      'Occasional airdrop of NFT and tokens',
      'Private prosperity group',
    ]
  },
];

const TierBenefits = (props: any) => {
  const styles = useStyles();

  return (
    <div className={styles.tabTierBenefits}>
      <Hidden smDown>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={styles.tableCellHead}></TableCell>
                <TableCell className={styles.tableCellHead} align="right">Dove</TableCell>
                <TableCell className={styles.tableCellHead} align="right">Hawk</TableCell>
                <TableCell className={styles.tableCellHead} align="right">Eagle</TableCell>
                <TableCell className={styles.tableCellHead} align="right">Phoenix</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={styles.tableRow}>
                <TableCell className={styles.tableCellBody} component="th" scope="row">
                  Minimum amount of Red Kite point required
                </TableCell>
                <TableCell className={styles.tableCellBody} align="right">{numberWithCommas('500')}</TableCell>
                <TableCell className={styles.tableCellBody} align="right">{numberWithCommas('5000')}</TableCell>
                <TableCell className={styles.tableCellBody} align="right">{numberWithCommas('40000')}</TableCell>
                <TableCell className={styles.tableCellBody} align="right">{numberWithCommas('80000')}</TableCell>
              </TableRow>
              {rows.map((row) => (
                <TableRow key={row.name} className={styles.tableRow}>
                  <TableCell className={styles.tableCellBody} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell className={styles.tableCellBody} align="right">
                    <img src={`/images/account_v3/icons/icon_table_${row.dove === 0 ? 'false' : 'true'}.svg`} alt="" />
                  </TableCell>
                  <TableCell className={styles.tableCellBody} align="right">
                    <img src={`/images/account_v3/icons/icon_table_${row.hawk === 0 ? 'false' : 'true'}.svg`} alt="" />
                  </TableCell>
                  <TableCell className={styles.tableCellBody} align="right">
                    <img src={`/images/account_v3/icons/icon_table_${row.eagle === 0 ? 'false' : 'true'}.svg`} alt="" />
                  </TableCell>
                  <TableCell className={styles.tableCellBody} align="right">
                    <img src={`/images/account_v3/icons/icon_table_${row.phoenix === 0 ? 'false' : 'true'}.svg`} alt="" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Hidden>

      <Hidden mdUp>
        <div className={styles.tierBenefitsMobile}>
          {
            rowsMobile?.map((item, index) => {
              return (
                <div className={styles.itemTierMobile} key={index}>
                  <div className={styles.nameTierMobile}>{item.name}</div>
                  <ul className={styles.listActiveTierMobile}>
                    {
                      item?.values?.map((value, i)=> {
                        return (
                          <li key={i} className={styles.valueActiveMobile} >
                            <img src={`/images/account_v3/icons/icon_table_true.svg`} alt="" />
                            <div dangerouslySetInnerHTML={{__html: value}} />
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              )
            })
          }
        </div>
      </Hidden>
    </div>
  );
};

export default withWidth()(TierBenefits);
