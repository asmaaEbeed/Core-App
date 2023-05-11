import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../shop/ThemeContext';

const ThemeCyanLight = React.lazy(() => import('./ThemeCyanLight.js'));
const ThemeRedLight = React.lazy(() => import('./ThemeRedLight.js'));

const ThemeSelector = ({ children }) => {

 
  const [chosenTheme, setChosenTheme] = useState("");

  let themeContext = useContext(ThemeContext);
  
  useEffect(() => {
    setChosenTheme(themeContext.themeColor);

  }, [themeContext.themeColor]);

  // useEffect(() => {
  //   if(chosenTheme === "themeRedLight") {
  //     ThemeCyanLight.unuse()
  //   }
  // }, [chosenTheme])


  // const CHOSEN_THEME = themeContext.themeColor;
  // const CHOSEN_THEME = localStorage.getItem('theme')

    return (
      <>
        <React.Suspense fallback={<></>}>

          {(chosenTheme === "themeCyanLight") ? <ThemeCyanLight /> : (chosenTheme === "themeRedLight")? <ThemeRedLight /> : "" }
{/* 
          {(chosenTheme === "themeCyanLight") ? <ThemeCyanLight /> : ""}
          {(chosenTheme === "themeRedLight") ? <ThemeRedLight /> : ""} */}
        </React.Suspense>
        {children}
      </>
    )
  }
  export default ThemeSelector;