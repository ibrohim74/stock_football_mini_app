import React, { useEffect } from 'react';
import LeagueScroll from './component/league_scroll.jsx';
import {useNavigate, useParams} from "react-router-dom";

const League = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
            window.Telegram.WebApp.onEvent("backButtonClicked" , ()=>{
                navigate(`/${user_id}`)
            })
    }, [user_id]);

    return (
        <>
            <LeagueScroll />
        </>
    );
};

export default League;
