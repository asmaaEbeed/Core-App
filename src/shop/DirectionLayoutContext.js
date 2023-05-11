import { createContext, useState, useEffect } from "react";

const DirectionLayoutContext = createContext();

export const DirectionLayoutProvider = (props) => {
    const userLayoutDirection = sessionStorage.getItem("direction");
    const [isVertical, setIsVertical] = useState("");
    // All user layout data
    // eslint-disable-next-line
    const [userLayout, setUserLayout] = useState("");


    useEffect(()=> {
        const getUserLayout = async () => {
            // if(storageId && storageLayoutDirection) {
            //     if(id) {
            //         const userLayoutFetched = await AppSettingApi.getOne(id);
            //         if(userLayoutFetched !== null) {
            //             setUserLayout(userLayoutFetched);
            //         }
            //     }
            //     if(storageLayoutDirection === "vertical") {
            //         setIsVertical(true)
            //     } else {
            //         setIsVertical(false)
            //     }
            // } else {

            //     if(id) {
            //         const userLayoutFetched = await AppSettingApi.getOne(id);
            //         if(userLayoutFetched !== null && storageId) {
            //             setUserLayout(userLayoutFetched);
            //             setIsVertical(userLayout.direction === "vertical" ? true : false)
            //             sessionStorage.setItem("layoutDirection", userLayoutFetched.direction);

            //         } else {
            //             setIsVertical(true)
            //         }
            //     } else {
            //         setIsVertical(true)
            //     }
            // }

            if(userLayoutDirection) {
                if(userLayoutDirection === "vertical") 
                    {setIsVertical(true)}
                    else
                        {setIsVertical(false)}
                } else {
                    setIsVertical(true)
                }

        }
        getUserLayout();
    }, [userLayoutDirection]);

  const changeIsVertical = (toggle) => {
        setIsVertical(toggle);
    };
    return (
        <DirectionLayoutContext.Provider value={{ isVertical: isVertical, changeIsVertical: changeIsVertical, userLayoutExist: userLayout}}>
            {props.children}
        </DirectionLayoutContext.Provider>
    )
}

export default DirectionLayoutContext