import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ThemeContext from "../shop/ThemeContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const MultiSelect = ({
  optionsData,
  title,
  selectedData,
  handleMultiSelectChange,
  disabled
}) => {
  const theme = useTheme();
  const color = useContext(ThemeContext)

  const changeSelectedSub = (e) => {
    handleMultiSelectChange(e);
  };
  return (
    <>
      <InputLabel
        id="subDeptLbl"
        className="label-helper text-cyan-800 font-normal"
      >
        {title}
      </InputLabel>
      
      <Select
        labelId="subDeptLbl"
        id="subDepartment"
        multiple
        value={selectedData}
        disabled={disabled}
        onChange={(e) => {!disabled && changeSelectedSub(e)}}
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label={title}
            className={`input-text w-96-percent border border-cyan-md-light border-${color.themeColor} hover:border-cyan-md-light hover-border-${color.themeColor}-md-light rounded-xl `}
          />
        }
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              border: "none",
            }}
          >
            {selected.map((value, index) => (
              <Chip key={index} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {!disabled && ((optionsData.length > 0) &&
          optionsData.map((data, index) => (
            <MenuItem
              key={data.id}
              value={data.value}
              style={getStyles(data, optionsData, theme)}
            >
              {data.value}
            </MenuItem>
          )))
          }
      </Select>
    </>
  );
};

export default MultiSelect;
