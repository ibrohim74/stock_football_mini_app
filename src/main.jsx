import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {LanguageProvider} from "./utils/lang/LangContext.jsx";

createRoot(document.getElementById('root')).render(

        <LanguageProvider>
            <App/>
        </LanguageProvider>

)
