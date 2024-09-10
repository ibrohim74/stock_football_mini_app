import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FOOTBALL, INDEX, TAP } from "./const.jsx";
import Layout from "../pages/layout.jsx";
import IndexPage from "../pages/index_page.jsx";

const IndexRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={INDEX} element={<IndexPage />} />
                <Route path={`${FOOTBALL}/*`} element={<Layout path="football" />} />
                <Route path={`${TAP}/*`} element={<Layout path="tap" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default IndexRouter;
