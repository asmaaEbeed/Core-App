import { useContext } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SidebarList from "./SidebarList";
import ToggleMenuProvider from "../../shop/ToggleMenuContext";
import DirectionLayoutContext from "../../shop/DirectionLayoutContext";
import ThemeContext from "../../shop/ThemeContext";
import LanguageContext from "../../shop/LanguageContext";
import LoginContext from "../../shop/LoginContext";
import Search from "./Search";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();
  const menuContext = useContext(ToggleMenuProvider);
  const directionLayout = useContext(DirectionLayoutContext);
  const languageContext = useContext(LanguageContext);
  const loginContext = useContext(LoginContext);
  const color = useContext(ThemeContext);
  const userName = sessionStorage.getItem("userName")

  return (
    <>
      {directionLayout.isVertical !== "" ? (
        <div
          className={`ease-in-out duration-300 border-transparent border rounded-3xl 
    ${
      directionLayout.isVertical
        ? `absolute ${
            languageContext.language === "arabic" ? "right-4" : "left-4"
          }   top-3 min-h-[calc(100vh-24px)]  pt-3  ${
            menuContext.menuOpen ? " w-48" : "w-16"
          }`
        : "relative w-96-percent -mt-24 opacity-90 m-auto"
    }  bg-cyan-light bg-${color.themeColor}-light`}
        >
          <div
            className={`${
              directionLayout.isVertical
                ? "text-center"
                : "flex justify-between items-center mx-5"
            }`}
          >
            {/* Logo div */}
            <div className="text-cyan-800 font-extrabold">LOGO</div>
            {/* profile data */}

            {!directionLayout.isVertical && (
              <div>
                <Search />
              </div>
            )}

            {directionLayout.isVertical ? (
              <div>
                <div className=" w-12 mx-auto h-12 mt-2 rounded-full border-2 border-emerald-300 p-2px">
                  <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden text-slate-800 text-9xl leading-3 border border-slate-200">
                    {loginContext.userData &&
                    loginContext.userData.imageUpload ? (
                      loginContext.userData.imageUpload.indexOf("image/") >
                        -1 && (
                        <img
                          src={loginContext.userData.imageUpload}
                          alt="company"
                          className="w-full h-full"
                        />
                      )
                    ) : (
                      <PersonIcon fontSize="large" />
                    )}
                  </div>
                </div>

                {menuContext.menuOpen && (
                  <div>
                    <h3 className="font-semibold text-slate-500 mt-2">
                      {userName
                        ? `${
                            userName && t("loginWelcome")
                          } `
                        : ""}
                    </h3>
                    <h5
                      className={`font-semibold ${
                        color.themeColor.includes("Dark", 0)
                          ? "text-slate-300"
                          : "text-slate-800"
                      }  text-sm`}
                    >
                      {/* {loginContext.userData.userName ? (
                        loginContext.userData.userName
                      ) : (
                        <Link to="/login">{t("login")}</Link>
                      )} */}
                      {userName ? (
                        userName
                      ) : (
                        <Link to="/login">{t("login")}</Link>
                      )}
                    </h5>
                  </div>
                )}
              </div>
            ) : (
              <div className="items-center flex">
                <div className=" w-12 mx-1 h-12 mt-2 rounded-full border-2 border-emerald-300 p-2px inline-block ">
                  <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden text-slate-800 text-9xl leading-3 border border-slate-200">
                    {loginContext.userData &&
                    loginContext.userData.imageUpload ? (
                      loginContext.userData.imageUpload.indexOf("image/") >
                        -1 && (
                        <img
                          src={loginContext.userData.imageUpload}
                          alt="company"
                          className="w-full h-full"
                        />
                      )
                    ) : (
                      <PersonIcon fontSize="large" />
                    )}
                  </div>
                </div>

                <div className="inline-block">
                  {/* {(loginContext.userData) &&  `${loginContext.userData.userName && <h3 className="font-semibold text-slate-500 mt-2">Welcome back,</h3>} `} */}
                  {userName
                    ? userName && (
                        <h3 className="font-semibold text-slate-500 mt-2">
                          {t("loginWelcome")}
                        </h3>
                      )
                    : ""}
                  <h5
                    className={`font-semibold ${
                      color.themeColor.includes("Dark", 0)
                        ? "text-slate-200"
                        : "text-slate-800"
                    }  text-sm`}
                  >
                    {userName ? (
                      userName
                    ) : (
                      <Link to="/login">{t("login")}</Link>
                    )}
                  </h5>
                </div>
              </div>
            )}
          </div>
          {/* List Item */}
          <div
            className={`font-semibold text-slate-800 text-md-xs overflow-hidden ${
              directionLayout.isVertical ? "mt-4 " : "my-2"
            } ${menuContext.menuOpen ? " pl-3" : "pl-1"} `}
          >
            <SidebarList />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Sidebar;
