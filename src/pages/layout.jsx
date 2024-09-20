import React from 'react';
import { Route, Routes, useParams } from "react-router-dom";
import { RouterFootballData, RouterTapFootballData } from "../utils/const.jsx";
import AppBar from "../component/App_bar/app_bar.jsx";

const Layout = ({ path }) => {
    const { user_id } = useParams();  // Capture user_id from the URL

    return (
        <div>
            <AppBar path={path} userId={user_id} /> {/* Pass user_id as a prop */}
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
