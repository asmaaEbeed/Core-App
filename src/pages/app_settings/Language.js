import React from "react";
import Card from "../../components/Card";
import { useTranslation } from 'react-i18next';


const Language = ({changeLanguage, language, color, handleIsChange}) => {
    // eslint-disable-next-line
    const {t, i18n} = useTranslation();

    // const [language, setLanguage] = useState("english");
    const inputStyle =
    `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold`;

    const handleChangeLanguage = (e) => {
        // setLanguage(e);
        changeLanguage(e);
        handleIsChange(true)
    }
  return (
    <div>
      <Card title={t('languageCardTitle')}>
        <select
          name="country"
          className={`border-cyan-md-light border-${color}-md-light focus-visible:outline-cyan-md-light ${inputStyle} my-3 md:w-1/2 text-dark-theme`}
          id="country"
          value={language}
          onChange={(e) => handleChangeLanguage(e.target.value)}
        >
          <option value="english">{t('enLanguageSelect')}</option>
          <option value="arabic">{t('arLanguageSelect')}</option>
        </select>
      </Card>
    </div>
  );
};

export default Language;
