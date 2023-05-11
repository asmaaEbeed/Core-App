import { useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ToggleMenuProvider from "../../shop/ToggleMenuContext";
import DirectionLayoutContext from "../../shop/DirectionLayoutContext";
import ThemeContext from "../../shop/ThemeContext";
import LanguageContext from "../../shop/LanguageContext";

const Main = (props) => {
  // const [menuIsOpen, setMenuIsOpen ] = useState(true);
  // const updateMenuIsOpen = () => {
  //   setMenuIsOpen(!menuIsOpen);
  //   console.log({menuIsOpen});
  const menuContext = useContext(ToggleMenuProvider);
  const directionLayout = useContext(DirectionLayoutContext);
  const color = useContext(ThemeContext);
  const langContext = useContext(LanguageContext);

  // }
  return (
    <div
      className={`wrapper relative dark bg-dark-${color.themeColor} ${
        langContext.language === "arabic" && "ar-rtl"
      }`}
    >
      <div>
        {/* <Header updateMenuIsOpen={updateMenuIsOpen} menuIsOpen={menuIsOpen} /> */}
        <Header />
      </div>
      <div>
        {/* <Sidebar menuIsOpen={menuIsOpen} /> */}
        <Sidebar />
      </div>
      <div
        className={`page-content ${
          directionLayout.isVertical
            ? `${
                langContext.language === "arabic"
                  ? `${menuContext.menuOpen ? "pr-52" : "pr-24"}`
                  : `${menuContext.menuOpen ? "pl-52" : "pl-24"}`
              } `
            : "px-5"
        }  ease-in-out duration-300`}
      >
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Main;
