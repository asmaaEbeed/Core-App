import { TextField } from "@mui/material";
import React from "react";

const AlertDialogTextInpt = ({
  dialogInptTxtValue,
  handleDialogInptTxtValue,
}) => {
  const handleInptTxtValue = (e) => {
    console.log(e);
    handleDialogInptTxtValue(e);
  };
  return (
    <div>
      <TextField
        value={dialogInptTxtValue}
        autoFocus
        variant="standard"
        onChange={(e) => {
          handleInptTxtValue(e.target.value);
        }}
      />
    </div>
  );
};

export default AlertDialogTextInpt;
