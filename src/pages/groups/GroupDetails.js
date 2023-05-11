import { useEffect, useState, useLayoutEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Main from "../../components/layout/Main";
import * as GroupsApi from "../../API/GroupsApi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

import MultiSelect from "../../components/MultiSelect";

const GroupDetails = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const { id } = useParams();
  const navigate = useNavigate();
  const color = useContext(ThemeContext);
  
  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`

  const inputStyle =
    `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor} `


  const [groupId, setGroupId] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupManager, setGroupManager] = useState("");
  const [selectedGrpMember, setSelectedGrpMember] = useState([]);
  const [groupDescription, setGroupDescription] = useState("");
  const [editGroup, setEditGroup] = useState("");

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (id) {
      const getGroup = async () => {
        const fetchedGroup = await GroupsApi.getOne(id);
        if (fetchedGroup === null) {
          navigate("/not-found");
        } else {
          setEditGroup(fetchedGroup);
        }
      };
      getGroup();
    }
  }, [id, navigate]);

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

  return (
    <Main>
      <Card title={`${t('groupDataInfo')} ${editGroup.groupName} `}>
        <div className="my-3">
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`mb-2 border-cyan-md-light focus-visible:outline-cyan-md-light outline-0 ${inputStyle}`}
              id="departmentId"
              placeholder="Department-ID"
              value={groupId}
              readOnly
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="groupId"
            >
              {t("groupId")}
            </label>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top mb-2">
            <input
              type="date"
              className={`ar-date mb-2 border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              id="createdDate"
              required
              placeholder="created Date"
              value={createdDate}
              readOnly
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="createdDate"
            >
              {t("createdDate")}
            </label>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top mb-2">
              <input
                type="text"
                className={`mb-2 border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="groupName"
                placeholder={t("groupName")}
                value={groupName}
                required
                readOnly
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="groupName"
              >
                {t("groupName")}
              </label>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top mb-2">
              <select
                name="groupManager"
                className={`mb-2 border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="groupManager"
                value={groupManager}
                readOnly disabled
              >
                <option >
                  {groupManager}
                </option>
                
              </select>
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="groupManager"
              >
                {t('groupManager')}
              </label>
            </div>
            <div className="form-row w-full inline-block align-top">
              <MultiSelect
                title="Employees"
                selectedData={selectedGrpMember} disabled={true}
              />
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="groupMembers"
              >
                {t('groupMember')}
              </label>
              <div className="h-5 px-2"></div>

            </div>
            <div className="form-row w-full inline-block align-top">
              <textarea
                type="text"
                rows="7"
                className={`input-text bg-white border border-cyan-md-light ${borderColor} ${outlineColor} rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-700 text-md-xs font-semibold`}
                id="groupDescription"
                placeholder={t('description')}
                value={groupDescription}
                readOnly disabled
              ></textarea>
              <label
                className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="groupDescription"
              >
                {t('description')}
              </label>
            </div>
            <FormGroup>
              <div className="flex text-gray-400 font-normal">
                <label className={`leading-8 text-cyan-800 text-${color.themeColor} font-semibold pr-2`}>
                {t('tblHeaderStatus')}{": "}
                </label>

                <FormControlLabel
                  control={<Switch checked={checked} disabled />}
                  label={checked ? t("deactive") : t("active")}
                />
              </div>
            </FormGroup>
        </div>
      </Card>
      <div className="md:w-10/12 w-11/12 mx-auto text-right pb-5 ar-text-left">
        <Button
          title={t('btnSave')}
          behavior="link"
          to={`/groups/edit/${id}`}
          btnStyle="cyanBg"
          action="noClickAction"
        />
        <button
            onClick={(e) => {navigate(-1); e.preventDefault()}}
            className={`rounded-full text-center  text-md-xs m-2 font-semibold  border-2 py-2 px-4 border-cyan-800 text-${color.themeColor}-dark border-${color.themeColor} text-cyan-800 text-${color.themeColor} bg-white hover:shadow-md hover:shadow-slate-500  w-32`}
          >
            {t('btnCancel')}
        </button>
      </div>
    </Main>
  );
};

export default GroupDetails;
