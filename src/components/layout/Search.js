import React, { useContext } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import DirectionLayoutContext from "../../shop/DirectionLayoutContext";
import LanguageContext from '../../shop/LanguageContext';
import { useTranslation } from 'react-i18next';


const Search = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();
  const directionLayout = useContext(DirectionLayoutContext);
  const langContext = useContext(LanguageContext);

  return (
    <>
        <div className="flex-1">
        <div className="text-center ar-ltr">
          <div className={`relative inline-block z-10 ${!directionLayout.isVertical ? ` top-8 ${langContext.language === "arabic" ? "-left-24 " : "-right-24"}` : "left-7"}`}>
            <SearchIcon />
          </div>

          <input type="text" placeholder={t("search")} className= {`ar-text-right pl-8 pr-4 py-2 rounded-xl drop-shadow focus-visible:outline-cyan-light ${!directionLayout.isVertical ? "w-full" : "lg:w-1/3 w-1/2" }`} />
        </div>
      </div>
    </>
  )
}

export default Search