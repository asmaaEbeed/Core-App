import { createContext, useState, useEffect } from "react";
// import * as UserApi from "../API/UsersApi";
// import * as LoginApi from "../API/LoginApi";

const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState("");
  const userId = sessionStorage.getItem("userId");

  // useEffect(() => {
  //   const getUserData = () => {
  //     console.log(userData)
  //     if (userDataStorage) {
  //       setUserData(userDataStorage);
  //       console.log(userDataStorage)
  //       // const userDataFetched = await UserApi.getOne(userId);

  //       // if (userDataFetched !== null) {
  //       //   //skip the "Password from sending to all app" warning
  //       //   let { password: _, ...rest } = userDataFetched;
  //       //   setUserData(rest);
  //       //   setIsLogin(true)
  //       // } else {
  //       //   setUserData("");
  //       // }
  //       console.log("from if");

  //         setIsLogin(true)

  //     } else {
  //       console.log("from else");
  //       setUserData("");
  //       setIsLogin(false)

  //     }
  //   };
  //   getUserData();
  // }, [userData]);
  useEffect(() => {
    if(!userData) {
      // Wait Api from amira to get user data
      console.log("refreshed and need to get data again from server")
    }
  }, [userData]);

  const changeIsLogin = (e) => {
    setIsLogin(e);
  };
  const setUserLoginData = (e) => {
    setUserData(e);
  };

  return (
    <LoginContext.Provider
      value={{ userData, changeIsLogin, isLogin, setUserLoginData }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
