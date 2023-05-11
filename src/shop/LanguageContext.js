import { createContext, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';


const LanguageContext = createContext();

export const LanguageProvider = (props) => {
    // eslint-disable-next-line
    const [t, i18n] = useTranslation();

    const [language, setLanguage] = useState("english");
    const userLanguage = sessionStorage.getItem("language");

    useEffect(()=> {
        const getUserLanguage = async () => {
            // if(storageId && storageLanguage) {
            //     setLanguage(storageLanguage);
            // } else {

            //     if(id) {
    
            //         const userLayoutFetched = await AppSettingApi.getOne(id);
                    
            //         if(userLayoutFetched !== null && storageId) {
            //             setLanguage(userLayoutFetched.language);
            //             i18n.changeLanguage(userLayoutFetched.language)
            //             sessionStorage.setItem("language", userLayoutFetched.language);
            //         } else {
            //             // set default value if user not set app setting before
            //             setLanguage("english")
            //         }
            //     } else {
            //         setLanguage("english")
            //     }
            // }
            if(userLanguage) {
                setLanguage(userLanguage);
                i18n.changeLanguage(userLanguage)
            } else {
                setLanguage("english")
            }
        }
        getUserLanguage();
    }, [userLanguage, i18n]);

  

    const changeLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang)
    }

    return (
        <LanguageContext.Provider value={{ changeLanguage, language }}>
            {props.children}
        </LanguageContext.Provider>
    )
}
export default LanguageContext;
