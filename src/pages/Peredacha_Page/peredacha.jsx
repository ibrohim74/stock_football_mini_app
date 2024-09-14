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

const Peredacha = () => {
    const [time, setTime] = useState(new Date());
    const [leagues, setLeagues] = useState([]);
    const [activeTab, setActiveTab] = useState('today');

    useEffect(() => {
        setLeagues([
            ...uzbekistan_league,
            ...england_league,
            ...spain_league,
            ...portugal_league,
            ...france_league,
            ...germany_league,
            ...italy_league
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

    const leagueIds = leagues.map(league => league.id).join(',');

    return (
        <div className="peredacha">
            <div className="peredacha_time">
                <h1>{formattedTime}</h1>
                <p>{formattedDate}</p>
            </div>

            <div className="peredacha_tabs">
                <div
                    className={`peredacha__tab_item ${activeTab === 'yesterday' ? 'active' : ''}`}
                    onClick={() => setActiveTab('yesterday')}
                >
                    Kechagi
                </div>
                <div
                    className={`peredacha__tab_item ${activeTab === 'today' ? 'active' : ''}`}
                    onClick={() => setActiveTab('today')}
                >
                    Bugungi
                </div>
                <div
                    className={`peredacha__tab_item ${activeTab === 'tomorrow' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tomorrow')}
                >
                    Ertangi
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
