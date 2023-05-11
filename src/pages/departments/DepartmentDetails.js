import { useEffect, useState, useLayoutEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Main from "../../components/layout/Main";
import { getOne } from "../../API/DepartmentsApi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ThemeContext from "../../shop/ThemeContext";
import LanguageContext from "../../shop/LanguageContext";

import MultiSelect from "../../components/MultiSelect";
import { useTranslation } from 'react-i18next';

const DepartmentDetails = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const color = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);

  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`

  const inputStyle =
    `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor} `

  const [deptId, setDeptId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptManager, setDeptManager] = useState("");
  const [deptDescription, setDeptDesc] = useState("");
  const [checked, setChecked] = useState(true);
  const [departmentData, setDepartmentData] = useState([]);
  const [selectedSubDeps, setSelectedSubDeps] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getDepartment = async () => {
        const fetchedDept = await getOne(id);
        if (fetchedDept === null) {
          navigate("/not-found");
        } else {
          setDepartmentData(fetchedDept);
        }
      };
      getDepartment();
    }
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (Object.keys(departmentData).length !== 0) {
      setDeptId(departmentData.id);
      setDeptName(departmentData.departmentName);
      if (departmentData.status === "Active") {
        setChecked(true);
      } else {
        setChecked(false);
      }
      setCreatedDate(departmentData.creationDate);
      setDeptManager(departmentData.departmentMngr);
      setDeptDesc(departmentData.deptDescription);
      if (departmentData.selectedSubDeps) {
        setSelectedSubDeps(departmentData.selectedSubDeps);
      } else {
        setSelectedSubDeps([]);
      }
    }
  }, [departmentData]);

  return (
    <Main>
      <Card title={`${t('deptData')} ${departmentData.departmentName} `}>
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light outline-0 ${inputStyle}`}
              id="departmentId"
              placeholder={t("departmentID")}
              value={deptId}
              readOnly disabled
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="departmentId"
            >
             {t("departmentID")}
            </label>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="date"
              className={`ar-date border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="createdDate"
              placeholder={t("createdDate")}
              value={createdDate}
              readOnly disabled
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
            <input
              type="text"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="deptartmentName"
              placeholder={t('deptName')}
              value={deptName}
              readOnly disabled
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="departmentName"
            >
              {t('deptName')}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block">
            <select
              name="departmentManager"
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="departmentManager"
              value={deptManager}
              readOnly
              disabled
            >
              <option disabled value="">
                {" "}
                -- {t('selectManager')} --
              </option>
              <option value="manager 1">Department Manager 1</option>
              <option value="manager 2">Department Manager 2</option>
            </select>
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="departmentManager"
            >
              {t("departmentManager")}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row w-full inline-block">
              <MultiSelect title="SubDepartments" selectedSubDeps={selectedSubDeps} disabled={true} />

              <div className="h-5 px-2"></div>
            </div>
          <div className="form-row w-full inline-block">
            <textarea
              type="text"
              rows="7"
              className={`input-text bg-white border border-cyan-md-light ${borderColor} ${outlineColor} rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold`}
              id="departmentDescription"
              placeholder={t('description')}
              value={deptDescription}
              readOnly
              disabled
            ></textarea>
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="departmentDescription"
            >
              {t('description')}
            </label>
          </div>
          <FormGroup>
            <div className="flex text-gray-400 font-normal items-center">
              <label className={`leading-8 text-cyan-800 text-${color.themeColor} font-semibold pr-2`}>
              {t('tblHeaderStatus')}{": "}
              </label>

              <FormControlLabel
                control={<Switch checked={checked} disabled={true} color="default" className= {`bg-slate-200 bg-${color.themeColor}-light p-1 mx-1 rounded-xl`} />}
                label={checked ? t("deactive") : t("active")} className="p-1"
              />
            </div>
          </FormGroup>
        </div>
      </Card>
      <div className= {`md:w-10/12 w-11/12 mx-auto ${languageContext.language === "arabic" ? "text-left" : "text-right"}  pb-5`}>
        <Button
          title={t("btnEdit")}
          behavior="link"
          to={`/departments/edit/${id}`}
          btnStyle="cyanBg"
          action="noClickAction"
        />
        <button
            onClick={(e) => {navigate(-1); e.preventDefault()}}
            className={`rounded-full text-center  text-md-xs m-2 font-semibold  border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-cyan-800 text-${color.themeColor} text-${color.themeColor}-dark bg-white hover:shadow-md hover:shadow-slate-500  w-32`}
          >
            {t('btnCancel')}
          </button>
      </div>
    </Main>
  );
};

export default DepartmentDetails;
