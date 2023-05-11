import React from "react";
import Card from "../../components/Card";
import { useTranslation } from 'react-i18next';



const Themes = ({changeThemeColor, currentTheme, handleIsChange}) => {
  // eslint-disable-next-line
  const {t, i18n} = useTranslation();

  const changeTheme = (e) => {
    changeThemeColor(e);
    handleIsChange(true)
    // sessionStorage.setItem('theme', e);
  }

  return (
    <Card title={t("themesCardTitle")}>
      <div>
        <h2 className="font-semibold mt-2 text-md-xs">{t('lightThemesTitle')}</h2>
        <div className="md:w-1/5 w-3/4 m-2 inline-block overflow-hidden rounded-xl relative">
          <label className="cursor-pointer">
            <input
              type="radio"
              id="themeCyanLight"
              name="themeColor"
              value="themeCyanLight"
              className="-z-3 absolute top-3 left-4"
              onChange={e => changeTheme(e.target.value)} 
            />
            <img
              src={require("../../images/theme-images/theme-cyan-light.png")}
              alt="theme-cyan-light"
            />
          </label>
        </div>
        <div className="md:w-1/5 w-3/4 m-2 inline-block overflow-hidden rounded-xl relative">
          <label className="cursor-pointer">
            <input
              type="radio"
              id="themePurpleLight"
              name="themeColor"
              value="themePurpleLight"
              className="-z-3 absolute top-3 left-4"
              onChange={e => changeTheme(e.target.value)} 
            />
            <img
              src={require("../../images/theme-images/theme-purple-light.png")}
              alt="theme-cyan-light"
            />
          </label>
        </div>
        <div className="md:w-1/5 w-3/4 m-2 inline-block overflow-hidden rounded-xl relative">
          <label className="cursor-pointer">
            <input
              type="radio"
              id="themeRedLight"
              name="themeColor"
              value="themeRedLight"
              className="-z-3 absolute top-3 left-4"
              onChange={e => changeTheme(e.target.value)} 
            />
            <img
              src={require("../../images/theme-images/theme-red-light.png")}
              alt="theme-red-light"
            />
          </label>
        </div>
        <div className="md:w-1/5 w-3/4 m-2 inline-block overflow-hidden rounded-xl relative">
        <label className="cursor-pointer">
            <input
              type="radio"
              id="themeBlueLight"
              name="themeColor"
              value="themeBlueLight"
              className="-z-3 absolute top-3 left-4"
              onChange={e => changeTheme(e.target.value)}
            />
            <img
              src={require("../../images/theme-images/theme-blue-light.png")}
              alt="theme-blue-light"
            />
          </label>
          
        </div>
      </div>
      <div>
        <h2 className="font-semibold mt-2 text-md-xs">{t('darkThemesTitle')}</h2>
        <div className="md:w-1/5 w-3/4 m-2 inline-block overflow-hidden rounded-xl relative">
        <label className="cursor-pointer">
            <input
              type="radio"
              id="themeBlueDark"
              name="themeColor"
              value="themeBlueDark"
              className="-z-3 absolute top-3 left-4"
              onChange={e => changeTheme(e.target.value)} 
            />
            <img
              src={require("../../images/theme-images/theme-blue-dark.png")}
              alt="theme-blue-dark"
            />
          </label>
        </div>
        <div className="md:w-1/5 w-3/4 m-2 inline-block overflow-hidden rounded-xl relative">
        <label className="cursor-pointer">
            <input
              type="radio"
              id="themeDianeeDark"
              name="themeColor"
              value="themeDianeeDark"
              className="-z-3 absolute top-3 left-4"
              onChange={e => changeTheme(e.target.value)} 
            />
            <img
              src={require("../../images/theme-images/theme-dianee-dark.png")}
              alt="theme-dianee-dark"
            />
          </label>
          
        </div>
        <div className="md:w-1/5 w-3/4 m-2 inline-block overflow-hidden rounded-xl relative">
        <label className="cursor-pointer">
            <input
              type="radio"
              id="themeBrownDark"
              name="themeColor"
              value="themeBrownDark"
              className="-z-3 absolute top-3 left-4"
              onChange={e => changeTheme(e.target.value)} 
            />
            <img
              src={require("../../images/theme-images/theme-brown-dark.png")}
              alt="theme-brown-dark"
            />
          </label>
        </div>
        <div className="md:w-1/5 w-3/4 m-2 inline-block overflow-hidden rounded-xl relative">
        <label className="cursor-pointer">
            <input
              type="radio"
              id="themeToledoDark"
              name="themeColor"
              value="themeToledoDark"
              className="-z-3 absolute top-3 left-4"
              onChange={e => changeTheme(e.target.value)} 
            />
            <img
              src={require("../../images/theme-images/theme-toledo-dark.png")}
              alt="theme-toledo-dark"
            />
          </label>
        </div>
      </div>
    </Card>
  );
};

export default Themes;
