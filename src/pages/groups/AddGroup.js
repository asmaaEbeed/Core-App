import { useState, useEffect, useLayoutEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Main from "../../components/layout/Main";
import Button from "../../components/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import * as GroupsApi from "../../API/GroupsApi";
import * as EmployeesApi from "../../API/EmployeesApi";
import MultiSelect from "../../components/MultiSelect";
import Notification from "../../components/Notification";
import NotificationSound from "../../sounds/notification-tone.mp3";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';


const AddGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const color = useContext(ThemeContext);
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [idError, setIdError] = useState(false);
  const [groupsData, setGroupsData] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupManager, setGroupManager] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedGrpMember, setSelectedGrpMember] = useState([]);
  /*Prepare employees for multiselect*/
  const [selectEmployeesList, setSelectEmployeesList] = useState([]);
  const [groupDescription, setGroupDescription] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [editGroup, setEditGroup] = useState("");

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`
  
  const inputStyle =
    `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor} `;

  useEffect(() => {
    if (!id) {
      getGroups();
    }
    getEmployees();
  }, [id]);

  const audioPlayer = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
  }

  const getGroups = async () => {
    const allGroupsData = await GroupsApi.getAll();
    setGroupsData(allGroupsData);
  };
  const getEmployees = async () => {
    const allEmployeesData = await EmployeesApi.getAll();
    setAllEmployees(allEmployeesData);
  };

  useEffect(() => {
    if (id) {
      const getGroup = async () => {
        const fetchedGroup = await GroupsApi.getOne(id);
        if (fetchedGroup === null) {
          navigate("/not-found");
        } else {
          setEditGroup(fetchedGroup);
          setIsUpdating(true);
        }
      };
      getGroup();
    }
  }, [id, navigate]);

  useEffect(() => {
    const currentDate = getCurrentDate();
    setCreatedDate(currentDate);
  }, []);

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
    if (Object.keys(editGroup).length !== 0) {
      setGroupId(editGroup.id);
      setGroupName(editGroup.groupName);
      setCreatedDate(editGroup.creationDate);
      setGroupDescription(editGroup.groupDescription);
      setSelectedGrpMember(editGroup.groupMembers);
      setGroupManager(editGroup.groupManager);
      if (editGroup.status === "Active") {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  }, [editGroup]);
  // Prepare data of employees for multi select (id, value, label)
  useEffect(() => {
    addEmployessListItems();
  }, []);
  const addEmployessListItems = async () => {
    const allEmployeesData = await EmployeesApi.getAll();
    let selectEmployeeListItem = [];
    if (allEmployeesData.length > 0) {
      allEmployeesData.map((employee) =>
        selectEmployeeListItem.push({
          id: employee.id,
          value: employee.name,
          label: employee.name,
        })
      );
      setSelectEmployeesList(selectEmployeeListItem);
    }
  };

  // const inputId = (e) => {
  //   setIdError(false);
  //   groupsData.map((group) => group.id === e && setIdError(true));
  //   !idError && setGroupId(e);
  // };
  const inputDate = (e) => {
    setCreatedDate(e);
  };
  const inputGroupName = (e) => {
    setGroupName(e);
  };
  const handleGroupManager = (e) => {
    setGroupManager(e);
  };

  // const handleMultiSelectChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedGrpMember(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };
  const groupDesc = (e) => {
    setGroupDescription(e);
  };

  const addGroupData = async (e) => {
    setRequestStatus("pending");
    e.preventDefault();
    const body = {
      groupName: groupName,
      groupStatus: checked,
      groupManager: groupManager,
      groupDescription: groupDescription,
      groupCreationDate: createdDate,
      // groupMembers: selectedGrpMember,
      // NoOfMembers: selectedGrpMember.length,
    };
    if (!idError && !isUpdating) {
      const groupAdded = await GroupsApi.addOne(body);
      if (groupAdded) {
        setRequestStatus("success");
        playAudio();
        // const newGroupData = groupsData.concat([groupAdded]);
        // setGroupsData(newGroupData);
        resetFormData();
      } else {
        setRequestStatus("error");
      }
    } else if (isUpdating) {
      const groupUpdated = await GroupsApi.updateGroup(editGroup, body);
      if (groupUpdated) {
        let timer;
        clearTimeout(timer);
        setRequestStatus("success");
        playAudio();
        timer = setTimeout(() => {
          navigate("/groups");
        }, 3000);
      } else {
        setRequestStatus("error");
      }
    }
  };
  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const resetFormData = () => {
    setGroupId("");
    setGroupName("");
    setChecked(true);
    setGroupManager("");
    setGroupDescription("");
    setCreatedDate("");
    setSelectedGrpMember([]);
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
      <form onSubmit={addGroupData}>
        {/* Group Info */}
        <Card title={t("groupInfo")}>
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
                id="groupId"
                placeholder={t("groupId")}
                value={groupId}
                onChange={(event) => inputId(event.target.value)}
                readOnly={isUpdating}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="groupId"
              >
                {t("groupId")}
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
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="groupName"
                placeholder={t("groupName")}
                value={groupName}
                onChange={(event) => inputGroupName(event.target.value)}
                required
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="groupName"
              >
                {t("groupName")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="grougMngr"
                placeholder={t("groupManager")}
                value={groupManager}
                onChange={(event) => handleGroupManager(event.target.value)}
                required
              />
              {/* <select
                name="groupManager"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="groupManager"
                value={groupManager}
                onChange={(event) => selectGroupManager(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- {t('selectManager')} --
                </option>
                {allEmployees.map(
                  (employee) =>
                    employee.role === "manager" && (
                      <option value={employee.name} key={employee.id}>
                        {employee.name}
                      </option>
                    )
                )}
              </select> */}
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="groupManager"
              >
                {t('groupManager')}
              </label>
              <div className="h-5 px-2"></div>
            </div>

            {/* <div className="form-row w-full inline-block align-top">
              <MultiSelect
                optionsData={selectEmployeesList}
                title="Employees"
                selectedData={selectedGrpMember}
                handleMultiSelectChange={handleMultiSelectChange}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="groupMembers"
              >
                {t('groupMember')}
              </label>
              <div className="h-5 px-2"></div>
            </div> */}
            <div className="form-row w-full inline-block align-top">
              <textarea
                type="text"
                rows="7"
                className={`input-text bg-white border border-cyan-md-light ${borderColor} rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light ${outlineColor}  w-96-percent text-slate-700 text-md-xs font-semibold`}
                id="groupDescription"
                placeholder={t('description')}
                value={groupDescription}
                onChange={(event) => groupDesc(event.target.value)}
              ></textarea>
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="groupDescription"
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
                  control={<Switch checked={checked} onChange={handleChange} color="default" className= {`bg-slate-200 bg-${color.themeColor}-light p-1 mx-1 rounded-xl`}  />}
                  label={checked ? t("deactive") : t("active")} className= "p-1"
                />
              </div>
            </FormGroup>
          </div>
        </Card>
        <div className="md:w-10/12 w-11/12 mx-auto text-right pb-5 ar-text-left">
          <Button title={t('btnSave')} btnStyle="cyanBg" action="noClickAction" />
          {/* <Button
            behavior="link"
            to="/groups"
            title="Cancel"
            btnStyle="cyan-outline"
          /> */}
          <button
            onClick={(e) => {navigate(-1); e.preventDefault()}}
            className={`rounded-full text-center  text-md-xs m-2 font-semibold  border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-cyan-800 text-${color.themeColor}-dark  text-${color.themeColor} bg-white hover:shadow-md hover:shadow-slate-500  w-32`}
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

export default AddGroup;
