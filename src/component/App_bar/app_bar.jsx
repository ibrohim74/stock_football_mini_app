import React from 'react';
import { Link, useLocation } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icons/icons8-football-50.svg";
import peredacha from "../../assets/icons/football-game-plan-on-field.svg";
import liga from "../../assets/icons/trophy-football-cup.svg";
import users from "../../assets/icons/group.svg";
import gift from "../../assets/icons/gift-box.svg";
import { FRIENDS, GIFT, HOME_PAGE_TAP, LEAGUE, PEREDACHA, HOME_PAGE_FOOTBALL, FOOTBALL, TAP } from "../../utils/const.jsx";

const AppBar = ({path}) => {

    console.log(path)
    return (
        <div className="app_bar">
            <div className="app_bar_content">
                {path === "football" && (
                    <>
                        <Link to={`${FOOTBALL}${HOME_PAGE_FOOTBALL}`} className="app_bar_content_item">
                            <span><img src={ball} alt="Football" /></span>
                            <p>Football</p>
                        </Link>
                        <Link to={`${FOOTBALL}${PEREDACHA}`} className="app_bar_content_item">
                            <span><img src={peredacha} alt="Peredacha" /></span>
                            <p>Peredacha</p>
                        </Link>
                        <Link to={`${FOOTBALL}${LEAGUE}`} className="app_bar_content_item">
                            <span><img src={liga} alt="League" /></span>
                            <p>Liga</p>
                        </Link>
                    </>
                )}
                {path === "tap" && (
                    <>
                        <Link to={`${TAP}${HOME_PAGE_TAP}`} className="app_bar_content_item">
                            <span><img src={ball} alt="Home" /></span>
                            <p>Bosh sahifa</p>
                        </Link>
                        <Link to={`${TAP}${FRIENDS}`} className="app_bar_content_item">
                            <span><img src={users} alt="Friends" /></span>
                            <p>Do'stlar</p>
                        </Link>
                        <Link to={`${TAP}${GIFT}`} className="app_bar_content_item">
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
