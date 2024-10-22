import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import AppBar from "./component/App_bar/app_bar.jsx";
import { RouterFootballData, RouterTapFootballData } from "./utils/const.jsx";
import HomePageTap from "./pages/Home_Page_Tap/homePageTap.jsx";
import AppBarFootball from "./component/App_bar/app_bar_football.jsx";
import LoaderFootball from "./component/loader/loader_football.jsx";
import { $API } from "./utils/https.jsx";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const tg = window.Telegram.WebApp;

    const hashParts = window.location.hash.split("/");
    const userId = hashParts[1];

    const GetToken = async () => {
        const isToken = localStorage.getItem("access_token");
        try {
            if (!isToken) {
                const res = await $API.post("/token", null, { params: { user_id: userId } });
                console.log(res);
                localStorage.setItem("access_token", res.data.access_token);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        // 2 soniyadan keyin loaderni o'chirish
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 200);

        tg.expand();
        tg.headerColor = "#378805";
        tg.bottomBarColor = "#378805";
        tg.isVerticalSwipesEnabled = false;
        tg.isHorizontalSwipesEnabled = false;
        GetToken();

        // Tozalash funksiyasi
        return () => clearTimeout(timer);
    }, [tg]);

    // Agar isLoading true bo'lsa LoaderFootball ko'rsatiladi, aks holda asosiy componentlar ko'rsatiladi
    if (isLoading) {
        return <>
            <LoaderFootball />
        </>;
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
