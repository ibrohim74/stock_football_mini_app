import React from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icon/ball_app_bar.png";
import liga from "../../assets/icon/kobek.webp";
import users from "../../assets/icon/omixta.webp";
import event from "../../assets/icon/clandar.webp";
import gift from "../../assets/icon/freepik-export-20240923164119B0Nu.webp";
import { useTranslation } from "react-i18next";

const AppBar = ({ boshSahifaRef, friendsRef, eventsRef, peredachaRef, giftRef }) => {
    const { user_id,language } = useParams(); // Get userId from the URL
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <div className="app_bar">
            <div className="app_bar_content">
                <Link to={`/${user_id}/${language}`} className={`app_bar_content_item ${location.pathname === `/${user_id}/${language}` ? 'active' : ''}`} ref={boshSahifaRef}>
                    <img src={ball} alt="Home" loading="lazy"/>
                    <p >{t("app_bar.bosh_sahifa")}</p>
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

                <Link to={`/${user_id}/${language}/gift`} className={`app_bar_content_item ${location.pathname === `/${user_id}/${language}/gift` ? 'active' : ''}`} ref={giftRef}>
                    <img src={gift} alt="Rating" loading="lazy" />
                    <p>{t("gift.title")}</p>
                </Link>
            </div>
        </div>
    );
};

export default AppBar;
