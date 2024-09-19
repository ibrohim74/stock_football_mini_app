import React from 'react';
import { Link, useParams } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icons/icons8-football-50.svg";
import peredacha from "../../assets/icons/football-game-plan-on-field.svg";
import liga from "../../assets/icons/trophy-football-cup.svg";
import users from "../../assets/icons/group.svg";
import gift from "../../assets/icons/gift-box.svg";
import { FRIENDS, GIFT, HOME_PAGE_TAP, LEAGUE, PEREDACHA, HOME_PAGE_FOOTBALL, FOOTBALL, TAP } from "../../utils/const.jsx";

const AppBar = ({path}) => {
    const { user_id } = useParams();  // Capture userId from the URL

    return (
        <div className="app_bar">
            <div className="app_bar_content">
                {path === "football" && (
                    <>
                        <Link to={`${FOOTBALL}${user_id}/${HOME_PAGE_FOOTBALL}`} className="app_bar_content_item">
                            <span><img src={ball} alt="Football" /></span>
                            <p>Football</p>
                        </Link>
                        <Link to={`${FOOTBALL}${user_id}/${PEREDACHA}`} className="app_bar_content_item">
                            <span><img src={peredacha} alt="Peredacha" /></span>
                            <p>Peredacha</p>
                        </Link>
                        <Link to={`${FOOTBALL}${user_id}/${LEAGUE}`} className="app_bar_content_item">
                            <span><img src={liga} alt="League" /></span>
                            <p>Liga</p>
                        </Link>
                    </>
                )}
                {path === "tap" && (
                    <>
                        <Link to={`${TAP}${user_id}/${HOME_PAGE_TAP}`} className="app_bar_content_item">
                            <span><img src={ball} alt="Home" /></span>
                            <p>Bosh sahifa</p>
                        </Link>
                        <Link to={`${TAP}${user_id}/${FRIENDS}`} className="app_bar_content_item">
                            <span><img src={users} alt="Friends" /></span>
                            <p>Do'stlar</p>
                        </Link>
                        <Link to={`${TAP}${user_id}/${GIFT}`} className="app_bar_content_item">
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
