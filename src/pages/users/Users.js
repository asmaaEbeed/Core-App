import React, { useEffect, useState, useContext } from "react";
import Table from "../../components/table/Table";
import ActionMenu from "../../components/table/ActionMenu";
import * as UsersApi from "../../API/UsersApi";
import Main from '../../components/layout/Main';
import { Link } from "react-router-dom";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

const Users = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const color = useContext(ThemeContext);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [usersData, setUsersData] = useState([]);

    useEffect(() => {
    getUsers();
  },[]);
  const getUsers = async () => {
    const allUsersData = await UsersApi.getAll();
    console.log(allUsersData.data)
    setUsersData(allUsersData.data);
  }

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

  const columns = [
    {
      name: "pkUserId",
      label: t('tblHeaderId'),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "personalName",
      label: t("personalName"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "userEmail",
      label: t("email"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
      
    },
    {
      name: "phone",
      label: t("phone"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
      
    },
    {
      name: "userCreationDate",
      label: t("joinDate"),
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
          toView="/users"
          toEdit="/users/edit"
          color = {color.themeColor}
        />
          );
        },
      },
    },
    
  ];

  const options = {
    customToolbar: () => (
    <Link
      className={`bg-cyan-light bg-${color.themeColor}-light rounded-full py-2 px-4 text-md-xs m-2 font-semibold hover:shadow-sm hover:shadow-slate-400`}
      type="button"
      to="/users/add-user"
    >
      {t("addNewUser")} +
    </Link>
    ),
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "multiple",
    // selectableRowsOnClick: true,
    rowsSelected: rowsSelected,
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      setRowsSelected(rowsSelected);
    },
    rowsPerPageOptions:[5, 10, 15, 30, { value: usersData.length, label: 'All' }],
    onRowsDelete: (rowsDeleted, newData) => new Promise((resolve, reject) => {
      rowsSelected.map( row => (
        UsersApi.deleteOne(usersData[row].id).then( res => {
          getUsers();
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
      <Table columns={columns} data={usersData} options={options} title={t("usersList")} color={color.themeColor} />
    </Main>
  )
}

export default Users