import { createContext, useContext, useState, useEffect } from "react";
import i18n from "./i18n.jsx";
import { languages } from "./langs.jsx";

const LangContext = createContext();

const LanguageProvider = ({ children }) => {
    const validLanguages = ["rus", "uz"]; // Only allow "ru" and "uz"

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        // Extract the language from the URL
        const urlParts = window.location.href.split("/");
        const urlLanguage = urlParts[urlParts.length - 1]; // Get the last part of the URL

        // Check if the language in the URL is valid ("ru" or "uz"), else fallback to a default
        const initialLanguage = validLanguages.includes(urlLanguage) ? urlLanguage : "uz"; // Default to "uz"

        return initialLanguage;
    });

    useEffect(() => {
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
        }
    }, [selectedLanguage]);

    const handleLanguageChange = (languageCode) => {
        if (validLanguages.includes(languageCode)) {
            setSelectedLanguage(languageCode);
            i18n.changeLanguage(languageCode);

            // Extract current parts of the URL
            const urlParts = window.location.href.split("/");

            // Correctly extract the user_id (after the hash symbol and before the language)
            const hashParts = window.location.hash.split("/");
            const userId = hashParts[1]; // user_id should be the first part after "#/"

            // Construct the new URL
            const currentOrigin = window.location.origin; // Get current origin
            const newUrl = `${currentOrigin}/#/${userId}/${languageCode}`;

            // Update the URL without reloading the page
            window.history.replaceState(null, "", newUrl);
            window.location.reload()
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
