import { createContext, useState } from "react";

const ToggleMenuCotext = createContext();

export const ToggleMenuProvider = (props) => {
    const [menuOpen, setMenuOpen] = useState(true);

    const changeMenuOpen = (toggle) => {
        setMenuOpen(toggle);
    };
    return (
        <ToggleMenuCotext.Provider value={{ menuOpen: menuOpen, changeMenuOpen: changeMenuOpen}}>
            {props.children}
        </ToggleMenuCotext.Provider>
    )
}

export default ToggleMenuCotext