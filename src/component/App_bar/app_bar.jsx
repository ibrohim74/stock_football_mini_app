import React from 'react';
import { Link, useParams } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icons/soccer_ball.png";
import liga from "../../assets/icon/kobek.webp";
import users from "../../assets/icon/omixta.webp";
import event from "../../assets/icon/clandar.webp";
import { useTranslation } from "react-i18next";

const AppBar = ({ boshSahifaRef, friendsRef, eventsRef, peredachaRef, ratingRef }) => {
    const { user_id } = useParams(); // Get userId from the URL
    const { t } = useTranslation();

    return (
        <div className="app_bar">
            <div className="app_bar_content">
                <Link to={`/${user_id}`} className="app_bar_content_item" ref={boshSahifaRef}>
                    <img src={ball} alt="Home" loading="lazy" />
                    <p>{t("app_bar.bosh_sahifa")}</p>
                </Link>

                <Link to={`/${user_id}/Events_Page`} className="app_bar_content_item" ref={eventsRef}>
                    <img src={event} alt="Events" loading="lazy" />
                    <p>{t("app_bar.vazifalar")}</p>
                </Link>

                <div className="app_bar_live">
                    <Link to={`/${user_id}/peredacha`} className="app_live_button" ref={peredachaRef}>
                        {t("app_bar.live")}
                    </Link>
                </div>

                <Link to={`/${user_id}/friends`} className="app_bar_content_item" ref={friendsRef}>
                    <img src={users} alt="Friends" loading="lazy" />
                    <p>{t("app_bar.dostlar")}</p>
                </Link>

                <Link to={`/${user_id}/rating`} className="app_bar_content_item" ref={ratingRef}>
                    <img src={liga} alt="Rating" loading="lazy" />
                    <p>{t("app_bar.reyting")}</p>
                </Link>
            </div>
        </div>
    );
};

export default AppBar;
