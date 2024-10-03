import React, { useEffect } from 'react';
import LeagueScroll from './component/league_scroll.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import BackTab from "../../component/backTab/BackTab.jsx";

const League = () => {
    const { user_id,language } = useParams();


    return (
        <>
            <LeagueScroll />
        </>
    );
};

export default League;
