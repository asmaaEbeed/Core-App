import React, { useContext } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ToggleMenuProvider from "../../shop/ToggleMenuContext";
import DirectionLayoutContext from "../../shop/DirectionLayoutContext";
import ThemeContext from "../../shop/ThemeContext";
import LanguageContext from "../../shop/LanguageContext";
import Search from "./Search";

const Header = () => {
  const menuContext = useContext(ToggleMenuProvider);

  const directionLayout = useContext(DirectionLayoutContext);

  const themeContext = useContext(ThemeContext);

  const languageContext = useContext(LanguageContext);

  const selectedHeaderImg = () => {
      if (themeContext.themeColor === "themeCyanLight") {
        return "theme-cyan-light.png";
      } else if (themeContext.themeColor === "themeRedLight") {
        return "theme-red-light.png";
      } else if (themeContext.themeColor === "themePurpleLight") {
        return "theme-purple-light.png";
      } else if (themeContext.themeColor === "themeBlueLight") {
        return "theme-blue-light.png";
      } else if (themeContext.themeColor === "themeBlueDark") {
        return "theme-blue-dark.png";
      } else if (themeContext.themeColor === "themeDianeeDark") {
        return "theme-dianee-dark.png";
      } else if (themeContext.themeColor === "themeBrownDark") {
        return "theme-brown-dark.png";
      } else if (themeContext.themeColor === "themeToledoDark") {
        return "theme-toledo-dark.png";
      }
    
  };

  return (
    <div
      className={`bg-white/0 h-28 w-full flex gap-x-1.5 content-center items-center ease-in-out duration-300 ${languageContext.language === "arabic" ? `${
        menuContext.menuOpen ? "pr-56" : "pr-24"
      }`:  `${
        menuContext.menuOpen ? "pl-56" : "pl-24"
      }`} `}
      style={{ 
        backgroundImage: themeContext.themeColor ?
          "url(" +
          require(`../../images/header-theme-imgs/${selectedHeaderImg()}`) +
          ")" : "none",
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <div
        className={` ${
          themeContext.themeColor.includes("Dark", 0)
            ? "text-white bg-black/50"
            : `text-${themeContext.themeColor} bg-white opacity-50`
        } flex-none ${languageContext.language === "arabic" ? `${menuContext.menuOpen ? "rotate-180" : "rotate-0"}` : `${menuContext.menuOpen ? "rotate-0" : "rotate-180"}`}  ${
          directionLayout.isVertical ? "block" : "hidden"
        } p-1 rounded-lg`}
        onClick={() => menuContext.changeMenuOpen(!menuContext.menuOpen)}
      >
        <MenuOpenIcon />
      </div>
      {directionLayout.isVertical && <Search />}
    </div>
  );
};

export default Header;
