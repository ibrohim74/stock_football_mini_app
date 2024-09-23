import React, {useEffect} from 'react';
import { HashRouter, Route, Routes, useParams } from "react-router-dom";
import AppBar from "./component/App_bar/app_bar.jsx";
import { RouterFootballData, RouterTapFootballData } from "./utils/const.jsx";
import HomePageTap from "./pages/Home_Page_Tap/homePageTap.jsx";
import AppBarFootball from "./component/App_bar/app_bar_football.jsx";

const App = () => {
    const tg = window.Telegram.WebApp;
    useEffect(() => {
        // Ekranni to'liq ochish
        tg.expand();
        const stableHeight = tg.viewportStableHeight;
        if (stableHeight) {
            // Telegram tomonidan berilgan stableHeightni o'rnatamiz
            document.documentElement.style.setProperty('--stable-height', `${stableHeight}px`);
        }

    }, [tg]);
    return (
        <HashRouter>
            <Routes>
                <Route path="/:user_id" element={<><AppBar /><HomePageTap/></>} />
                {RouterTapFootballData.map(({ Path, Component }, index) => (
                    <Route path={Path} element={<><AppBar /><Component /></>} key={index} />
                ))}
                {RouterFootballData.map(({ Path, Component }, index) => (
                    <Route path={Path} element={<><AppBarFootball /><Component /></>} key={index} />
                ))}
            </Routes>
        </HashRouter>
    );
};

export default App;
