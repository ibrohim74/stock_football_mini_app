import React from 'react';
import { Link } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icons/soccer_ball.png";
import peredacha from "../../assets/imgs/perspective_matte-57-128x128.png";
import liga from "../../assets/imgs/perspective_matte-38-128x128.png";
import users from "../../assets/imgs/Discussion-128x128.png";
import gift from "../../assets/imgs/perspective_matte-87-128x128.png";
import { FRIENDS, GIFT, HOME_PAGE_TAP, LEAGUE, PEREDACHA, HOME_PAGE_FOOTBALL, FOOTBALL, TAP } from "../../utils/const.jsx";

const AppBar = ({ path, userId }) => {
    return (
        <div className="app_bar">
            <div className="app_bar_content">
                {path === "football" && (
                    <>
                        <Link to={`${FOOTBALL}${userId}/${HOME_PAGE_FOOTBALL}`} className="app_bar_content_item">
                            <span><img src={ball} alt="Football" /></span>
                            <p>Football</p>
                        </Link>
                        <Link to={`${FOOTBALL}${userId}/${PEREDACHA}`} className="app_bar_content_item">
                            <span><img src={peredacha} alt="Peredacha" /></span>
                            <p>Peredacha</p>
                        </Link>
                        <Link to={`${FOOTBALL}${userId}/${LEAGUE}`} className="app_bar_content_item">
                            <span><img src={liga} alt="League" /></span>
                            <p>Liga</p>
                        </Link>
                    </>
                )}
                {path === "tap" && (
                    <>
                        <Link to={`${TAP}${userId}/${HOME_PAGE_TAP}`} className="app_bar_content_item">
                            <span><img src={ball} alt="Home" /></span>
                            <p>Bosh sahifa</p>
                        </Link>
                        <Link to={`${TAP}${userId}/${FRIENDS}`} className="app_bar_content_item">
                            <span><img src={users} alt="Friends" /></span>
                            <p>Do'stlar</p>
                        </Link>
                        <Link to={`${TAP}${userId}/${GIFT}`} className="app_bar_content_item">
                            <span><img src={gift} alt="Gifts" /></span>
                            <p>Sovg'alar</p>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default AppBar;
