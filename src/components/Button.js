import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../shop/ThemeContext";

export const Button = ({
  title,
  styles,
  type,
  icon,
  btnStyle,
  disabled,
  behavior,
  to,
  action,
  handleClick,
}) => {
  const color = useContext(ThemeContext)
  return (
    <>
      {behavior === "link" ? (
        <Link
          type={type}
          style={styles}
          to={to}
          className={`rounded-full  text-md-xs m-2 font-semibold inline-block text-center  ${
            btnStyle === "cyan-outline"
              ? `border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-cyan-800 text-${color.themeColor} text-${color.themeColor}-dark bg-white hover:shadow-md hover:shadow-slate-500  w-32`
              : btnStyle === "cyanBg"
              ? `border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-white bg-cyan-800 bg-${color.themeColor} bg-${color.themeColor}-light hover:shadow-md hover:shadow-slate-500 w-32`
              : btnStyle === "plain-icon"
              ? "hover:shadow-md hover:shadow-slate-500"
              : ""
          } `}
          disabled={disabled}
        >
          {icon}
          {title}
        </Link>
      ) : action === "noClickAction" ? (
        <button
          type={type}
          style={styles}
          className={`rounded-full  text-md-xs text-center m-2 font-semibold  ${
            btnStyle === "cyan-outline"
              ? `border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-${color.themeColor}-dark text-cyan-800 text-${color.themeColor} bg-white hover:shadow-md hover:shadow-slate-500  w-32`
              : btnStyle === "cyanBg"
              ? `border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-white bg-cyan-800 bg-${color.themeColor} bg-${color.themeColor}-light hover:shadow-md hover:shadow-slate-500 w-32`
              : btnStyle === "plain-icon"
              ? "hover:shadow-md hover:shadow-slate-500"
              : ""
          } `}
          disabled={disabled}
        >
          {icon}
          {title}
        </button>
      ) : (
        <button
          type={type}
          style={styles}
          className={`rounded-full text-center  text-md-xs m-2 font-semibold  ${
            btnStyle === "cyan-outline"
              ? `border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-cyan-800 text-${color.themeColor} text-${color.themeColor}-dark bg-white hover:shadow-md hover:shadow-slate-500  w-32`
              : btnStyle === "cyanBg"
              ? `border-2 py-2 px-4 border-cyan-800 border-${color.themeColor} text-white bg-cyan-800 bg-${color.themeColor} bg-${color.themeColor}-light hover:shadow-md hover:shadow-slate-500 w-32`
              : btnStyle === "plain-icon"
              ? "hover:shadow-md hover:shadow-slate-500"
              : ""
          } `}
          disabled={disabled}
          onClick={handleClick}
        >
          {icon}
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
