import React, { useState, useEffect, useRef, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import validator from "validator";
import Main from "../../components/layout/Main";
import Card from "../../components/Card";
import Button from "../../components/Button";
import * as UsersApi from "../../API/UsersApi";
import NotificationSound from "../../sounds/notification-tone.mp3";
import Notification from "../../components/Notification";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  // const { id } = useParams();
  const id = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const color = useContext(ThemeContext);

  const audioPlayer = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
  }

  const [userDetails, setUserDetails] = useState("");
  const [password, setPassword] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [currentPassErr, setCurrentPassErr] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPassErr, setNewPassErr] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState(false);

  const [requestStatus, setRequestStatus] = useState("");

  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`

  const inputStyle =
    `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor} `

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const fetchedUser = await UsersApi.getOne(id);
        if (fetchedUser !== null) {
          setUserDetails(fetchedUser);
          setPassword(fetchedUser.password);
        }
      };
      getUser();
    }
  }, [id]);

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const currentPassValidate = (e) => {
    if (e === password) {
      setCurrentPassErr(false);
    } else {
      setCurrentPassErr(true);
    }
  };

  const handleCurrentPass = (e) => {
    setCurrentPass(e);
  };

  const newPassValidate = (e) => {
    if (
      validator.isStrongPassword(e, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      // setErrorMessage('Is Strong Password')
      setNewPassErr(false);
    } else {
      // setErrorMessage('Is Not Strong Password')
      setNewPassErr(true);
    }
  };

  const handleNewPass = (e) => {
    setNewPassword(e);
  };

  const confirmPassValidate = (e) => {
    if(e === newPassword){
      setConfirmPassErr(false)
    } else{
      setConfirmPassErr(true)
    }
  };

  const handleConfirmPass = (e) => {
      setConfirmPassword(e);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if(!currentPassErr && !newPassErr && !confirmPassErr) {
      setRequestStatus("pending");
      const body = {...userDetails, password: newPassword}
      const userUpdated = await UsersApi.updateOne(userDetails, body);
      if (userUpdated) {
        let timer;
        clearTimeout(timer);
        setRequestStatus("success");
        playAudio();
        timer = setTimeout(() => {
          navigate("/profile-setting");
        }, 3000);
      } else {
        setRequestStatus("error");
      }
    }
  }
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
      message: "Company Data Added Succesfully",
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
      <form onSubmit={changePassword}>
      <Card title={t("changePassword")}>
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full mx-auto block align-top">
            <input
              type="password"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={currentPass}
              onChange={(e) => handleCurrentPass(e.target.value)}
              onBlur={(e) => currentPassValidate(e.target.value)}
              id="currentPassword"
              placeholder={t("currentPassword")}
            />
            <label
              className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="currentPassword"
            >
              {t("currentPassword")}
            </label>
            <div className="h-5 px-2">
              {currentPassErr && (
                <span className="block text-xxs text-red-800">
                  {t("currentPasswordErr")}
                </span>
              )}
            </div>
          </div>
          <div className="form-row md:w-1/2 w-full mx-auto block align-top">
            <input
              type="password"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={newPassword}
              onChange={(e) => handleNewPass(e.target.value)}
              onBlur={(e) => newPassValidate(e.target.value)}
              id="newPassword"
              placeholder={t("newPassword")}
            />
            <label
              className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="newPassword"
            >
              {t("newPassword")}
            </label>
              {newPassErr ? (
            <div className="px-2">
              
                  <span className="block text-xxs text-red-800">
                  {t("newPasswordErr")}
                  
                  </span>
            </div>
              ): (<div className="h-5 px-2"></div>)}
          </div>
          <div className="form-row md:w-1/2 w-full mx-auto block align-top">
            <input
              type="password"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={confirmPassword}
              onChange={(e) => handleConfirmPass(e.target.value)}
              onBlur={(e) => confirmPassValidate(e.target.value)}
              id="confirmPassword"
              placeholder={t("confirmPassword")} />
            <label
              className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="confirmPassword"
            >
              {t("confirmPassword")}
            </label>
            <div className="h-5 px-2">
              {
                confirmPassErr && <span className="block text-xxs text-red-800">{t("confirmPasswordErr")}</span>
              }
            </div>
          </div>
        </div>
      </Card>
      <div className="md:w-10/12 w-11/12 mx-auto text-right pb-5 ar-text-left">
          <Button title={t('btnSave')} btnStyle="cyanBg" action="noClickAction"/>
          <button
            onClick={(e) => {navigate(-1); e.preventDefault()}}
            className={`rounded-full text-center  text-md-xs m-2 font-semibold  border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-cyan-800 text-${color.themeColor} bg-white hover:shadow-md hover:shadow-slate-500  w-32`}
          >
            {t('btnCancel')}
          </button>
          <audio ref={audioPlayer} src={NotificationSound} />
        </div>
        </form>
        {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </Main>
  );
};

export default ChangePassword;
