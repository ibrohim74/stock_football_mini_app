import React from 'react';
import { Link } from "react-router-dom";
import { FOOTBALL, HOME_PAGE_FOOTBALL, TAP, HOME_PAGE_TAP } from "../utils/const.jsx";

const IndexPage = () => {
    return (
        <div className="index_page">
            <h1>Kategoriyani Tanlang</h1>
            <Link to={`${FOOTBALL}${HOME_PAGE_FOOTBALL}`} className="category_button">Football</Link>
            <Link to={`${TAP}${HOME_PAGE_TAP}`} className="category_button">TAP</Link>
        </div>
    );
};

export default IndexPage;
