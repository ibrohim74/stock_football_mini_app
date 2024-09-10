import React from 'react';
import { Route, Routes } from "react-router-dom";
import { RouterFootballData, RouterTapFootballData } from "../utils/const.jsx";
import AppBar from "../component/App_bar/app_bar.jsx";

const Layout = ({ path }) => {
    return (
        <div>
            <AppBar path={path} />
            <Routes>
                {path === "tap" &&
                    RouterTapFootballData.map(({ Path, Component }, index) => (
                        <Route key={index} path={Path} element={Component} />
                    ))
                }
                {path === "football" &&
                    RouterFootballData.map(({ Path, Component }, index) => (
                        <Route key={index} path={Path} element={Component} />
                    ))
                }
            </Routes>
        </div>
    );
};

export default Layout;
