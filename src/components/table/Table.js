import React, { useRef , useContext}  from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LanguageContext from '../../shop/LanguageContext';

const Table = ({columns, data, options, title, color}) => {
  const langContext = useContext(LanguageContext);

    const componentRef = useRef();
    let themeColor = (color === "themeCyanLight") ? "#EFFDFF" : (color === "themeRedLight") ? "#F7F5EB" : (color === "themePurpleLight") ? "#F4F1F4" : (color === "themeBlueLight")  ? "#f5f5f5" : (color.includes("Dark", 0)) ? "rgb(0 0 0 / 50%)" : "#EFFDFF";

    let themeColorMd = (color === "themeCyanLight") ? "#A1D1D8" : (color === "themeRedLight") ? "#F4C5C5" : (color === "themePurpleLight") ? "#D8C7D5" : (color === "themeBlueLight") ? "#ACB1FF" : "#A1D1D8";
    let textColor = (color.includes("Dark", 0)) && "#fff !important";

    const shadowColor = (color.includes("Dark", 0)) && "2px 2px 6px rgb(0 0 0 / 51%) inset"

    const borderDarkTheme = (color.includes("Dark", 0)) && "rgb(255 255 255 / 20%)"

    const getMuiTheme = () =>
    createTheme({
      components: {

        MUIDataTableSelectCell: {
          styleOverrides: {
            headerCell: {
              backgroundColor: themeColor,
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: themeColor,
              color: textColor
            },
            sortActive: {
              color: textColor
            },
            sortAction: {
              color: textColor
            }
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              color: textColor,
              borderBottom: `1px solid ${borderDarkTheme}`
             
            },
          },
        },
        MuiTableBody: {
          styleOverrides: {
            root: {
              backgroundColor: (color.includes("Dark", 0)) && "rgb(0 0 0 / 35%)"
            },
          },
        },
        MuiTable: {
          styleOverrides: {
            root: {
              caption : {
                display: "none"
              }
            }
          }
        },
        MuiCheckbox: {
          styleOverrides: {
            root: {
              // backgroundColor: themeColor,
              color: borderDarkTheme
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: "none",
              padding: "15px",
              backgroundColor: "rgb(255 255 255 / 0%)",
              color: textColor
            },
          },
        }, //MuiPopover-paper

        MUIDataTable: {
          styleOverrides: {
            responsiveBase: {
              border: `1px solid ${themeColorMd}`,
              borderRadius: "15px",
            },
          },
        },
        MuiPopover: {
          styleOverrides: {
            paper: {
              boxShadow: "0 3px 3px 0 rgb(0 0 0 / 51%) !important",
              backgroundColor: "rgb(255 255 255)",

            },
          },
        },
        MuiList: {
          styleOverrides: {
            root: {
              color: "#000"
            },
          },
        },
       
        MUIDataTableFilter: {
          styleOverrides: {
            root: {
            },
            resetLink: {
              backgroundColor: "#ddd",
              borderRadius: "30px",
            },
          },
        }, //MuiButtonBase-root-MuiIconButton-root
        MuiIconButton: {
          styleOverrides: {
            root: {
                  color: textColor,
                  boxShadow: shadowColor,
                  borderColor: borderDarkTheme
                  
            }
          }
        },
        MUIDataTableToolbar: {
          styleOverrides: {
            icon: {
              backgroundColor: themeColor,
              margin: "0 3px !important",
              borderWidth: '0 0 1px 2px !important',
              borderStyle: 'solid !important',
              borderColor: themeColorMd,
              boxShadow: `2px 2px 4px ${themeColor} inset`
            },
            filterPaper: {
              padding: "0 !important",
              boxShadow: "0 3px 5px 0 #ddd !important",
            },
            actions: {
              textAlign: langContext.language ==="arabic" && "left"
            }
          },
        },
        MuiTablePagination: {
          styleOverrides: {
            actions: {
              direction: langContext.language ==="arabic" && "ltr"
            }
          }
        }
      },
    });
  
  return (
    <div>
        <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={title}
          ref={componentRef}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  )
}

export default Table