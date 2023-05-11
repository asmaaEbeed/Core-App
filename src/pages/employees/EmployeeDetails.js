import { useEffect, useState, useLayoutEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Main from "../../components/layout/Main";
import Card from "../../components/Card";
import Button from "../../components/Button";
import * as EmployeeApi from "../../API/EmployeesApi";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from "react-i18next";

const EmployeeDetails = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();
  const color = useContext(ThemeContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [empName, setEmpName] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  // const [fileList, setFileList] = useState(null);
  const [employeeNote, setEmployeeNote] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeData, setEmployeeData] = useState([]);

  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`;

  const inputStyle = `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor} `;

  useEffect(() => {
    if (id) {
      const getEmployeeData = async () => {
        const fetchedEmployee = await EmployeeApi.getOne(id);
        if (fetchedEmployee === null) {
          navigate("/not-found");
        } else {
          setEmployeeData(fetchedEmployee);
        }
      };
      getEmployeeData();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(employeeData).length !== 0) {
      setEmpId(employeeData.id);
      setCreatedDate(employeeData.creationDate);
      setEmpName(employeeData.name);
      setEmpPhone(employeeData.phone);
      setSelectedCompany(employeeData.company);
      setSelectedGroup(employeeData.group);
      setSelectedDepartment(employeeData.department);
      setSelectedRole(employeeData.role);
      setEmployeeNote(employeeData.note);
      setAddressLine(employeeData.addressLine1);
      setAddressLine2(employeeData.addressLine2);
      setCountry(employeeData.country);
      setCity(employeeData.city);
      setZipCode(employeeData.zipCode);
      setState(employeeData.state);
      setUserName(employeeData.userName);
      setEmail(employeeData.email);
      setPassword(employeeData.password);
    }
  }, [employeeData]);

  return (
    <Main>
      <Card title={t("personalInfo")}>
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="employeeName"
              placeholder={t("employeeName")}
              value={empName}
              readOnly
              disabled
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="employeeId"
            >
              {t("employeeName")}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="tel"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="empPhone"
              required
              placeholder={t("phone")}
              value={empPhone}
              readOnly
              disabled
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="empPhone"
            >
              {t("phone")}
            </label>
            <div className="h-5 px-2"></div>
          </div>
        </div>
      </Card>
      <Card title={t("employeeInfo")}>
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="employeeId"
              placeholder={t("employeeID")}
              value={empId}
              readOnly
              disabled
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="employeeId"
            >
              {t("employeeID")}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="date"
              className={`ar-date border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="createdDate"
              required
              placeholder={t("createdDate")}
              value={createdDate}
              readOnly
              disabled
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="createdDate"
            >
              {t("createdDate")}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="company"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="company"
              value={selectedCompany}
              disabled
              readOnly
            >
              <option disabled value="">
                {" "}
                -- {t("selectCompany")} --
              </option>
              <option>{selectedCompany}</option>
            </select>
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="company"
            >
              {t('company')}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="group"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={selectedGroup}
              id="group"
              readOnly
              disabled
            >
              <option disabled value="">
                {" "}
                -- {t("selectGroup")} --
              </option>
              <option value={selectedGroup}>{selectedGroup}</option>
            </select>
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="group"
            >
              {t('group')}
            </label>
          </div>

          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="department"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={selectedDepartment}
              id="department"
              disabled
              readOnly
            >
              <option disabled value="">
                {" "}
                -- {t('selectDept')} --
              </option>
              <option value={selectedDepartment}>{selectedDepartment}</option>
            </select>
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="department"
            >
              {t('department')}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="role"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={selectedRole}
              disabled
              readOnly
              id="role"
            >
              <option disabled value="">
                {" "}
                -- {t('selectRoles')} --
              </option>
              <option value={selectedRole}>{selectedRole}</option>
            </select>
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="role"
            >
              {t('role')}
            </label>
          </div>
          <div className="form-row w-full inline-block">
            <textarea
              type="text"
              rows="4"
              className={`input-text bg-white border border-cyan-md-light ${borderColor} ${outlineColor} rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold`}
              id="employeeNote"
              placeholder={t("employeeNote")}
              value={employeeNote}
              disabled
              readOnly
            ></textarea>
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="employeeNote"
            >
              {t("employeeNote")}
            </label>
          </div>
        </div>
      </Card>
      <Card title={t("addressInfo")}>
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={addressLine}
              id="addressLine"
              placeholder={t("addressLine")}
              readOnly
              disabled
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
              value={addressLine2}
              readOnly
              disabled
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
          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="country"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="country"
              value={country}
              disabled
              readOnly
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
          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="City"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={city}
              readOnly
              disabled
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
          <div className="form-row md:w-1/2 w-full inline-block">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="state"
              value={state}
              readOnly
              disabled
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
          <div className="form-row md:w-1/2 w-full inline-block">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={zipCode}
              readOnly
              disabled
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
          <div className="form-row md:w-1/2 w-full inline-block">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={userName}
              readOnly
              disabled
              id="userName"
              placeholder={t("userName")}
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="userName"
            >
              {t("userName")}
            </label>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={email}
              readOnly
              disabled
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
          <div className="form-row md:w-1/2 w-full inline-block">
            <input
              type="password"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              value={password}
              disabled
              readOnly
              id="password"
              placeholder={t("password")}
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
          title={t('btnEdit')}
          behavior="link"
          to={`/employees/edit/${id}`}
          btnStyle="cyanBg"
          action="noClickAction"
        />
        <button
          onClick={(e) => {
            navigate(-1);
            e.preventDefault();
          }}
          className={`rounded-full text-center  text-md-xs m-2 font-semibold  border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-cyan-800 text-${color.themeColor} text-${color.themeColor}-dark bg-white hover:shadow-md hover:shadow-slate-500  w-32`}
        >
          {t('btnCancel')}
        </button>
      </div>
    </Main>
  );
};

export default EmployeeDetails;
