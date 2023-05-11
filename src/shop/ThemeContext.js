import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [themeColor, setThemeColor] = useState("");
  // const id = "002";
  const userThemeColor = sessionStorage.getItem("themeColor");

  useEffect(() => {
    const getUserLayout = () => {
      // if(storageId && storageThemeColor ) {
      //     setThemeColor(storageThemeColor);
      // } else {

      //     // get setting for first login then save it in local storaage
      //     if(id) {
      //         const userTheme = loginContext.userData.tblSettings[0].themeColor;
      //         console.log({userTheme})
      //         console.log("jii")
      //         if(userTheme !== null && storageId) {
      //             setThemeColor(userTheme)
      //             sessionStorage.setItem("themeColor", userTheme);
      //         } else {
      //             setThemeColor("themeCyanLight")
      //         }
      //     } else {
      //         console.log("jjj")
      //         setThemeColor("themeCyanLight");
      //     }
      // }

      if (userThemeColor) {
        setThemeColor(userThemeColor)
         
      } else {
        setThemeColor("themeCyanLight");
      }
    };
    getUserLayout();
  }, [userThemeColor]);

  const changeTheme = (theme) => {
    setThemeColor(theme);
  };

  return (
    <ThemeContext.Provider value={{ changeTheme, themeColor }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
