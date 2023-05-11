import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Main from "../../components/layout/Main";
import { getOne } from "../../API/CompaniesApi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

const CompanyDetails = () => {

  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const color = useContext(ThemeContext);

  const borderColor = `border-${color.themeColor}-md-light`;
  const outlineColor = `focus-outline-${color.themeColor}-md-light`

  const inputStyle =
    `input-text selection:bg-white bg-white border  rounded-xl py-2 px-2 relative mx-1 z-3  w-11/12 text-slate-700 text-md-xs font-semibold ${borderColor} ${outlineColor}`;


  const [coId, setCoId] = useState("");
  const [coName, setCoName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [coManager, setCoManager] = useState("");
  const [coType, setCoType] = useState("");
  const [coOwner, setCoOwner] = useState("");
  const [coDescription, setCoDescription] = useState("");
  const [imgUploaded, setImgUploaded] = useState("")
  const [companyInfo, setCompanyInfo] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getCompany = async () => {
        const fetchedCompany = await getOne(id);
        if (fetchedCompany === null) {
          
          navigate("/not-found");
        } else {
          console.log(fetchedCompany.data[0])
          setCompanyInfo(fetchedCompany.data[0]);
        }
      };

      getCompany();
    }
  }, [id, navigate]);

  useEffect(() => {
    const formateDate = (date) => {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

        console.log([year, month, day].join('-'))
        return [year, month, day].join('-')
    }
    let formatedDate
    if (Object.keys(companyInfo).length !== 0)
       formatedDate = formateDate(companyInfo.businessAccountCreationDate);
       if(formatedDate)
        setCreatedDate(formatedDate)
    
  }, [companyInfo])

  useLayoutEffect(() => {
    if (Object.keys(companyInfo).length !== 0) {
      setCoId(companyInfo.pkBusinessAccountId);
      setCoName(companyInfo.businessAccountName);
      setCoManager(companyInfo.businessAccountManager);
      // setCreatedDate(companyInfo.businessAccountCreationDate);
      setCoType(companyInfo.companyType);
      setCoOwner(companyInfo.businessAccountOwner);
      setCoDescription(companyInfo.businessAccountDescription);
      setImgUploaded(companyInfo.imageUpload);
    }
  }, [companyInfo]);

  return (
    <Main>
      <Card title={`${t('businessDataInfo')} ${coName}`}>
        <div className="my-3">
          <div className="w-40 max-h-44 mx-auto my-3">
          {imgUploaded && ((imgUploaded.indexOf("image/") > -1) && 
            <img src={imgUploaded} width={300} alt="company" />
            )}
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="companyId"
              placeholder={t('businessIdLabel')}
              value={coId}
              readOnly disabled
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="companyId"
            >
              {t('businessIdLabel')}
            </label>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="date"
              className={`ar-date ${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="createdDate"
              readOnly disabled
              placeholder="created Date"
              defaultValue={createdDate}
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="createdDate"
            >
              {t('createdDate')}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <input
              type="text"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="companyName"
              placeholder={t('BusinessName')}
              defaultValue={coName}
              readOnly disabled
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="companyName"
            >
              {t('BusinessName')}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top"></div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
          <input
              type="text"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="companyManager"
              placeholder={t('businessManager')}
              value={coManager}
              readOnly disabled
            />
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="companyManager"
            >
              {t('businessManager')}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row md:w-1/2 w-full inline-block align-top">
            <select
              name="companyType"
              id="companyType"
              value={coType}
              className={`border-cyan-md-light focus-visible:outline-cyan-md-light ${inputStyle}`}
              readOnly
              disabled
            >
              <option disabled value="">
                {" "}
                -- {t('selectBusinessType')} --
              </option>
              <option value="companyType1">Company Type 1</option>
              <option value="companyType2">Company Type 2</option>
            </select>
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="companyType"
            >
              {t('businessType')}
            </label>
          </div>
          <div className="form-row w-full inline-block align-top">
          <input
              type="text"
              className={`${"border-cyan-md-light focus-visible:outline-cyan-md-light outline-0"} ${inputStyle}`}
              id="companyOwner"
              value={coOwner}
              readOnly disabled
            />
            
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="companyOwner"
            >
              {t('companyOwner')}
            </label>
            <div className="h-5 px-2"></div>
          </div>
          <div className="form-row w-full inline-block align-top">
            <textarea
              type="text"
              className={`input-text bg-white border border-cyan-md-light ${borderColor} rounded-xl py-2 px-2 mb-2 relative mx-1 z-3 focus-visible:outline-none ${outlineColor} w-96-percent text-slate-700 text-md-xs font-semibold`}
              id="companyDescription"
              placeholder={t('description')} readOnly disabled
              value={coDescription}
            ></textarea>
            <label
              className={`label-helper visible text-cyan-800 text-${color.themeColor} font-normal`}
              htmlFor="companyDescription"
            >
              {t('description')}
            </label>
            
          </div>
        </div>
      </Card>
      <div className="md:w-10/12 w-11/12 mx-auto text-right pb-5 ar-text-left">
          <Button title={t('btnEdit')} behavior="link" to={`/company/edit/${id}`} btnStyle="cyanBg" action="noClickAction" />
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

export default CompanyDetails;
