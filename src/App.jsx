import {HashRouter, Route, Routes, useParams} from "react-router-dom";
import {FOOTBALL, INDEX, TAP} from "./utils/const.jsx";
import IndexPage from "./pages/index_page.jsx";
import Layout from "./pages/layout.jsx";
import {useEffect} from "react";

function App() {
    const tg = window.Telegram.WebApp;
    useEffect(() => {
        // Ekranni to'liq ochish
        tg.expand();
        const stableHeight = tg.viewportStableHeight;
        if (stableHeight) {
            // Telegram tomonidan berilgan `stableHeight`ni o'rnatamiz
            document.documentElement.style.setProperty('--stable-height', `${stableHeight}px`);
        }

    }, [tg]);
    return (
        <HashRouter>
            <Routes>
                {/* Index page route with dynamic user ID */}
                <Route path="/:user_id" element={<IndexPage />} />

                {/* Football route with dynamic user ID */}
                <Route path={`${FOOTBALL}:user_id/*`} element={<Layout path="football" />} />

                {/* Tap route with dynamic user ID */}
                <Route path={`${TAP}:user_id/*`} element={<Layout path="tap" />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
