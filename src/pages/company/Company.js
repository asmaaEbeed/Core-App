import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import Table from "../../components/table/Table";
import ActionMenu from "../../components/table/ActionMenu";
import { getAll, deleteCompany } from "../../API/CompaniesApi";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

const Company = () => {

  const color = useContext(ThemeContext);
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const columns = [
    {
      name: "pkBusinessAccountId",
      label: t('tblHeaderId'),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "businessAccountName",
      label: t("tblHeaderBusinessName"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "companyType",
      label: t("tblHeaderBusinessType"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "businessAccountCreationDate",
      label: t("createdDate"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "action",
      label: t("tblHeaderAction"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          // Here you can render a more complex display.
          // You're given access to tableMeta, which has
          // the rowData (as well as the original object data).
          // See the console for a detailed look at this object.
          return (
            <ActionMenu
          handleClick={toggleActionsWrapper}
          row={tableMeta.rowData}
          toView="/company"
          toEdit="/company/edit"
          color = {color.themeColor}
        />
          );
        },
      },
    },
  ];

  

  const [rowsSelected, setRowsSelected] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);


  useEffect(() => {

    getCompanies();
  },[])

  const getCompanies = async () => {
    const fetchedCompany = await getAll();
    if(fetchedCompany) {
      setCompaniesData(fetchedCompany.data)
    }
  }

  const options = {
    customToolbar: () => (<Link
      className= {`bg-cyan-light bg-${color.themeColor}-light rounded-full py-2 px-4 text-md-xs m-2 w-44 font-semibold hover:shadow-sm hover:shadow-slate-400 text-center`}
      type="button"
      to="/company/add-company"
    >
    {t('addBusinessBtn')} +
    </Link>),
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "multiple",
    // selectableRowsOnClick: true,
    rowsSelected: rowsSelected,
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      // console.log(rowsSelectedData, allRows, rowsSelected);
      setRowsSelected(rowsSelected);
    },
    rowsPerPageOptions:[5, 10, 15, 30, { value: companiesData.length, label: 'All' }],
    onRowsDelete: (rowsDeleted, newData) => new Promise((resolve, reject) => {
      rowsSelected.map( row => (
        // fetch(url + "/" + companiesData[row].id, {
        //   method: "DELETE",
        //   headers: {
        //     'Content-type': "application/json"
        //   },
        //   // body: JSON.stringify(newData)
        // }).then(resp=>resp.json()).then( resp => {
        //   getCompanies();
        //   resolve();
        // })
        deleteCompany(companiesData[row].id).then( res => {
          getCompanies();
          resolve();
        })
      ))
      setRowsSelected([]);
    }),
    downloadOptions: {
      filename: 'Companies.csv',
      separator: ',',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    },
    textLabels: {
      pagination: {
        // next: "Next Page",
        // previous: "Previous Page",
        // displayRows: "of",
        rowsPerPage: t("rowsPerPage")
      },
    }

  };


  const toggleActionsWrapper = (targetActionsMenu) => {
    let actionDivs = document.querySelectorAll(".export-drop-menu");
    actionDivs = Array.from(actionDivs);
    actionDivs = actionDivs.filter((item) => {
      return item !== targetActionsMenu;
    });

    actionDivs.forEach((item) => {
      item.classList.add("hidden");
    });
  };

  return (
    <Main>
      
      <Table columns={columns} data={companiesData} options={options} title={t("tblBusinessTitle")} color={color.themeColor} />
      
    </Main>
  );
};

export default Company;
