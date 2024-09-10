import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RouterData} from "./const.jsx";
import AppBar from "../component/App_bar/app_bar.jsx";

const RouterIndex = () => {
    return (
        <BrowserRouter>
            <Routes>
                {RouterData?.map(({Path, Component}) => (
                    <Route key={Path} path={Path} element={Component}/>
                ))}
            </Routes>
            <AppBar/>
        </BrowserRouter>


    );
};

export default RouterIndex;