import React, { useState, useEffect } from 'react';
import './peredacha.css';
import PeredachaToday from "./peredacha_sub_page/peredacha_today.jsx";
import PeredachaTomorrow from "./peredacha_sub_page/peredacha_tomorrow.jsx";
import PeredachaYesterday from "./peredacha_sub_page/peredacha_yesterday.jsx";

const Peredacha = () => {
    const [time, setTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState('today'); // 'today' default aktiv tab

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
                {activeTab === 'today' && <PeredachaToday />}
                {activeTab === 'tomorrow' && <PeredachaTomorrow />}
                {activeTab === 'yesterday' && <PeredachaYesterday />}
            </div>
        </div>
    );
};

export default Peredacha;
