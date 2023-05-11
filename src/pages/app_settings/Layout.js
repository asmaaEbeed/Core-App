import React from 'react';
import Card from '../../components/Card';
import { useTranslation } from 'react-i18next';

const Layout = ({layoutDirection, layoutIsVertical, handleIsChange}) => {
  // eslint-disable-next-line 
  const {t, i18n} = useTranslation();
  
  const changeLayoutDirection = (e) => {
    layoutDirection(e);
    handleIsChange(true)
  }
  

  return (
    <div>
        <Card title={t('layoutCardTitle')}>
            <div>
                <input type="radio" id="horizontal" checked={!layoutIsVertical} name="layoutDirection" value="horizontal" className='m-2' onChange={e => changeLayoutDirection(e.target.value)}/>
                <label htmlFor="horizontal" className="font-semibold mt-2 text-md-xs">{t('horzLayoutSelect')}</label>
            </div>
            <div>
                <input type="radio" id="vertical" checked={layoutIsVertical} name="layoutDirection" value="vertical" className='m-2' onChange={e => changeLayoutDirection(e.target.value)} />
                <label htmlFor="vertical" className="font-semibold mt-2 text-md-xs">{t('vertLayoutSelect')}</label>
            </div>
        </Card>
    </div>
  )
};

export default Layout;