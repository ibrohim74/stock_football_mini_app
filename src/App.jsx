import React, { useState, useEffect , } from 'react';
import {HashRouter, Route, Routes, useNavigate, useParams} from "react-router-dom";
import AppBar from "./component/App_bar/app_bar.jsx";
import { RouterFootballData, RouterTapFootballData } from "./utils/const.jsx";
import HomePageTap from "./pages/Home_Page_Tap/homePageTap.jsx";
import AppBarFootball from "./component/App_bar/app_bar_football.jsx";
import LoaderFootball from "./component/loader/loader_football.jsx";

const App = () => {
    const [isLoading, setIsLoading] = useState(true); // Loading holatini boshqarish uchun state
    const tg = window.Telegram.WebApp;

    useEffect(() => {
        // 2 soniyadan keyin loaderni o'chirish
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        tg.expand();
        tg.headerColor = "#378805";
        tg.bottomBarColor = "#378805";
        tg.isVerticalSwipesEnabled = false;
        tg.isHorizontalSwipesEnabled = false;

        // Tozalash funksiyasi
        return () => clearTimeout(timer);
    }, [tg]);

    // Agar isLoading true bo'lsa LoaderFootball ko'rsatiladi, aks holda asosiy componentlar ko'rsatiladi
    if (isLoading) {
        return <LoaderFootball />;
    }

    return (
        <HashRouter>
            <Routes>
                <Route path="/:user_id/:language" element={<HomePageTap />} />
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
