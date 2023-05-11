import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Main from "../../components/layout/Main";
import Button from "../../components/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ThemeContext from "../../shop/ThemeContext";
import Switch from "@mui/material/Switch";
import {
  getAll,
  addDeptartment,
  getOne,
  updateDepartment,
} from "../../API/DepartmentsApi";
import * as SubDepartments from "../../API/SubDepartmentApi";
import * as DeptApi from "../../API/DepartmentsApi";
import * as BranchApi from "../../API/BranchApi";
import Notification from "../../components/Notification";
import NotificationSound from "../../sounds/notification-tone.mp3";

import MultiSelect from "../../components/MultiSelect";
import { useTranslation } from "react-i18next";

const AddDepartments = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const { id } = useParams();
  const navigate = useNavigate();
  const color = useContext(ThemeContext);

  // const handleMultiSelectChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedSubDeps(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  const audioPlayer = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
  }
  const [idError, setIdError] = useState(false);
  const [deptId, setDeptId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptManager, setDeptManager] = useState("");
  const [subDepartment, setSubDept] = useState("");
  const [deptDescription, setDeptDesc] = useState("");
  const [checked, setChecked] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [subDeptsData, setSubDeptsData] = useState([]);
  const [selectedSubDeps, setSelectedSubDeps] = useState([]);
  const [requestStatus, setRequestStatus] = useState("");
  const [editDept, setEditDept] = useState("");
  const [allDepartments, setAllDepartments] = useState([]);
  const [headDepartment, setHeadDepartment] = useState("");

  const [allBranches, setAllBranches] = useState([]);
  const [branchSelected, setBranchSelected] = useState("");

  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`;

  const inputStyle = `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor} `;

  //get all branches
  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    const fetchedBranches = await BranchApi.getAll();
    if (fetchedBranches) {
      console.log(fetchedBranches);
      setAllBranches(fetchedBranches.data);
    }
  };

  //get all departments
  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    const fetchedDeptartments = await DeptApi.getAll();
    if (fetchedDeptartments) {
      console.log(fetchedDeptartments);
      setAllDepartments(fetchedDeptartments.data);
    }
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    setCreatedDate(currentDate);
  }, []);

  // useEffect(() => {
  //   if (!id) {
  //     getDepartments();
  //   }
  // }, [id]);
  // const getDepartments = async () => {
  //   const allDeptData = await getAll();
  //   setDepartmentData(allDeptData);
  // };

  useEffect(() => {
    if (id) {
      const getDept = async () => {
        const fetchedDepartment = await getOne(id);
        if (fetchedDepartment === null) {
          navigate("/not-found");
        } else {
          setEditDept(fetchedDepartment);
          setIsUpdating(true);
        }
      };
      getDept();
    }
  }, [id, navigate]);

  // useEffect(() => {
  //   getSubDepartments();
  // }, []);

  // const getSubDepartments = async () => {
  //   const allSubDeptData = await SubDepartments.getAll();
  //   setSubDeptsData(allSubDeptData);
  // };

  const getCurrentDate = () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    if (month < 10) {
      console.log(true);
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    console.log([year, month, day].join("-"));
    return [year, month, day].join("-");
  };
  useLayoutEffect(() => {
    if (Object.keys(editDept).length !== 0) {
      setDeptId(editDept.id);
      setDeptName(editDept.departmentName);
      if (editDept.status === "Active") {
        setChecked(true);
      } else {
        setChecked(false);
      }
      setCreatedDate(editDept.creationDate);
      setDeptManager(editDept.departmentMngr);
      setSubDept(editDept.subDepartment);
      setDeptDesc(editDept.deptDescription);
      if (editDept.selectedSubDeps) {
        setSelectedSubDeps(editDept.selectedSubDeps);
      } else {
        setSelectedSubDeps([]);
      }
    }
  }, [editDept]);

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // const inputId = (e) => {
  //   setIdError(false);
  //   departmentData.map((department) => department.id === e && setIdError(true));
  //   !idError && setDeptId(e);
  // };
  const inputDate = (e) => {
    setCreatedDate(e);
  };
  const inputDeptName = (e) => {
    setDeptName(e);
  };
  const handleDeptManager = (e) => {
    setDeptManager(e);
  };

  const deptDesc = (e) => {
    setDeptDesc(e);
  };

  const handleBranchSelected = (e) => {
    setBranchSelected(e);
  };

  const handleHeadDeptSelected = (e) => {
    setHeadDepartment(e);
  };
  const addDepartmentData = async (event) => {
    event.preventDefault();
    setRequestStatus("pending");
    const body = {
      departmentName: deptName,
      status: checked,
      departmentMngr: deptManager,
      fkBranchId: Number(branchSelected),
      fkHeadDepartmentId: headDepartment !=="" ? Number(headDepartment) : null,
      deptDescription: deptDescription,
      deptCreationDate: createdDate
    };

    if (!idError && !isUpdating) {
      const deptAdded = await DeptApi.addOne(body);
      if (deptAdded) {
        setRequestStatus("success");
        playAudio();
        const newDeptData = departmentData.concat([deptAdded]);
        setDepartmentData(newDeptData);
        resetFormData();
      } else {
        setRequestStatus("error");
      }
    } else if (isUpdating) {
      const deptUpdated = await updateDepartment(editDept, body);
      if (deptUpdated) {
        let timer;
        clearTimeout(timer);
        setRequestStatus("success");
        playAudio();
        timer = setTimeout(() => {
          navigate("/departments");
        }, 3000);
      } else {
        setRequestStatus("error");
      }
    }
  };

  const resetFormData = () => {
    setDeptId("");
    setDeptName("");
    setChecked(true);
    setDeptManager("");
    setSubDept("");
    setDeptDesc("");
    setCreatedDate("");
    setSelectedSubDeps([]);
  };

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
      <form onSubmit={addDepartmentData}>
        <Card title="Department Info">
          <div className="my-3">
            {/* <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`${
                  idError
                    ? "border-red-800 focus-visible:outline-red-800"
                    : "border-cyan-md-light focus-visible:outline-cyan-md-light"
                } ${inputStyle} ${
                  isUpdating && "bg-slate-200 cursor-not-allowed"
                }`}
                id="departmentId"
                placeholder={t("departmentID")}
                value={deptId}
                onChange={(event) => inputId(event.target.value)}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="departmentId" >
                {t("departmentID")}
              </label>
              <div className="h-5 px-2">
                {idError && !isUpdating ? (
                  <span className="block text-xxs text-red-800">
                    {t('IdExistErr')}
                  </span>
                ) : (
                  !isUpdating && (
                    <span className="block text-xxs text-green-800 italic">
                      {t('autoGeneratehint')}
                    </span>
                  )
                )}
              </div>
            </div> */}
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="date"
                className={`ar-date border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="createdDate"
                required
                placeholder={t("createdDate")}
                value={createdDate}
                onChange={(event) => inputDate(event.target.value)}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="createdDate"
              >
                {t("createdDate")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="deptartmentName"
                placeholder={t("deptName")}
                value={deptName}
                onChange={(event) => inputDeptName(event.target.value)}
                required
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="departmentName"
              >
                {t("deptName")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full  inline-block align-top">
              <select
               required
                name="companyType"
                id="branchName"
                value={branchSelected}
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light  ${inputStyle}`}
                onChange={(event) => handleBranchSelected(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- {t("selectBranch")} --
                </option>
                {allBranches.map((branch) => (
                  <option value={branch.pkBranchId} key={branch.pkBranchId}>
                    {branch.branch}
                  </option>
                ))}
              </select>
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="branchName"
              >
                {t("selectBranch")}
              </label>
              <div className="h-5 px-2"></div>
            </div>

            <div className="form-row md:w-1/2 w-full  inline-block align-top">
              <select
                name="headDept"
                id="headDept"
                value={headDepartment}
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light  ${inputStyle}`}
                onChange={(event) => handleHeadDeptSelected(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- {t("selectHeadDept")} --
                </option>
                {allDepartments.map((dept) => (
                  <option value={dept.pkDepartmentId} key={dept.pkDepartmentId}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="headDept"
              >
                {t("headDept")}
              </label>
            </div>

            <div className="form-row md:w-1/2 w-full inline-block">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="grougMngr"
                placeholder={t("departmentManager")}
                value={deptManager}
                onChange={(event) => handleDeptManager(event.target.value)}
                required
              />
              {/* <select
                name="departmentManager"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="departmentManager"
                value={deptManager}
                onChange={(event) => selectDeptManager(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- {t('selectManager')} --
                </option>
                <option value="manager 1">Department Manager 1</option>
                <option value="manager 2">Department Manager 2</option>
              </select> */}
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="departmentManager"
              >
                {t("departmentManager")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            {/* <div className="form-row w-full inline-block">
            <MultiSelect optionsData={subDeptsData} title="SubDepartments" selectedData={selectedSubDeps} handleMultiSelectChange={handleMultiSelectChange} />
              <div className="h-5 px-2"></div>
            </div> */}
            <div className="form-row w-full inline-block">
              <textarea
                type="text"
                rows="5"
                className={`input-text bg-white border border-cyan-md-light ${borderColor} ${outlineColor} rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold`}
                id="departmentDescription"
                placeholder={t("description")}
                value={deptDescription}
                onChange={(event) => deptDesc(event.target.value)}
              ></textarea>
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="departmentDescription"
              >
                {t("description")}
              </label>
            </div>
            <FormGroup>
              <div className="flex text-gray-400 font-normal items-center">
                <label
                  className={`leading-8 text-cyan-800 text-${color.themeColor} font-semibold pr-2`}
                >
                  {t("tblHeaderStatus")}
                  {": "}
                </label>

                <span className="">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        color="default"
                        className={`bg-slate-200 bg-${color.themeColor}-light p-1 mx-1 rounded-xl`}
                      />
                    }
                    label={checked ? t("active") : t("deactive")}
                    className="p-1"
                  />
                </span>
              </div>
            </FormGroup>
          </div>
        </Card>
        <div className="md:w-10/12 w-11/12 mx-auto text-right pb-5 ar-text-left">
          <Button
            title={t("btnSave")}
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
            {t("btnCancel")}
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

export default AddDepartments;
