import { useState, useEffect, useLayoutEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Main from "../../components/layout/Main";
import Button from "../../components/Button";
import * as UsersApi from "../../API/UsersApi";
import * as CompaniesApi from "../../API/CompaniesApi";
import NotificationSound from "../../sounds/notification-tone.mp3";
import Notification from "../../components/Notification";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

const AddUser = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const { id } = useParams();
  const navigate = useNavigate();
  const color = useContext(ThemeContext);

  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }

  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`

  const inputStyle =
    `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor} `

  const [isUpdating, setIsUpdating] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usersData, setUsersData] = useState([]);
  // const [userId, setUserId] = useState("");
  // const [createdDate, setCreatedDate] = useState("");
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

  const [requestStatus, setRequestStatus] = useState("");
  const [editUser, setEditUser] = useState("");

  const [businessData, setBusinessData] = useState([]);
  const [businessId, setBusinessId] = useState("");


  useEffect(() => {

    getCompanies();
  },[])

  const getCompanies = async () => {
    const fetchedCompany = await CompaniesApi.getAll();
    if(fetchedCompany) {
      setBusinessData(fetchedCompany.data)
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
          setEditUser(fetchedUser);
          setIsUpdating(true);
        }
      };
      getUser();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(editUser).length !== 0) {
      setPhone(editUser.phone);
      setPersonalName(editUser.personal_name);
      setAddressLine1(editUser.addressLine1);
      setAddressLine2(editUser.addressLine2);
      setCountry(editUser.country);
      setCity(editUser.city);
      setState(editUser.state);
      setZipCode(editUser.zipCode);
      setUserName(editUser.userName);
      setEmail(editUser.email);
      setPassword(editUser.password);

    }
  }, [editUser])

  const handleSelectBusiness = (e) => {
    setBusinessId(e);
  }

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

  const handlePassword = async (e) => {
    setPassword(e);
  };

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  var today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const addUserData = async (e) => {
    e.preventDefault();
    setRequestStatus("pending");
    const body = {
      personalName: personalName,
      userEmail: email,
      userUserName: userName,
      userPassword: password,
      userCreationDate: date,
      fkBusinessAccountId: businessId,
      phone: phone,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      country: country,
      city: city,
      state: state,
      zipCode: zipCode,
    }

    if (!emailError && !isUpdating) {
      // Add Employee to users first then get user ID and add to 
      const userAdded = await UsersApi.addOne(body);
      if (userAdded) {
        setRequestStatus("success");
        playAudio();
        const newUserData = usersData.concat([userAdded]);
        setUsersData(newUserData);
        // resetFormData();
      } else {
        setRequestStatus("error");
      }
    } else if (isUpdating) {
      const userUpdated = await UsersApi.updateOne(editUser, body);
      if (userUpdated) {
        let timer;
        clearTimeout(timer);
        setRequestStatus("success");
        playAudio();
        timer = setTimeout(() => {
          navigate("/users");
        }, 3000);
      } else {
        setRequestStatus("error");
      }
    }

  };

  return (
    <Main>
      <form onSubmit={addUserData}>
      <Card title={t("businessInfo")}>
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
            <select
                name="companyType"
                id="companyType"
                value={businessId}
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light  ${inputStyle}`}
                onChange={(event) => handleSelectBusiness(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- {t('selectBusinessName')} --
                </option>
                {businessData.map((business) => (
                  <option value={business.pkBusinessAccountId} key={business.pkBusinessAccountId}>
                  {business.businessAccountName}
                </option>
                ))}
                </select>
              <div className="h-5 px-2"></div>
            </div>
          </div>
        </Card>
        <Card title={t("userInfo")}>
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="personalName"
                placeholder={t("personalName")}
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
                onChange={(e) => handleAddressLine1(e.target.value)}
                id="addressLine"
                placeholder={t("addressLine")}
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
                onChange={(e) => {
                  handleAddressLine2(e.target.value);
                }}
                placeholder={t("addressLine2")}
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
                onChange={(e) => handleCity(e.target.value)}
                value={city}
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
                onChange={(e) => {
                  handleState(e.target.value);
                }}
                placeholder={t('state')}
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
                onChange={(e) => handleZipCode(e.target.value)}
                id="zipCode"
                placeholder={t("zipCode")}
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
                onChange={(e) => handleUserName(e.target.value)}
                value={userName}
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
                } ${inputStyle} ${
                  isUpdating && "bg-slate-200 cursor-not-allowed"
                }`}
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
              <div className="h-5 px-2">
              {(emailError && !isUpdating) && (
                  <span className="block text-xxs text-red-800">
                    {t("emailExistErr")}
                  </span>
                ) }
              </div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="password"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                onChange={(e) => handlePassword(e.target.value)}
                value={password}
                id="password"
                placeholder={t("password")}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="password"
              >
                {t("password")}
              </label>
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

export default AddUser;
