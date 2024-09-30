import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './peredacha.css';
import PeredachaToday from "./peredacha_sub_page/peredacha_today.jsx";
import PeredachaTomorrow from "./peredacha_sub_page/peredacha_tomorrow.jsx";
import PeredachaYesterday from "./peredacha_sub_page/peredacha_yesterday.jsx";
import {
    england_league, france_league, germany_league, italy_league,
    portugal_league, spain_league, uzbekistan_league
} from "../League_Page/component/leagueList.jsx";
import {useParams} from "react-router-dom";
import BackTab from "../../component/backTab/BackTab.jsx";
import {useTranslation} from "react-i18next";

const Peredacha = () => {
    const [time, setTime] = useState(new Date());
    const [leagues, setLeagues] = useState([]);
    const [activeTab, setActiveTab] = useState('today');
    const {user_id} = useParams();
    const {t} = useTranslation()
    useEffect(() => {
        setLeagues([
            ...uzbekistan_league,
            ...england_league,
            ...spain_league,
            ...portugal_league,
            ...france_league,
            ...germany_league,
            ...italy_league,

        ]);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: 'Asia/Tashkent'
    }).format(time);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'Asia/Tashkent'
    }).format(time);

    // Endi leagueIds string emas, array holatida
    const leagueIds = leagues.map(league => league.id);

    return (
        <div className="peredacha">

            <div className="peredacha_time">
                <BackTab back_url={`/${user_id}`} />
                <div className="peredacha_time_box">
                    <h1>{formattedTime}</h1>
                    <p>{formattedDate}</p>
                </div>

            </div>
            <div className="peredacha_tabs">
                <div
                    className={`peredacha__tab_item ${activeTab === 'yesterday' ? 'active' : ''}`}
                    onClick={() => setActiveTab('yesterday')}
                >
                    {t("peredacha.kechagi")}
                </div>
                <div
                    className={`peredacha__tab_item ${activeTab === 'today' ? 'active' : ''}`}
                    onClick={() => setActiveTab('today')}
                >
                    {t("peredacha.bugungi")}
                </div>
                <div
                    className={`peredacha__tab_item ${activeTab === 'tomorrow' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tomorrow')}
                >
                    {t("peredacha.ertangi")}
                </div>
            </div>

            <div className="peredacha_list">
                {activeTab === 'today' && <PeredachaToday leagueList={leagueIds} />}
                {activeTab === 'tomorrow' && <PeredachaTomorrow leagueList={leagueIds} />}
                {activeTab === 'yesterday' && <PeredachaYesterday leagueList={leagueIds} />}
            </div>
        </div>
    );
};

export default Peredacha;
