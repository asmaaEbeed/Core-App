import { useContext, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DirectionLayoutContext from "../../shop/DirectionLayoutContext";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import ThemeContext from "../../shop/ThemeContext";
import LanguageContext from "../../shop/LanguageContext";
import LoginContext from "../../shop/LoginContext";
import AlertDialog from "../AlertDialog"
import { useTranslation } from 'react-i18next';

const SidebarList = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();
  const directionLayout = useContext(DirectionLayoutContext);
  const color = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);
  const loginContext = useContext(LoginContext);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const logoutDialogContent = t("logoutConfirmation")
  const navigate = useNavigate();
  const userIsLogin = sessionStorage.getItem("userName")

  const changeToClose = (e) => {
    setDialogIsOpen(e)
  }
  const confirmLogout = () => {
    sessionStorage.clear();
    navigate("/login");
    
    loginContext.changeIsLogin(false)
    setDialogIsOpen(false);
    
    // let timer;
    // clearTimeout(timer);
    
    // timer = setTimeout(() => {
    //   navigate("/login");
    // }, 1000);
    

  }

  return (
    <div>
      <ul
        className={`${
          directionLayout.isVertical
            ? "flex-none"
            : "flex justify-around flex-wrap"
        } whitespace-nowrap sidebar-list`}
      >
        <CustomLink to="/dashboard">
          <DashboardOutlinedIcon />{" "}
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            {t("dashboard")}
          </span>
        </CustomLink>
        <CustomLink to="/company">
          <AccountBalanceOutlinedIcon />{" "}
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            {t("businessAccount")}
          </span>
        </CustomLink>
        <CustomLink to="/departments">
          <AccountTreeOutlinedIcon />{" "}
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            {t("departments")}
          </span>
        </CustomLink>

        <CustomLink to="/groups">
          <GroupOutlinedIcon />{" "}
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            {t("groups")}
          </span>
        </CustomLink>
        <CustomLink to="/employees">
          <BadgeOutlinedIcon />
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            {t("employees")}
          </span>
        </CustomLink>
        <CustomLink to="/users">
          <PersonOutlineOutlinedIcon />{" "}
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            {t("users")}
          </span>
        </CustomLink>
        <CustomLink to="/notifications">
          <NotificationsNoneOutlinedIcon />
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            {t("notifications")}
          </span>
        </CustomLink>

        <CustomLink to="/profile-setting">
          <ManageAccountsOutlinedIcon />
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            {t("profileSettings")}
          </span>
        </CustomLink>

        <CustomLink to="/app-setting">
          <SettingsOutlinedIcon />
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            {t("appSettings")}
          </span>
        </CustomLink>

        {/* <li className="pl-4 py-2 mt-px hover:bg-white hover:shadow rounded-tl-2xl rounded-bl-2xl hover:text-cyan-800 cursor-pointer">
          <SettingsOutlinedIcon /> <span className="pl-4">App Setting</span>
        </li> */}
        {userIsLogin && <li
          className={`block  py-2 mt-px hover:bg-white hover:shadow  hover:text-cyan-800 hover-text-${
            color.themeColor
          } cursor-pointer ease-in-out 
      ${
        directionLayout.isVertical
          ? `hover:rounded-tl-2xl hover:rounded-bl-2xl  ${
              languageContext.language === "arabic" ? "pr-4" : "pl-4"
            }`
          : "hover:rounded-full pl-2 pr-2"
      } duration-300 pr-2`} onClick={() => {setDialogIsOpen(true)} }
        >
          <LoginOutlinedIcon />
          <span className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}>{t("logout")}</span>
          {/* <Link
            to="/login"
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            Logout
          </Link> */}
        </li>}
        <AlertDialog dialogIsOpen={dialogIsOpen} changeToClose={changeToClose} title="" content={logoutDialogContent} btnCancelTitle={t("btnCancel")} btnAgreeTitle={t("btnLogout")} confirmDialog={confirmLogout} />


        {/* <CustomLink to="/login">
          <LoginOutlinedIcon />
          <span
            className={`${
              directionLayout.isVertical
                ? `${languageContext.language === "arabic" ? "pr-5" : "pl-4"}`
                : "pl-0"
            }`}
          >
            {" "}
            Log Out
          </span>
        </CustomLink> */}
      </ul>
    </div>
  );
};

const CustomLink = ({ to, children, ...props }) => {
  // const path = window.location.pathname;
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: false });
  const directionLayout = useContext(DirectionLayoutContext);
  const color = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);

  // `${directionLayout.isVertical ? `${lang.language === "arabic" ? "pr-4" : "pl-4"} ` : "pl-0"}`
  return (
    <li
      className={`block  py-2 mt-px hover:bg-white hover:shadow  hover:text-cyan-800 hover-text-${
        color.themeColor
      } cursor-pointer ease-in-out 
      ${
        directionLayout.isVertical
          ? `hover:rounded-tl-2xl hover:rounded-bl-2xl  ${
              languageContext.language === "arabic" ? "pr-4" : "pl-4"
            }`
          : "hover:rounded-full pl-2 pr-2"
      } duration-300 ${
        isActive
          ? `bg-white shadow text-cyan-800 text-${
              color.themeColor
            } text-active-${color.themeColor} ${
              directionLayout.isVertical
                ? `pl-4 rounded-tl-2xl rounded-bl-2xl`
                : "rounded-full pl-2 pr-2"
            }`
          : ""
      }`}
    >
      <Link to={to} style={{ display: "block" }}>
        {children}
      </Link>
    </li>
  );
};

export default SidebarList;
