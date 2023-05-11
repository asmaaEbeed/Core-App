import { useContext } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../shop/ThemeContext";

const Card = (props) => {
  const color = useContext(ThemeContext);

  return (
    <>
    <div className={`border border-cyan-md-light border-${color.themeColor}-md-light rounded-lg my-5 mx-auto bg-${color.themeColor}-card ${props.width ? `${props.width}` : `md:w-10/12 w-11/12`}`}>
      {/* Card title */}
      <div className= {`bg-cyan-light bg-${color.themeColor}-light rounded-tl-lg rounded-tr-lg py-2 px-4 text-cyan-800 text-${color.themeColor} border-b border-cyan-md-light border-${color.themeColor}-md-light font-semibold `}>
        {props.title}
      </div>
      {/* Card content */}
      <div className="py-1 px-4">
      {props.children}
      </div>
    </div>
    </>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card
