import React, { useEffect, useState, useContext } from "react";
import Table from "../../components/table/Table";
import Main from "../../components/layout/Main";
import ActionMenu from "../../components/table/ActionMenu";
import { getAll, deleteDepartment } from "../../API/DepartmentsApi";
import { Link } from "react-router-dom";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

const Departments = () => {
  const color = useContext(ThemeContext);
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const [rowsSelected, setRowsSelected] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

    useEffect(() => {
    getDepartments();
  },[])
  

  const getDepartments = async () => {
    const allDeptData = await getAll();
    setDepartmentData(allDeptData.data);
  }

  const columns = [
    {
      name: "id",
      label: t('tblHeaderId'),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "departmentName",
      label: t('tblHeaderDept'),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "status",
      label: t("tblHeaderStatus"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "creationDate",
      label: t("createdDate"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "departmentMngr",
      label: t("tblHeaderDeptMngr"),
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
          return (
            <ActionMenu
          handleClick={toggleActionsWrapper}
          row={tableMeta.rowData}
          toView="/departments"
          toEdit="/departments/edit"
          color = {color.themeColor}
        />
          );
        },
      },
    },
  ];



  const options = {
    customToolbar: () => (<Link
      className={`bg-cyan-light bg-${color.themeColor}-light rounded-full text-center py-2 px-4 text-md-xs m-2 w-48 font-semibold hover:shadow-sm hover:shadow-slate-400`}
      type="button"
      to="/departments/add-department"
    >
      {t("addDeptBtn")} +
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
    rowsPerPageOptions:[5, 10, 15, 30, { value: departmentData.length, label: 'All' }],
    onRowsDelete: (rowsDeleted, newData) => new Promise((resolve, reject) => {
      rowsSelected.map( row => (
        deleteDepartment(departmentData[row].id).then( res => {
          getDepartments();
          resolve();
        })
      ))
      setRowsSelected([]);
    }),
    downloadOptions: {
      filename: 'Departments.csv',
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
      <Table columns={columns} data={departmentData} options={options} title={t("tblDptTitle")} color={color.themeColor} />
    </Main>
  );
};

export default Departments;
