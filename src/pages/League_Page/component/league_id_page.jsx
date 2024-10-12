import React, { useEffect, useState } from 'react';
import BackTab from "../../../component/backTab/BackTab.jsx";
import LigaReyting from "./liga_reyting.jsx";
import LigaCalendar from "./liga_calendar.jsx";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

const LeagueIdPage = () => {
    const [activeTab, setActiveTab] = useState('rating'); // Initialize active tab
    const { t } = useTranslation();
    const { league_id,token,language } = useParams();
    return (
        <div className={"standings_container"}>
            <div className="back_liga">
                <BackTab back_url={`/${token}/${language}/league`} />
                <h1>{t('liga.title')}</h1>
            </div>
            <div className="rating_tabs">
                <div
                    className={`rating_tabs_item ${activeTab === 'rating' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rating')}
                >
                    League Rating
                </div>
                <div
                    className={`rating_tabs_item ${activeTab === 'calendar' ? 'active' : ''}`}
                    onClick={() => setActiveTab('calendar')}
                >
                    League Calendar
                </div>
            </div>

            {activeTab === "rating" && <LigaReyting liga={league_id}/>}
            {activeTab === "calendar" && <LigaCalendar />}
        </div>
    );
};

export default LeagueIdPage;
