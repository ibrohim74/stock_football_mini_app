import React from 'react';
import "./app_bar.css"
import ball from "../../assets/icons/icons8-football-50.svg"
import peredacha from "../../assets/icons/football-game-plan-on-field.svg"
import liga from "../../assets/icons/trophy-football-cup.svg"
import users from "../../assets/icons/group.svg"
import gift from "../../assets/icons/gift-box.svg"
import {Link} from "react-router-dom";
import {FRIENDS, GIFT, HOME_PAGE, LEAGUE, PEREDACHA} from "../../utils/const.jsx";

const AppBar = () => {
    return (
        <div className="app_bar">
            <div className="app_bar_content">
                <Link to={HOME_PAGE} className="app_bar_content_item">
                    <span><img src={ball} alt="app_bar"/></span>
                    <p>Bosh sahifa</p>
                </Link>
                <Link to={PEREDACHA}  className="app_bar_content_item">
                    <span><img src={peredacha} alt="app_bar"/></span>
                    <p>peredacha</p>
                </Link>
                <Link to={LEAGUE} className="app_bar_content_item">
                    <span><img src={liga} alt="app_bar"/></span>
                    <p>Liga</p>
                </Link>
                <Link to={FRIENDS} className="app_bar_content_item">
                    <span><img src={users} alt="app_bar"/></span>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>Do'stlar</p>
                </Link>
                <Link to={GIFT} className="app_bar_content_item">
                    <span><img src={gift} alt="app_bar"/></span>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>sovg'alar</p>
                </Link>
            </div>
        </div>
    );
};

export default AppBar;