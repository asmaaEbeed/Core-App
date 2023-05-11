import React, { useEffect, useState, useContext } from "react";
import Table from "../../components/table/Table";
import Main from "../../components/layout/Main";
import ActionMenu from "../../components/table/ActionMenu";
import { getAll, deleteItem } from "../../API/EmployeesApi";
import { Link } from "react-router-dom";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

const Employees = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const [rowsSelected, setRowsSelected] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);

  const color = useContext(ThemeContext);


  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const allEmployeesData = await getAll();
    setEmployeesData(allEmployeesData.data);
  };

  const columns = [
    {
      name: "pkEmpId",
      label: t('tblHeaderId'),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true
      },
    },
    {
      name: "empName",
      label: t("name"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true
      },
    },
    {
      name: "branch",
      label: t("branch"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true
      },
    },
    {
        name: "email",
        label: t("email"),
        options: {
            filter: true,
            sort: true,
            sortThirdClickReset: true,
        }
    },
    {
        name: "phone",
        label: t("phone"),
        options: {
            filter: true,
            sort: true,
            sortThirdClickReset: true,
        }
    },
    {
      name: "empCreationDate",
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
          return (
            <ActionMenu
              handleClick={toggleActionsWrapper}
              row={tableMeta.rowData}
              toView="/employees"
              toEdit="/employees/edit"
          color = {color.themeColor}
            />
          );
        },
      },
    },
  ];

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

  const options = {
    customToolbar: () => (<Link
      className={`bg-cyan-light bg-${color.themeColor}-light rounded-full py-2 px-4 text-md-xs m-2 font-semibold hover:shadow-sm hover:shadow-slate-400`}
      type="button"
      to="/employees/add-employee"
    >
      {t('addNewEmp')} +
    </Link>),
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "multiple",
    // selectableRowsOnClick: true,
    rowsSelected: rowsSelected,
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      console.log(rowsSelectedData, allRows, rowsSelected);
      setRowsSelected(rowsSelected);
    },
    rowsPerPageOptions:[5, 10, 15, 30, { value: employeesData.length, label: 'All' }],
    onRowsDelete: (rowsDeleted, newData) => new Promise((resolve, reject) => {
      rowsSelected.map( row => (
        deleteItem(employeesData[row].id).then( res => {
          getEmployees();
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
  return (
    <Main>
      <Table columns={columns} data={employeesData} options={options} title={t("employeesList")} color={color.themeColor}  />
    </Main>
  );
};

export default Employees;
