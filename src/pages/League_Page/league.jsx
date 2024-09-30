import React, { useEffect } from 'react';
import LeagueScroll from './component/league_scroll.jsx';
import { useParams } from "react-router-dom";

const League = () => {
    const { user_id } = useParams();

    useEffect(() => {
        const backButton = window.Telegram.WebApp.BackButton;
        backButton.show();

        // Corrected the onClick event to use window.location.href
        backButton.onClick = () => {
            window.location.href = `/${user_id}`;
        };

        // Cleanup: hide the back button on component unmount
        return () => {
            backButton.hide();
        };
    }, [user_id]);

    return (
        <>
            <LeagueScroll />
        </>
    );
};

export default League;
