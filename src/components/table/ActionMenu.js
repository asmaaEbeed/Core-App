import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const ActionMenu = (({handleClick, row, toView, toEdit, color}) => {
  const actionDropMenu = false;

  return (
    <div className="action-wrapper relative">
      <Button type="button" btnStyle="plain-icon" handleClick={(e) => {
          const actionWrapper = e.target.closest(".action-wrapper");
          const actionsMenu = actionWrapper.querySelector(".export-drop-menu");
          actionsMenu.classList.toggle("hidden");
          handleClick(actionsMenu);
        }} icon={<MoreVertOutlinedIcon />} />
      
      <ul
        className={`ar-action-menu absolute last-relative rounded-lg shadow-md z-40 export-drop-menu w-32 right-9 bg-white py-2 text-gray-700 ${actionDropMenu ? "block" : "hidden"}`}
      >
        <li className={`hover:bg-cyan-light hover-bg-${color} p-2`}>
          <Link className="block" to={`${toEdit}/${row[0]}`}>Edit</Link>
        </li>
        <li className={`hover:bg-cyan-light hover-bg-${color} p-2`}>
          <Link className="block" to={`${toView}/${row[0]}`}>View Details</Link>
        </li>
        
      </ul>
    </div>
  );
});

export default ActionMenu;
