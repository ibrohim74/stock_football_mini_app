import React from 'react';
import { Link, useParams } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icons/soccer_ball.png";
import liga from "../../assets/icon/kobek.webp";
import users from "../../assets/icon/omixta.webp";
import event from "../../assets/icon/clandar.webp";
import { HOME_PAGE_FOOTBALL, FRIENDS, RATING, SETTINGS, EVENTS, PEREDACHA, LEAGUE } from "../../utils/const.jsx";

const AppBar = ({boshSahifaRef , friendsRef , eventsRef , peredachaRef , ratingRef}) => {
    const { user_id } = useParams(); // Get userId from the URL


    return (
        <div className="app_bar">
            <div className="app_bar_content">
                <Link to={`/${user_id}`} className="app_bar_content_item" ref={boshSahifaRef}>
                    <span><img src={ball} alt="Home" loading={"lazy"}
                            style={{
                                width:"40px",
                                height:"40px",
                                marginTop:"8px"
                            }}
                    /></span>
                    <p>Bosh sahifa</p>
                </Link>
                <Link to={`/${user_id}/friends`} className="app_bar_content_item" ref={friendsRef}>
                    <span><img src={users} alt="Friends" loading={"lazy"}/></span>
                    <p>Do'stlar</p>
                </Link>
                <Link to={`/${user_id}/peredacha`} className="app_bar_content_item app_live_button" ref={peredachaRef}>
                    <span>live</span>
                </Link>
                <Link to={`/${user_id}/Events_Page`} className="app_bar_content_item" ref={eventsRef}>
                    <span><img src={event} alt="Events" loading={"lazy"}/></span>
                    <p>Vazifalar</p>
                </Link>
                <Link to={`/${user_id}/rating`} className="app_bar_content_item" ref={ratingRef}>
                    <span><img src={liga} alt="Rating" loading={"lazy"}/></span>
                    <p>Reyting</p>
                </Link>


            </div>
        </div>
    );
};

export default AppBar;
