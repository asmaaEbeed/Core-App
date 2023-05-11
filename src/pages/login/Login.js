import { useState, useContext } from "react";
import { toast } from "react-toastify";
// import * as UserApi from "../../API/UsersApi";
import * as LoginApi from "../../API/LoginApi";
import * as AppSettingApi from "../../API/AppSettingApi";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../shop/LoginContext";
import ThemeContext from "../../shop/ThemeContext";
import LanguageContext from "../../shop/LanguageContext";
import DirectionLayoutContext from "../../shop/DirectionLayoutContext";
import classes from './login.module.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const loginContext = useContext(LoginContext);
  const themeContext = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);
  const directionLayoutContext = useContext(DirectionLayoutContext);

  const navigate = useNavigate();

  const handleUserName = (e) => {
    setUserName(e);
  };
  const handlePassword = (e) => {
    setPassword(e);
  };

  const validation = () => {
    let result = true;
    if (userName === "" || userName === null) {
      result = false;
      toast.warning("Please Enter UserName");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  let loginBody = {
    username: userName,
    password
  }

  const proceedLogin = async (e) => {
    e.preventDefault();
    if (validation()) {
      console.log("proceed");
      // const userExist = await isUserNameExist(userName);
      const loginVerify = await isLoginVerify(loginBody);
      console.log("loginVerify");
      console.log(loginVerify);

      if(loginVerify) {
        loginContext.changeIsLogin(true);
        loginContext.setUserLoginData(loginVerify.user)
        sessionStorage.setItem("userId", loginVerify.user.pkUserId);
        sessionStorage.setItem("userName", loginVerify.user.userUserName);
        // sessionStorage.setItem("image", loginVerify.user.userImage);
        sessionStorage.setItem("token", loginVerify.token);
        const userAppSettings = await getAppSettings(loginVerify.user.pkUserId);
        console.log(userAppSettings);
        if(userAppSettings) {
          themeContext.changeTheme(userAppSettings.themeColor);
          sessionStorage.setItem("themeColor", userAppSettings.themeColor);

          languageContext.changeLanguage(userAppSettings.language);
          sessionStorage.setItem("language", userAppSettings.language);

          directionLayoutContext.changeIsVertical(userAppSettings.direction === "vertical" ? true : false);
          sessionStorage.setItem("direction", userAppSettings.direction);

          sessionStorage.setItem("settingId", userAppSettings.pkSettingId);

        }
        navigate("/");
      } else {
        toast.error("Please enter valid email and password.");
      }

      // if (userExist) {
      //   console.log(userExist);
      //   if (userExist.password === password) {
      //     console.log("Login success");
      //     loginContext.changeIsLogin(true);
          
      //     sessionStorage.setItem("userId", userExist.id);

      //     navigate("/");
      //     // let timer;
      //     // clearTimeout(timer);
      //     // timer = setTimeout(() => {
      //     // navigate("/");
      //     // }, 500);
      //   } else {
      //     toast.error("Please enter valid email and password.");
      //   }
      // } else {
      //   toast.error("Please enter valid email and password.");
      // }
    }
  };

  const isLoginVerify = async (e) => {
    const userData = await LoginApi.loginVerify(e);
    return userData
  }
  const getAppSettings = async (e) => {
    const appSettings = await AppSettingApi.getOne(e);
    return appSettings
  }

  // const isUserNameExist = async (e) => {
  //   const allUsers = await UserApi.getAll();
  //   let userExist;
  //   console.log(allUsers);
  //   allUsers.map((user) => user.userName === e && (userExist = user));
  //   if (userExist) {
  //     return userExist;
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <div className={classes.loginWrapper}>
      <form onSubmit={proceedLogin}>
        <div  className={`text-center mx-auto my-auto md:w-1/3 w-3/4 ${classes.pt7per}`}>
        <div className=" overflow-hidden leading-3 text-center mx-auto pt-2">
        {/* <PersonOutlineOutlinedIcon fontSize="large" className="text-white" /> */}
        <AccountCircleSharpIcon  className={`text-white/[0.5] ${classes.personIcon}`} />
          </div>
          <h2 className={`${classes.welcomeTitle} text-white`}>
            WELCOME BACK
          </h2>
          <h5 className={`${classes.loginTitle} text-white/[0.5]`}>
            user login
          </h5>
          <div className="">
            <div className="form-row w-full inline-block align-top relative">
              <input
                type="text"
                className={`px-9 py-1 focus-visible:outline-none  w-full ${classes.inputLogin}`}
                id="userName"
                value={userName}
                onChange={(event) => handleUserName(event.target.value)}
              />
              <EmailIcon className={`absolute left-2 text-white top-2`} />
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block align-top relative">
              <input
                type="password"
                className={`pl-9 py-1 focus-visible:outline-none w-full ${classes.inputLogin}`}
                id="password"
                value={password}
                onChange={(event) => handlePassword(event.target.value)}
              />
              <label
                className={`label-helper text-cyan-800 font-normal`}
                htmlFor="password"
              >
                Password
              </label>
              <LockIcon className={`absolute left-2 text-white top-2`} />
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block align-top">
            {/* <Button title="Login" btnStyle="cyanBg" action="noClickAction" /> */}
            <button type="submit" className={`${classes.submitBtn} py-1`}>Login</button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-3/4 mx-auto text-right pb-5 ar-text-left">
          {/* <Button title="Login" btnStyle="cyanBg" action="noClickAction" /> */}
          {/* <button
            onClick={(e) => {
              navigate(-1);
              e.preventDefault();
            }}
            className={`rounded-full text-center  text-md-xs m-2 font-semibold  border-2 py-2 px-4 border-cyan-800  text-cyan-800 bg-white hover:shadow-md hover:shadow-slate-500  w-32`}
          >
            Cancel
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
