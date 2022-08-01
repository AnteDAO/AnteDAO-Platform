import { useEffect } from 'react';
import useStyles from "../style";
// @ts-ignore
// @ts-ignore
import { renderErrorCreatePool } from "../../../utils/validate";

// CSS in /src/index.css

function PoolDescription(props: any) {
  const classes = useStyles();
  const {
    register, setValue, errors, watch,
    poolDetail
  } = props;
  const renderError = renderErrorCreatePool;

  const maxLength = 500;
  // const [description, setDescription] = useState(defaultValue);
  useEffect(() => {
    if (poolDetail && poolDetail.description) {
      setValue('description', poolDetail.description, { shouldValidate: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetail]);
  // const isDeployed = !!poolDetail?.is_deploy;
  const description = watch('description')
  return (
    <>
      <div className={classes.formCKEditor}>
        <div className={classes.flex}>
          <div className=''>
            <label className={classes.exchangeRateTitle}>About the project </label>
            {description?.length > maxLength ? (
              <p style={{color:'red', position:'absolute'}} className={classes.p}>Please enter less than {maxLength}</p>
            ) : (<></>)}
          </div>
          <p className={classes.p}>{description?.length}/{maxLength}</p>
        </div>

        {/*<CKEditor*/}
        {/*  editor={ ClassicEditor }*/}
        {/*  data={description}*/}
        {/*  onReady={ (editor: any) => {*/}
        {/*    // You can store the "editor" and use when it is needed.*/}
        {/*    // console.log( 'Editor is ready to use!', editor );*/}
        {/*  } }*/}
        {/*  onChange={ ( event: any, editor: any ) => {*/}
        {/*    const data = editor.getData();*/}
        {/*    setDescription(data)*/}
        {/*  } }*/}
        {/*  onBlur={ ( event: any, editor: any ) => {*/}
        {/*    // console.log( 'Blur.', editor );*/}
        {/*  } }*/}
        {/*  onFocus={ ( event: any, editor: any ) => {*/}
        {/*    // console.log( 'Focus.', editor );*/}
        {/*  } }*/}
        {/*  // disabled={isDeployed}*/}
        {/*/>*/}
        {/*<input*/}
        {/*  type="hidden"*/}
        {/*  value={description}*/}
        {/*  name="description"*/}
        {/*  ref={register({*/}
        {/*    // required: true*/}
        {/*  })}*/}
        {/*/>*/}

        <textarea
          id='my-text'
          value={description}
          name="description"
          ref={register({
            validate: {
              lessThan500: (value:any) => (value.length <= maxLength)
            }
          })}
          // onChange={e => setDescription(e?.target?.value)}
          className={classes.formControlInput}
          rows={10}
          cols={50}
        />
        <p className={classes.formErrorMessage}>
          {
            renderError(errors, 'description')
          }
        </p>

      </div>
    </>
  );
}

export default PoolDescription;
