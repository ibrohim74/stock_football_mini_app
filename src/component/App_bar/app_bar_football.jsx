import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import "./app_bar.css";
import ball from "../../assets/icon/ball_app_bar.png";
import peredacha from "../../assets/icon/dilbuzor.webp";
import liga from "../../assets/icon/kobek.webp";
import {useTranslation} from "react-i18next";
import {Tour} from "antd";


const   AppBarFootball = () => {
    const { user_id,language } = useParams();
    const {t} = useTranslation();
    const location = useLocation();
    const [openTour, setOpenTour] = useState(false);

    useEffect(() => {
        const isTourShown = localStorage.getItem('tourShownFootball');

        if (!isTourShown) {
            setOpenTour(true);
            localStorage.setItem('tourShownFootball', 'true');
        }
    }, []);

    const peredachaRef = useRef(null);
    const ligaRef = useRef(null);
    const liveRef = useRef(null);

    const stepsTour = [
        {
            title: t("tour_fotballApp.live.title"),
            description: t("tour_fotballApp.live.description"),
            target: () => liveRef.current,
        },
        {
            title: t("tour_fotballApp.peredacha.title"),
            description: t("tour_fotballApp.peredacha.description"),
            target: () => peredachaRef.current,
        },
        {
            title: t("tour_fotballApp.liga.title"),
            description: t("tour_fotballApp.liga.description"),
            target: () => ligaRef.current,
        },
    ]
    return (
        <div className="app_bar">
            <div className="app_bar_content">
                    <>

                        <Link ref={peredachaRef} to={`/${user_id}/${language}/peredacha`} className={`app_bar_content_item ${location.pathname === `/${user_id}/${language}/peredacha` ? 'active' : ''}`} style={{ marginRight: 0 }}>
                            <span><img src={peredacha} alt="Peredacha" loading={"lazy"}/></span>
                            <p>{t("app_bar_football.peredacha")}</p>
                        </Link>
                        <Link ref={ligaRef} to={`/${user_id}/${language}/league`} className={`app_bar_content_item ${location.pathname === `/${user_id}/${language}/league` ? 'active' : ''}`}>
                            <span><img src={liga} alt="League" loading={"lazy"}/></span>
                            <p>{t("app_bar_football.liga")}</p>
                        </Link>
                        <Link ref={liveRef} to={`/${user_id}/${language}/Football`} className={`app_bar_content_item ${location.pathname === `/${user_id}/${language}/Football` ? 'active' : ''}`}>
                            <span><img src={ball} alt="Football" loading={"lazy"}/></span>
                            <p>{t("app_bar_football.live")}</p>
                        </Link>
                    </>
            </div>
            <Tour
                open={openTour}
                steps={stepsTour}
                closeIcon={false}
                onClose={() => setOpenTour(false)}
            />
        </div>
    );
};

export default AppBarFootball;
