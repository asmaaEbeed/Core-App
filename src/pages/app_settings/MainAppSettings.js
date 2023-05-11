import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DirectionLayoutContext from "../../shop/DirectionLayoutContext";
import ThemeContext from "../../shop/ThemeContext";
import LanguageContext from "../../shop/LanguageContext";
import LoginContext from "../../shop/LoginContext";
import Main from "../../components/layout/Main";
import Language from "./Language";
import Layout from "./Layout";
import Themes from "./Themes";
import Button from "../../components/Button";
import * as AppSettingApi from "../../API/AppSettingApi";
import NotificationSound from "../../sounds/notification-tone.mp3";
import Notification from "../../components/Notification";
import { useTranslation } from "react-i18next";
import UsePrompt from "../../components/UsePrompt";

// function useConfirmExit(confirmExit, when = true) {
//   const { navigator } = useContext(NavigationContext);

//   useEffect(() => {
//     if (!when) {
//       return;
//     }

//     const push = navigator.push;

//     navigator.push = (...args) => {
//       const result = confirmExit();
//       if (result !== false) {
//         push(...args);
//       }
//     };

//     return () => {
//       navigator.push = push;
//     };
//   }, [navigator, confirmExit, when]);
// }

//  const UsePrompt = ({message, when, userThemeColor, userLayoutIsVertical, userLanguage}) => {

//   const themeContext = useContext(ThemeContext);
//   const languageContext = useContext(LanguageContext);
//   const directionLayoutContext = useContext(DirectionLayoutContext);
//   // eslint-disable-next-line
//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     if (when) {
//       window.onbeforeunload = function () {
//         return message;
//       };
//     }
//     return () => {
//       window.onbeforeunload = null;
//     };
//   }, [message, when]);

//   const confirmExit = useCallback(() => {
//     const confirm = window.confirm(message);

//     confirm && (themeContext.changeTheme(userThemeColor));
//     confirm && (languageContext.changeLanguage(userLanguage));
//     confirm && (directionLayoutContext.changeIsVertical(userLayoutIsVertical));
    
//     confirm && i18n.changeLanguage(userLanguage);

//     return confirm;
//   }, [message, themeContext, userThemeColor, languageContext, userLanguage, directionLayoutContext, userLayoutIsVertical]);
//   // console.log(confirmExit)
//   useConfirmExit(confirmExit, when);
// }


const MainAppSettings = () => {
  const directionStorage = sessionStorage.getItem("direction");
  const directionLayout = useContext(DirectionLayoutContext);
  const themeContext = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);
  const loginContext = useContext(LoginContext);
// eslint-disable-next-line
  const { t, i18n } = useTranslation();

  //const id = loginContext.userData.id;
  const id = sessionStorage.getItem("userId")
  // Value of user app setting (Direction of sidebar)
  const [userLayoutIsVertical, setUserLayoutIsVertical] = useState("");
  // Value of View selected for app setting (Direction of sidebar)
  const [layoutIsVertical, setLayoutIsVertical] = useState("");

  const [userThemeColor, setUserThemeColor] = useState("");
  const [themeColor, setThemeColor] = useState("");

  const [userLanguage, setUserLanguage] = useState("");
  const [viewLanguage, setViewLanguage] = useState("");

  const [requestStatus, setRequestStatus] = useState("");

  const [isChange, setIsChange] = useState(false);

  const settingId = sessionStorage.getItem("settingId");

  const handleIsChange = (e) => {
    setIsChange(e)
  }

  const audioPlayer = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
  }

  const changeThemeColor = (e) => {
    setThemeColor(e);
    themeContext.changeTheme(e);
  };

  const changeLayoutDirectionView = (e) => {
    if (e === "horizontal") {
      setLayoutIsVertical(false);
      directionLayout.changeIsVertical(false);
    } else if (e === "vertical") {
      setLayoutIsVertical(true);
      directionLayout.changeIsVertical(true);
    }
  };

  const changeLanguage = (e) => {
    setViewLanguage(e);
    // sessionStorage.setItem("language", e);
    languageContext.changeLanguage(e);
    i18n.changeLanguage(e);
  };

  const navigate = useNavigate();

  // Default Main App setting value
  useEffect(() => {
    setLayoutIsVertical(directionLayout.isVertical);
    setThemeColor(themeContext.themeColor);
    setViewLanguage(languageContext.language);
  }, [
    directionLayout.isVertical,
    themeContext.themeColor,
    languageContext.language,
  ]);

  // Save user setting
  useEffect(() => {
    setUserLayoutIsVertical(directionLayout.isVertical);
    setUserThemeColor(themeContext.themeColor);
    setUserLanguage(languageContext.language);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  useEffect(() => {

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      alert('hi')

    }
    if(isChange){
      window.addEventListener('beforeunload', handleBeforeUnload)
    }
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
}, [isChange])

  const submitAppSettings = async (e) => {
    setRequestStatus("pending");
    e.preventDefault(e);
    setIsChange(false);
    directionLayout.changeIsVertical(layoutIsVertical);
    themeContext.changeTheme(themeColor);
    languageContext.changeLanguage(viewLanguage);
    const body = {
      fkUserId: id,
      direction: layoutIsVertical ? "vertical" : "horizontal",
      themeColor: themeColor,
      language: viewLanguage,
      pkSettingId: settingId && Number(settingId)
    };
    // if (directionLayout.userLayoutExist === "")
    if (directionStorage === "") {
      // User layout not configure yet and need to add
      const settingAdded = await AppSettingApi.addOne(body);
      console.log(settingAdded)
      if (settingAdded) {
        setUserLayoutIsVertical(settingAdded.direction);
        setUserThemeColor(settingAdded.themeColor);
        setUserLanguage(settingAdded.language);

        sessionStorage.setItem("language", settingAdded.language);
        sessionStorage.setItem("layoutDirection", settingAdded.direction);
        sessionStorage.setItem("themeColor", settingAdded.themeColor);


        i18n.changeLanguage(settingAdded.language);

        setRequestStatus("success");
        playAudio();
      }
    } else {
      console.log("update")
      const settingAdded = await AppSettingApi.updateOne(body);
      console.log(settingAdded);
      if (settingAdded) {
        setUserLayoutIsVertical(settingAdded.direction);
        setUserThemeColor(settingAdded.themeColor);
        setUserLanguage(settingAdded.language);

        sessionStorage.setItem("language", settingAdded.language);
        sessionStorage.setItem("layoutDirection", settingAdded.direction);
        sessionStorage.setItem("themeColor", settingAdded.themeColor);

        i18n.changeLanguage(settingAdded.language);

        setRequestStatus("success");
        playAudio();
      } else {
        setRequestStatus("error");
      }
      // User layout configured and need to update
    }
  };

  const resetToUserLayout = (e) => {
    e && e.preventDefault();
    directionLayout.changeIsVertical(userLayoutIsVertical);
    setLayoutIsVertical(userLayoutIsVertical);
    themeContext.changeTheme(userThemeColor);
    setThemeColor(userThemeColor);
    languageContext.changeLanguage(userLanguage);
    setViewLanguage(userLanguage);

    i18n.changeLanguage(userLanguage);

    setIsChange(false)
    let timer;
    clearTimeout(timer);

    timer = setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending Message...",
      message: "Your message is on its way!",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Settings Changed Succesfully",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: "Unable to add data.",
    };
  }
  return (
    <Main>
      <form onSubmit={(e) => submitAppSettings(e)}>
        <Language
          changeLanguage={changeLanguage}
          language={viewLanguage}
          color={themeColor}
          handleIsChange = {handleIsChange}
        />

        <Themes changeThemeColor={changeThemeColor} currentTheme={themeColor} handleIsChange={handleIsChange} />

        <Layout
          layoutDirection={changeLayoutDirectionView}
          layoutIsVertical={layoutIsVertical}
          handleIsChange={handleIsChange}
        />

        <div className="md:w-10/12 w-11/12 mx-auto text-right pb-5 ar-text-left">
          <Button
            title={t("btnSave")}
            btnStyle="cyanBg"
            action="noClickAction"
          />

          <button
            onClick={(e) => {
              resetToUserLayout(e);
            }}
            className={`rounded-full text-center  text-md-xs m-2 font-semibold  border-2 py-2 px-4 border-cyan-800 border-${themeContext.themeColor} text-${themeContext.themeColor}-dark text-cyan-800 text-${themeContext.themeColor} bg-white hover:shadow-md hover:shadow-slate-500  w-32`}
          >
            {t("btnCancel")}
          </button>
          <audio ref={audioPlayer} src={NotificationSound} />
          {/* <audio ref={audioPlayer} src={NotificationSound} /> */}
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <UsePrompt when={isChange} message="Are you sure you want to exit and discard your setting changes?" userThemeColor={userThemeColor} userLayoutIsVertical={userLayoutIsVertical} userLanguage={userLanguage} />
    </Main>
  );
};

export default MainAppSettings;
