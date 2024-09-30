import React from 'react';
import LeagueScroll from './component/league_scroll.jsx';
import BackTab from "../../component/backTab/BackTab.jsx";
import {useNavigate, useParams} from "react-router-dom";

const League = () => {
    const {user_id} = useParams();
    const navigate = useNavigate();
    const backButton = window.Telegram.WebApp.BackButton
    backButton.show();
    backButton.onclick(()=>{
        navigate(`/${user_id}`)
    })
    return (
        <>

            <LeagueScroll />
        </>
    );
};

export default League;
