import React from 'react';
import {Link, useParams} from "react-router-dom";
import { FOOTBALL, HOME_PAGE_FOOTBALL, TAP, HOME_PAGE_TAP } from "../utils/const.jsx";

const IndexPage = () => {
    let {user_id } = useParams()

    if (user_id){
        user_id = parseInt(user_id);
    }else {
        user_id = 1
    }
    return (
        <div className="index_page">
            user: {user_id}
            <h1>Kategoriyani Tanlang</h1>
            <Link to={`${FOOTBALL}${user_id}/${HOME_PAGE_FOOTBALL}`} className="category_button">
                Football
            </Link>
            <Link to={`${TAP}${user_id}/${HOME_PAGE_TAP}`} className="category_button">
                TAP
            </Link>
        </div>
    );
};

export default IndexPage;
