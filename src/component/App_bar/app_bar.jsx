import React from 'react';
import { Link, useParams } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icons/soccer_ball.png";
import peredacha from "../../assets/imgs/perspective_matte-57-128x128.png";
import liga from "../../assets/imgs/perspective_matte-38-128x128.png";
import users from "../../assets/imgs/Discussion-128x128.png";
import event from "../../assets/imgs/Event-128x128.png";
import { HOME_PAGE_FOOTBALL, FRIENDS, RATING, SETTINGS, EVENTS, PEREDACHA, LEAGUE } from "../../utils/const.jsx";

const AppBar = () => {
    const { user_id } = useParams(); // Get userId from the URL


    return (
        <div className="app_bar">
            <div className="app_bar_content">
                    <>
                        <Link to={`/${user_id}`} className="app_bar_content_item">
                            <span><img src={ball} alt="Home" /></span>
                            <p>Bosh sahifa</p>
                        </Link>
                        <Link to={`/${user_id}/friends`} className="app_bar_content_item">
                            <span><img src={users} alt="Friends" /></span>
                            <p>Do'stlar</p>
                        </Link>
                        <Link  to={`/${user_id}/peredacha`} className="app_bar_content_item app_live_button">
                            <span><img src={ball} alt="Football" /></span>
                        </Link>
                        <Link to={`/${user_id}/Events_Page`} className="app_bar_content_item">
                            <span><img src={event} alt="Events" /></span>
                            <p>Vazifalar</p>
                        </Link>
                        <Link to={`/${user_id}/rating`} className="app_bar_content_item">
                            <span><img src={liga} alt="Rating" /></span>
                            <p>Reyting</p>
                        </Link>
                    </>

            </div>
        </div>
    );
};

export default AppBar;
