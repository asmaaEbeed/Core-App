import { useEffect, useState, useLayoutEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Main from "../../components/layout/Main";
import * as UsersApi from "../../API/UsersApi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

const UserDetails = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const { id } = useParams();
  const navigate = useNavigate();
  const color = useContext(ThemeContext);

  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`

  const inputStyle =
    `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor} `


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

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const fetchedUser = await UsersApi.getOne(id);
        if (fetchedUser === null) {
          navigate("/not-found");
        } else {
          setUserDetails(fetchedUser);
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
    }
  }, [userDetails]);

  return (
    <Main>
        <Card title={t("userInfo")}>
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="personalName"
                placeholder={t("userName")}
                value={personalName} readOnly disabled
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
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
                value={phone} readOnly disabled
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
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
                value={addressLine1} readOnly disabled
                id="addressLine"
                placeholder={t("addressLine")}
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
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
                value={addressLine2} readOnly disabled
                placeholder={t("addressLine2")}
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
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
                value={country} readOnly disabled
              >
                <option value="country 1">Country 1</option>
                <option value="country 2">Country 2</option>
              </select>
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
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
                readOnly disabled
                value={city}
                id="city"
              >
                <option value="city 1">City 1</option>
                <option value="city 2">City 2</option>
              </select>
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
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
                value={state} readOnly disabled
                placeholder={t('state')}
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
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
                value={zipCode} readOnly disabled
                id="zipCode"
                placeholder={t("zipCode")}
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
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
                value={userName} readOnly disabled
                id="userName"
                placeholder={t("userName")}
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
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
                  "border-cyan-md-light focus-visible:outline-cyan-md-light"
                } ${inputStyle}`} disabled readOnly
                value={email}
                id="email"
                placeholder={t("email")}
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="email"
              >
                {t("email")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="password"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                value={password}
                id="password"
                placeholder={t("password")} readOnly disabled
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="password"
              >
                {t("password")}
              </label>
            </div>
          </div>
        </Card>
        <div className="md:w-10/12 w-11/12 mx-auto text-right pb-5 ar-text-left">
        <Button
          title={t("btnEdit")}
          behavior="link"
          to={`/users/edit/${id}`}
          btnStyle="cyanBg"
          action="noClickAction"
        />
        <button
            onClick={(e) => {navigate(-1); e.preventDefault()}}
            className={`rounded-full text-center  text-md-xs m-2 font-semibold  border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-${color.themeColor}-dark text-cyan-800 text-${color.themeColor} bg-white hover:shadow-md hover:shadow-slate-500  w-32`}
          >
            {t('btnCancel')}
          </button>
      </div>
    </Main>
  );
};

export default UserDetails;
