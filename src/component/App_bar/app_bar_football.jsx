import React from 'react';
import { Link, useParams } from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icons/soccer_ball.png";
import peredacha from "../../assets/icon/dilbuzor.webp";
import liga from "../../assets/icon/kobek.webp";
import {useTranslation} from "react-i18next";


const   AppBarFootball = () => {
    const { user_id } = useParams();
    const {t} = useTranslation();

    return (
        <div className="app_bar">
            <div className="app_bar_content">
                    <>
                        <Link to={`/${user_id}/Football`} className="app_bar_content_item">
                            <span><img src={ball} alt="Football" loading={"lazy"}/></span>
                            <p>{t("app_bar_football.live")}</p>
                        </Link>
                        <Link to={`/${user_id}/peredacha`} className="app_bar_content_item" style={{ marginRight: 0 }}>
                            <span><img src={peredacha} alt="Peredacha" loading={"lazy"}/></span>
                            <p>{t("app_bar_football.peredacha")}</p>
                        </Link>
                        <Link to={`/${user_id}/league`} className="app_bar_content_item">
                            <span><img src={liga} alt="League" loading={"lazy"}/></span>
                            <p>{t("app_bar_football.liga")}</p>
                        </Link>
                    </>

            </div>
        </div>
    );
};

export default AppBarFootball;
