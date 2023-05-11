import { useState, useEffect, useLayoutEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../../components/layout/Main";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import * as UsersApi from "../../API/UsersApi";
import NotificationSound from "../../sounds/notification-tone.mp3";
import Notification from "../../components/Notification";
import Button from "../../components/Button";
// import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import ThemeContext from "../../shop/ThemeContext";
import LoginContext from "../../shop/LoginContext";
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
// import classes from './profileSetting.module.css'
import { useTranslation } from 'react-i18next';

const ProfileSetting = () => {
    // eslint-disable-next-line
    const [t, i18n] = useTranslation();

  // set id static until prepare login and get id
  const loginContext = useContext(LoginContext);
  // const id = "002";
  const id = loginContext.userData.id;
  const audioPlayer = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
  }

  const color = useContext(ThemeContext);
  const navigate = useNavigate();

  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`

  const inputStyle =
    `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor} `

  const [emailError, setEmailError] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [personalName, setPersonalName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [imageUpload, setImageUpload] = useState("");

  const [requestStatus, setRequestStatus] = useState("");

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

  useEffect(() => {
    if (!id) {
      getUsers();
    }
  }, [id]);

  const getUsers = async () => {
    const allUsersData = await UsersApi.getAll();
    setUsersData(allUsersData);
    
  };

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const fetchedUser = await UsersApi.getOne(id);
        if (fetchedUser === null) {
          navigate("/not-found");
        } else {
          setUserDetails(fetchedUser);
          setDate(fetchedUser.creationDate);
          setPassword(fetchedUser.password)
        }
      };
      getUser();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(userDetails).length !== 0) {
      setPhone(userDetails.phone);
      setPersonalName(userDetails.personal_name);
      setAddressLine1(userDetails.addressLine1);
      setAddressLine2(userDetails.addressLine2);
      setCountry(userDetails.country);
      setCity(userDetails.city);
      setState(userDetails.state);
      setZipCode(userDetails.zipCode);
      setUserName(userDetails.userName);
      setEmail(userDetails.email);
      setPassword(userDetails.password);
      setImageUpload(userDetails.imageUpload);
    }
  }, [userDetails]);

  const inputImageAttach = (files) => {
    console.log(files)
    // setImageUploadError(false);

    if (files) {
      const fileRef = files || ""
      const fileType = fileRef.type || ""
      console.log("This file upload is of type:",fileType)
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev) => {
        // convert it to base64
        setImageUpload(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
    // if (
    //   e.type === "image/png" ||
    //   e.type === "image/gif" ||
    //   e.type === "image/jpeg" ||
    //   e.type === "image/jpg"
    // ) {
    //   setImageUploadError(false);
    //   setImageUpload(e);
    // } else {
    //   setImageUploadError(true);
    // }
  };

  const handlePersonalName = async (e) => {
    setPersonalName(e);
  };
  const handleUserPhone = async (e) => {
    setPhone(e);
  };
  const handleAddressLine1 = async (e) => {
    setAddressLine1(e);
  };

  const handleAddressLine2 = async (e) => {
    setAddressLine2(e);
  };

  const handleCountry = async (e) => {
    setCountry(e);
  };


  const handleCity = async (e) => {
    setCity(e);
  };

  const handleState = async (e) => {
    setState(e);
  };
  const handleZipCode = async (e) => {
    setZipCode(e);
  };

  const handleUserName = async (e) => {
    setUserName(e);
  };

  const handleEmail = async (e) => {
    setEmailError(false);
    usersData.map((user) => user.email === e && setEmailError(true));
    !emailError && setEmail(e);
  };
  const addUserData = async (e) => {
    e.preventDefault();
    setRequestStatus("pending");
    const body = {
      personal_name: personalName,
      phone: phone,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      country: country,
      creationDate: date,
      city: city,
      state: state,
      zipCode: zipCode,
      userName: userName,
      email: email,
      password: password,
      imageUpload
    };

    if (!emailError) {
      // Add Employee to users first then get user ID and add to

      const userUpdated = await UsersApi.updateOne(userDetails, body);
      if (userUpdated) {
        let timer;
        clearTimeout(timer);
        setRequestStatus("success");
        playAudio();
        timer = setTimeout(() => {
        // navigate("/users");
        setRequestStatus("")
        }, 3000);
      } else {
        setRequestStatus("error");
      }
    }
  };

  return (
    <Main>
      {/* <div className="md:w-10/12 w-11/12 mx-auto text-right">
      <Link
      className="bg-cyan-light rounded-full py-2 px-6 text-md-xs m-2 font-semibold hover:shadow-sm hover:shadow-slate-400 text-center"
      type="button"
      to="/profile-setting/app-settings"
    >
      <SettingsOutlinedIcon className={classes.rotate} /> App Settings
    </Link>
      </div> */}
      
      <form onSubmit={addUserData} >
        <div className={`border border-cyan-md-light border-${color.themeColor}-md-light  rounded-lg mb-5 md:w-10/12 w-11/12 mx-auto mt-2 bg-black/20`}>
          <div className="p-4 text-center mx-auto flex justify-center items-center">
            <div className="larg-icon w-16 h-16 rounded-full bg-slate-400 mx-6 cursor-pointer overflow-hidden relative">
            {imageUpload && (imageUpload.indexOf("image/") > -1) && 
            <img src={imageUpload} alt="company" className="w-full h-full"/>
            }
              <UploadOutlinedIcon className="w-7 h-7 absolute left-5 top-5 z-3 scale-100 pointer-events-none ease-in-out duration-300 bg-slate-200/30 rounded-full" />
            <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                className={`absolute top-0 bottom-0 left-0 cursor-pointer opacity-0
                 `}
                id="attachImage"
                placeholder="Attach image"
                onChange={(event) => inputImageAttach(event.target.files[0])}
              /> 
            </div>
            <div className={`text-cyan-800 text-${color.themeColor} font-semibold`}>
              {/* <BackupOutlinedIcon /> */}
              <p>{t("clickToUpload")}</p>
            </div>
          </div>
        </div>
        <Card title={t("userInfo")}>
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="personalName"
                placeholder={t("userName")}
                value={personalName}
                onChange={(event) => handlePersonalName(event.target.value)}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="personalName"
              >
                {t("userName")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="tel"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="userPhone"
                required
                placeholder={t("phone")}
                value={phone}
                onChange={(event) => handleUserPhone(event.target.value)}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="userPhone"
              >
                {t("phone")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
          </div>
        </Card>
        <Card title={t("addressInfo")}>
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={addressLine1}
                id="addressLine"
                placeholder={t("addressLine")}
                onChange={(e) => handleAddressLine1(e.target.value)}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="addressLine"
              >
                {t("addressLine")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="address2"
                value={addressLine2}
                placeholder={t("addressLine2")}
                onChange={(e) => {
                  handleAddressLine2(e.target.value);
                }}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="address2"
              >
                {t("addressLine2")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <select
                name="country"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="country"
                value={country}
                onChange={(e) => {
                  handleCountry(e.target.value);
                }}
              >
                <option disabled value="">
                  {" "}
                  -- {t("selectCountry")} --
                </option>
                <option value="country 1">Country 1</option>
                <option value="country 2">Country 2</option>
              </select>
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="country"
              >
                {t('country')}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <select
                name="City"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={city}
                onChange={(e) => handleCity(e.target.value)}
                id="city"
              >
                <option disabled value="">
                  {" "}
                  -- {t("selectCity")} --
                </option>
                <option value="city 1">City 1</option>
                <option value="city 2">City 2</option>
              </select>
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="city"
              >
                {t('city')}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="state"
                value={state}
                placeholder={t('state')}
                onChange={(e) => {
                  handleState(e.target.value);
                }}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="state"
              >
                {t('state')}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={zipCode}
                id="zipCode"
                placeholder={t("zipCode")}
                onChange={(e) => handleZipCode(e.target.value)}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="zipCode"
              >
                {t("zipCode")}
              </label>
            </div>
          </div>
        </Card>
        <Card title={t("accountInfo")}>
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={userName}
                onChange={(e) => handleUserName(e.target.value)}
                id="userName"
                placeholder={t("userName")}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="userName"
              >
                {t("userName")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                required
                className={`${
                  emailError
                    ? "border-red-800 focus-visible:outline-red-800"
                    : "border-cyan-md-light focus-visible:outline-cyan-md-light"
                } ${inputStyle}`}
                onChange={(e) => handleEmail(e.target.value)}
                value={email}
                id="email"
                placeholder={t("email")}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="email"
              >
                {t("email")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <Link
                to={`/profile-setting/change-password`}
                className="font-semibold text-md-xs underline text-blue-800"
              >
                {t("changePassword")}
              </Link>
            </div>
          </div>
        </Card>
        <div className="md:w-10/12 w-11/12 mx-auto text-right pb-5 ar-text-left">
          <Button title={t('btnSave')} btnStyle="cyanBg" action="noClickAction" />
          <button
            onClick={(e) => {navigate(-1); e.preventDefault()}}
            className={`rounded-full text-center  text-md-xs m-2 font-semibold  border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-${color.themeColor}-dark text-cyan-800 text-${color.themeColor} bg-white hover:shadow-md hover:shadow-slate-500  w-32`}
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

export default ProfileSetting;
