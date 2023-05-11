import React, { useEffect, useState, useContext } from "react";
import Table from "../../components/table/Table";
import Main from "../../components/layout/Main";
import ActionMenu from "../../components/table/ActionMenu";
import * as GroupsApi from "../../API/GroupsApi";
import { Link } from "react-router-dom";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';

const Groups = () => {
  const color = useContext(ThemeContext);
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const [rowsSelected, setRowsSelected] = useState([]);
  const [groupsData, setGroupsData] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const allGroupsData = await GroupsApi.getAll();
    if(allGroupsData) {
    setGroupsData(allGroupsData.data);
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
  const columns = [
    {
      name: "pkGroupId",
      label: t('tblHeaderId'),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "groupName",
      label: t("groupName"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "groupManager",
      label: t("groupLead"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "noOfMembers",
      label: t("noOfMember"),
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "groupCreationDate",
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
              toView="/groups"
              toEdit="/groups/edit"
              color={color.themeColor}
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
        to="/groups/add-group"
      >
        {t('addNewGroup')} +
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
    rowsPerPageOptions: [
      5,
      10,
      15,
      30,
      { value: groupsData.length, label: "All" },
    ],
    onRowsDelete: (rowsDeleted, newData) =>
      new Promise((resolve, reject) => {
        rowsSelected.map((row) =>
          GroupsApi.deleteOne(groupsData[row].id).then((res) => {
            getGroups();
            resolve();
          })
        );
        setRowsSelected([]);
      }),
    downloadOptions: {
      filename: "Departments.csv",
      separator: ",",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
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
      <Table
        columns={columns}
        data={groupsData}
        options={options}
        title={t("groupsList")}
        color={color.themeColor}
      />
    </Main>
  );
};

export default Groups;
