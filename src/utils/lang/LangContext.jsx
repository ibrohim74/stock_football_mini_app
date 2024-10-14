import { createContext, useContext, useState, useEffect } from "react";
import i18n from "./i18n.jsx";

const LangContext = createContext();

const LanguageProvider = ({ children }) => {
    const validLanguages = ["rus", "uz"]; // Faqat "rus" va "uz" tillarini ruxsat beramiz

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        // URL'dagi tilni olish uchun hashdan ajratib olamiz
        const hashParts = window.location.hash.split("/"); // Hashni bo'lib olamiz
        const urlLanguage = hashParts[2]; // Til hashdan keyin 3-chi qismda

        // URL'dagi til valid bo'lsa, shuni olamiz, aks holda "uz" o'rnatamiz
        const initialLanguage = validLanguages.includes(urlLanguage) ? urlLanguage : "uz";
        return initialLanguage;
    });

    useEffect(() => {
        // Tilni o'zgartirish uchun URL'dagi tilni kuzatamiz
        const checkLanguageInURL = () => {
            const hashParts = window.location.hash.split("/");
            const urlLanguage = hashParts[2];
            if (validLanguages.includes(urlLanguage) && urlLanguage !== selectedLanguage) {
                setSelectedLanguage(urlLanguage);
            }
        };

        // Sahifa yuklanganda yoki URL o'zgarganda tilni tekshiramiz
        checkLanguageInURL();

        // URL hash o'zgarganda tilni tekshirish uchun event listener qo'shamiz
        window.addEventListener("hashchange", checkLanguageInURL);

        // Component unmounted bo'lganda listenerni olib tashlaymiz
        return () => {
            window.removeEventListener("hashchange", checkLanguageInURL);
        };
    }, [selectedLanguage]);

    useEffect(() => {
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
        }
    }, [selectedLanguage]);

    const handleLanguageChange = (languageCode) => {
        if (validLanguages.includes(languageCode)) {
            setSelectedLanguage(languageCode);
            i18n.changeLanguage(languageCode);

            // Hashdan foydalanuvchi ID ni olish
            const hashParts = window.location.hash.split("/");
            const userId = hashParts[1]; // user_id hashdagi birinchi qism

            // Yangi URL ni tuzamiz
            const currentOrigin = window.location.origin; // Joriy manzilni olamiz
            const newUrl = `${currentOrigin}/#/${userId}/${languageCode}`;

            // URL'ni yangilaymiz va sahifani qayta yuklaymiz
            window.history.replaceState(null, "", newUrl);
            window.location.reload(); // Sahifani yangilash
        }
    };

    return (
        <LangContext.Provider
            value={{
                selectedLanguage,
                handleLanguageChange,
            }}
        >
            {children}
        </LangContext.Provider>
    );
};

function useLanguage() {
    const context = useContext(LangContext);

    if (context === undefined) {
        throw new Error("Language context was used outside of LangProvider");
    }

    return context;
}

export { LanguageProvider, useLanguage };
