import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Main from "../../components/layout/Main";
import Card from "../../components/Card";
import Button from "../../components/Button";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import {
  getAll,
  addCompany,
  updateCompany,
  getOne,
} from "../../API/CompaniesApi";
import * as BranchApi from "../../API/BranchApi";
import * as BusinessTypeApi from "../../API/BussinessTypeApi";
import Notification from "../../components/Notification";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from "react-i18next";
import AlertDialog from "../../components/AlertDialog";

const AddCompany = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const color = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const inputStyle = `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold`;
  const addTypeDialogContent = "Add type of bussiness.";
  const [coId, setCoId] = useState("");
  const [idError, setIdError] = useState(false);
  const [coName, setCoName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  // eslint-disable-next-line
  const [imageUploadError, setImageUploadError] = useState(false);
  const [coManager, setCoManager] = useState("");
  const [coType, setCoType] = useState("");
  const [coOwner, setCoOwner] = useState("");
  const [coDescription, setCoDescription] = useState("");
  const [companiesData, setCompaniesData] = useState([]);
  const [requestStatus, setRequestStatus] = useState("");
  const [editCompany, setEditCompany] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const [companyAddedId, setCompanyAddedId] = useState("")
  const [branchName, setBranchName] = useState("");
  const [branchCreatedDate, setBranchCreatedDate] = useState("");
  const [branchMngr, setBranchMngr] = useState("");
  const [branchDescription, setBranchDescription] = useState("");

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [typeInput, setTypeInput] = useState("");
  const [allBusinessTypes, setAllBusinessTypes] = useState([]);
  const [typeAdded, settypeAdded] = useState(true)

  useEffect(() => {
    getAll().then((res) => setCompaniesData(res));
  }, []);

  useEffect(() => {
    if (id) {
      const getCompany = async () => {
        const fetchedCompany = await getOne(id);
        if (fetchedCompany === null) {
          navigate("/not-found");
        } else {
          setEditCompany(fetchedCompany.data[0]);
          setIsUpdating(true);
        }
      };
      getCompany();
    }
  }, [id, navigate]);

  
  useEffect(() => {
    getBusinessType();
  },[typeAdded])

  const getBusinessType = async () => {
    const fetchedBusinessType = await BusinessTypeApi.getAll();
    if(fetchedBusinessType) {
      console.log(fetchedBusinessType)
      setAllBusinessTypes(fetchedBusinessType.data)
    }
  }

  useEffect(() => {
    const formateDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      console.log([year, month, day].join("-"));
      return [year, month, day].join("-");
    };
    let formatedDate;
    if (Object.keys(editCompany).length !== 0)
      formatedDate = formateDate(editCompany.businessAccountCreationDate);
    if (formatedDate) setCreatedDate(formatedDate);
  }, [editCompany]);

  useLayoutEffect(() => {
    if (Object.keys(editCompany).length !== 0) {
      setCoId(editCompany.pkBusinessAccountId);
      setCoName(editCompany.businessAccountName);
      setCoManager(editCompany.businessAccountManager);
      setCoType(editCompany.companyType);
      setCoOwner(editCompany.businessAccountOwner);
      setCoDescription(editCompany.businessAccountDescription);
    }
  }, [editCompany]);

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  // Close pop-up
  const changeToClose = (e) => {
    setDialogIsOpen(e)
  }
  const handleInptValue = (e) => {
    setTypeInput(e);
    console.log(typeInput)
  }
  
  const confirmAddType = async () => {
    // Add Type of bussiness
    const body = {
      "businessAccountType": typeInput
    }

    const businessTypeAdded = await BusinessTypeApi.addOne(body);
    if(businessTypeAdded.pkBusinessAccountsTypeId) {
      settypeAdded(!typeAdded)
      toast.success("Your Data Added Successfuly");
    } else {
      toast.error("Problem occured. Please, try again.");
    }
    setDialogIsOpen(false);
    console.log(businessTypeAdded);
  }
  // const inputId = (e) => {
  //   setIdError(false);
  //   companiesData.map((company) => company.id === e && setIdError(true));
  //   !idError && setCoId(e);
  // };
  const inputDate = (e) => {
    setCreatedDate(e);
  };

  const handleBranchCreatedDate = (e) => {
    setBranchCreatedDate(e);
  };

  const inputCompanyName = (e) => {
    setCoName(e);
  };

  const inputImageAttach = (files) => {
    console.log(files);
    // setImageUploadError(false);

    if (files) {
      const fileRef = files || "";
      const fileType = fileRef.type || "";
      console.log("This file upload is of type:", fileType);
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev) => {
        // convert it to base64
        setImageUpload(`data:${fileType};base64,${btoa(ev.target.result)}`);
      };
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

  const selectCoManager = (e) => {
    setCoManager(e);
  };

  const selectCoType = (e) => {
    setCoType(e);
  };

  const selectCoOwner = (e) => {
    setCoOwner(e);
  };

  const inputCoDescription = (e) => {
    setCoDescription(e);
  };

  const inputBranchName = (e) => {
    setBranchName(e);
  };
  const handleBranchMngr = (e) => {
    setBranchMngr(e)
  }

  const handleBranchDesc = (e) => {
    setBranchDescription(e);
  }
  const resetFormData = () => {
    setCoId("");
    setCoName("");
    setCoManager("");
    setCoDescription("");
    setCoOwner("");
    setCoType("");
    document.getElementById("attachImage").value = "";
    setCreatedDate("");
    setBranchName("");
    setBranchMngr("");
    setBranchDescription("");
    setBranchCreatedDate("");
  };
  const addCompanyData = async (event) => {
    event.preventDefault();
    setRequestStatus("pending");

    const body = {
      businessAccountName: coName,
      // companyType: coType,
      businessAccountCreationDate: createdDate,
      // imageUpload: imageUpload,
      businessAccountManager: coManager,
      businessAccountOwner: coOwner,
      businessAccountDescription: coDescription,
    };

    if (!idError && !imageUploadError && !isUpdating) {
      const companyAdded = await addCompany(body);
        if (companyAdded) {
          // res.json();
          setRequestStatus("success");
          console.log(companyAdded);
          console.log(companyAdded.pkBusinessAccountId)
          resetFormData();
        } else {
          setRequestStatus("error");
        }

      if(companyAdded.pkBusinessAccountId) {
        const branchBody = {
          "branch": branchName,
          "fkBusinessAccountId": Number(companyAdded.pkBusinessAccountId),
          "branchMngr": branchMngr,
          "branchDescription": branchDescription,
          "branchCreationDate": branchCreatedDate
        }
        const branchAdded = await BranchApi.addOne(branchBody);
        if(branchAdded) {
          console.log("branchAdded Successfuly");
          toast.success("Your Data Added Successfuly");
        } else {
          console.log("branch cant Added.");
          toast.error("Branch Can't Added");

        }
      }
    } else if (isUpdating && !imageUploadError) {
      updateCompany(editCompany, body).then((res) => {
        if (res.ok) {
          let timer;
          clearTimeout(timer);
          // const newData  = res.json();
          setRequestStatus("success");
          // resetFormData();
          timer = setTimeout(() => {
            navigate("/company");
          }, 3000);
        } else {
          setRequestStatus("error");
        }
      });
    }
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
      <form onSubmit={addCompanyData}>
        {/* Group Info */}
        <Card title={t("addBusinessCardTitle")}>
          <div className="my-3">
            {/* <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`${
                  idError
                    ? "border-red-800 focus-visible:outline-red-800"
                    :`border-cyan-md-light border-${color.themeColor}-md-light focus-visible:outline-cyan-md-light focus-outline-${color.themeColor}-md-light`
                } ${inputStyle} ${isUpdating && "bg-slate-200 cursor-not-allowed"}`}
                id="businessId"
                disabled={isUpdating}
                placeholder={t('companyIdPlaceHolder')}
                value={coId}
                onChange={(event) => inputId(event.target.value)}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="businessId"
              >
                {t('businessIdLabel')}
              </label>
              <div className="h-5 px-2">
                {idError && !isUpdating ? (
                  <span className="block text-xxs text-red-800">
                    {t('IdExistErr')}
                  </span>
                ) : ( !isUpdating &&
                  <span className="block text-xxs text-green-800 italic">
                    {t('autoGeneratehint')}
                  </span>
                )}
              </div>
            </div> */}
            <div className="form-row  w-96-percent inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light ${inputStyle} w-full`}
                id="companyName"
                placeholder={t("BusinessName")}
                value={coName}
                onChange={(event) => inputCompanyName(event.target.value)}
                required
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="companyName"
              >
                {t("BusinessName")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="date"
                className={`ar-date border-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
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

            <div className="form-row md:w-1/2 w-full inline-block relative align-top">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                className={`${
                  idError
                    ? "border-red-800 focus-visible:outline-red-800"
                    : `border-cyan-md-light focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light`
                } ${inputStyle}`}
                id="attachImage"
                placeholder={t("attachImage")}
                onChange={(event) => inputImageAttach(event.target.files[0])}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="attachImage"
              >
                {t("attachImage")}
              </label>
              <div
                className={`attach-icon absolute right-10 top-3 z-10 text-cyan-800 text-${color.themeColor}`}
              >
                <AttachmentOutlinedIcon />
              </div>
              <div className="h-5 px-2">
                {imageUploadError && (
                  <span className="block text-xxs text-red-800">
                    Only support .jpg, .jpeg, .png, .gif
                  </span>
                )}
              </div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              {/* <select
                name="companyManager"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light  ${inputStyle}`}
                id="companyManager"
                value={coManager}
                onChange={(event) => selectCoManager(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- {t('selectManager')} --
                </option>
                <option value="Manager1">Company Manager 1</option>
                <option value="Manager2">Company Manager 2</option>
              </select> */}
              <input
                type="text"
                className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
                id="companyManager"
                placeholder={t("businessManager")}
                onChange={(event) => selectCoManager(event.target.value)}
                value={coManager}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="companyManager"
              >
                {t("businessManager")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/3 w-5/6  inline-block align-top">
              <select
                name="companyType"
                id="companyType"
                value={coType}
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light  ${inputStyle}`}
                onChange={(event) => selectCoType(event.target.value)}
              >
                <option disabled value="">
                  {" "}
                  -- {t('selectBusinessType')} --
                </option>
                {allBusinessTypes.map((businessType) => (
                  <option value={businessType.pkBusinessAccountsTypeId} key={businessType.pkBusinessAccountsTypeId}>
                  {businessType.businessAccountType}
                </option>
                ))}
              </select>
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="companyType"
              >
                {t("businessType")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/6  w-1/6 inline-block align-top">
              <span className={`${
          color.themeColor.includes("Dark", 0)
            ? "text-white bg-black/50"
            : `text-${color.themeColor} bg-white opacity-50`
        } py-2 px-2 inline-block text-md-xs font-semibold rounded-md`} onClick={() => {setDialogIsOpen(true)} }> + {t("add")} </span>
            </div>
            <div className="form-row w-full inline-block align-top">
              {/* <select
                name="companyOwner"
                className={`input-text bg-white border border-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light  rounded-xl py-2 px-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light w-96-percent text-slate-600 text-md-xs font-semibold`}
                id="companyOwner"
                value={coOwner}
                onChange={(event) => selectCoOwner(event.target.value)}
              >
                <option disabled value="">{t('companyOwner')}</option>
                <option value="member1">Owners 1</option>
                <option value="member2">Owners 2</option>
              </select> */}
              <input
                type="text"
                className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle} w-96-percent`}
                id="companyOwner"
                value={coOwner}
                placeholder={t("businessOwner")}
                onChange={(event) => selectCoOwner(event.target.value)}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="companyOwner"
              >
                {t("businessOwner")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block align-top">
              <textarea
                type="text"
                rows="7"
                className={`input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light w-96-percent text-slate-600 text-md-xs font-semibold`}
                id="companyDescription"
                placeholder={t("description")}
                value={coDescription}
                onChange={(event) => inputCoDescription(event.target.value)}
              ></textarea>
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="companyDescription"
              >
                {t("description")}
              </label>
            </div>
          </div>
        </Card>

        <Card title={t("addBusinessBranchTitle")}>
          <div className="my-3">
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`border-cyan-md-light focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light ${inputStyle}`}
                id="branchName"
                placeholder={t("branchName")}
                value={branchName}
                onChange={(event) => inputBranchName(event.target.value)}
                required
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="branchName"
              >
                {t("branchName")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="date"
                className={`ar-date border-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
                id="branchCreatedDate"
                required
                placeholder={t("createdDate")}
                value={branchCreatedDate}
                onChange={(event) =>
                  handleBranchCreatedDate(event.target.value)
                }
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="branchCreatedDate"
                
              >
                {t("createdDate")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row md:w-1/2 w-full inline-block align-top">
              <input
                type="text"
                className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
                id="branchMngr"
                placeholder={t("branchMngr")}
                onChange={(event) => handleBranchMngr(event.target.value)}
                value={branchMngr}
              />
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="branchMngr"
              >
                {t("branchMngr")}
              </label>
              <div className="h-5 px-2"></div>
            </div>
            <div className="form-row w-full inline-block align-top">
              <textarea
                type="text"
                rows="7"
                className={`input-text bg-white border border-cyan-md-light rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-cyan-md-light border-${color.themeColor}-md-light focus-outline-${color.themeColor}-md-light w-96-percent text-slate-600 text-md-xs font-semibold`}
                id="branchDescription"
                placeholder={t("branchDescription")}
                value={branchDescription}
                onChange={(event) => handleBranchDesc(event.target.value)}
              ></textarea>
              <label
                className={`label-helper text-cyan-800 text-${color.themeColor} font-normal`}
                htmlFor="branchDescription"
              >
                {t("branchDescription")}
              </label>
            </div>
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
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <AlertDialog dialogIsOpen={dialogIsOpen} changeToClose={changeToClose} title="" handleDialogInptTxtValue={handleInptValue} dialogInptTxtValue={typeInput} content={addTypeDialogContent} btnCancelTitle={t("btnCancel")} btnAgreeTitle={t("add")} confirmDialog={confirmAddType} isInputTextExist={true} />
    </Main>
  );
};

export default AddCompany;
