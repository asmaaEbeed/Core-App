import {  useCallback, useContext, useEffect } from "react";
import {   UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import DirectionLayoutContext from "../shop/DirectionLayoutContext";
import ThemeContext from "../shop/ThemeContext";
import LanguageContext from "../shop/LanguageContext";
import { useTranslation } from "react-i18next";

function useConfirmExit(confirmExit, when = true) {
    const { navigator } = useContext(NavigationContext);
  
    useEffect(() => {
      if (!when) {
        return;
      }
  
      const push = navigator.push;
  
      navigator.push = (...args) => {
        const result = confirmExit();
        if (result !== false) {
          push(...args);
        }
      };
  
      return () => {
        navigator.push = push;
      };
    }, [navigator, confirmExit, when]);
  }
  

export const UsePrompt = ({message, when, userThemeColor, userLayoutIsVertical, userLanguage}) => {
    const themeContext = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);
  const directionLayoutContext = useContext(DirectionLayoutContext);
  // eslint-disable-next-line
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (when) {
      window.onbeforeunload = function () {
        return message;
      };
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [message, when]);

  const confirmExit = useCallback(() => {
    const confirm = window.confirm(message);

    confirm && (themeContext.changeTheme(userThemeColor));
    confirm && (languageContext.changeLanguage(userLanguage));
    confirm && (directionLayoutContext.changeIsVertical(userLayoutIsVertical));
    
    confirm && i18n.changeLanguage(userLanguage);
    
    return confirm;
  }, [message, themeContext, userThemeColor, languageContext, userLanguage, directionLayoutContext, userLayoutIsVertical, i18n]);
  // console.log(confirmExit)
  useConfirmExit(confirmExit, when);

}

export default UsePrompt
