import React from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icons/soccer_ball.png";
import liga from "../../assets/icon/kobek.webp";
import users from "../../assets/icon/omixta.webp";
import event from "../../assets/icon/clandar.webp";
import { useTranslation } from "react-i18next";

const AppBar = ({ boshSahifaRef, friendsRef, eventsRef, peredachaRef, ratingRef }) => {
    const { user_id,language } = useParams(); // Get userId from the URL
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <div className="app_bar">
            <div className="app_bar_content">
                <Link to={`/${user_id}/${language}`} className={`app_bar_content_item ${location.pathname === `/${user_id}/${language}` ? 'active' : ''}`} ref={boshSahifaRef}>
                    <img src={ball} alt="Home" loading="lazy" />
                    <p style={{marginBottom:"-7px"}}>{t("app_bar.bosh_sahifa")}</p>
                </Link>

                <Link to={`/${user_id}/${language}/Events_Page`} className={`app_bar_content_item ${location.pathname === `/${user_id}/${language}/Events_Page` ? 'active' : ''}`} ref={eventsRef}>
                    <img src={event} alt="Events" loading="lazy" />
                    <p>{t("app_bar.vazifalar")}</p>
                </Link>

                <div className="app_bar_live">
                    <Link to={`/${user_id}/${language}/peredacha`} className={`app_live_button ${location.pathname === `/${user_id}/${language}/peredacha` ? 'active' : ''}`} ref={peredachaRef}>
                        {t("app_bar.live")}
                    </Link>
                </div>

                <Link to={`/${user_id}/${language}/friends`} className={`app_bar_content_item ${location.pathname === `/${user_id}/${language}/friends` ? 'active' : ''}`} ref={friendsRef}>
                    <img src={users} alt="Friends" loading="lazy" />
                    <p>{t("app_bar.dostlar")}</p>
                </Link>

                <Link to={`/${user_id}/${language}/rating`} className={`app_bar_content_item ${location.pathname === `/${user_id}/${language}/rating` ? 'active' : ''}`} ref={ratingRef}>
                    <img src={liga} alt="Rating" loading="lazy" />
                    <p>{t("app_bar.reyting")}</p>
                </Link>
            </div>
        </div>
    );
};

export default AppBar;
