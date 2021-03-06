import React from 'react';
import MainDefaultLayout from '../../Base/MainDefaultLayout';
import HeaderDefaultLayout from '../../Base/HeaderDefaultLayout';
import FooterLandingLayout from '../../Base/FooterLandingLayout';
import { useCommonStyle } from '../../../styles';

const DefaultLayout = (props: any) => {
  const commonStyle = useCommonStyle();
  const {isTransparentHeader} = props
  return (
    <div className={commonStyle.DefaultLayout}>
      <div className={commonStyle.bgBody}>
        <HeaderDefaultLayout  isTransparentHeader={isTransparentHeader} isKYC={props.isKYC}/>
        <MainDefaultLayout isTransparentHeader={isTransparentHeader} >{props.children}</MainDefaultLayout>
        <FooterLandingLayout/>
      </div>
    </div>
  );
};

export default DefaultLayout;
