import React, { useEffect } from 'react';
import LeagueScroll from './component/league_scroll.jsx';
import { useNavigate, useParams } from "react-router-dom";

const League = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const backButton = window.Telegram.WebApp.BackButton;
        backButton.show();

        // Correcting the event listener assignment
        backButton.onClick = () => {
            navigate(`/${user_id}`);
        };

        // Cleanup: hide the back button on component unmount
        return () => {
            backButton.hide();
        };
    }, [navigate, user_id]);

    return (
        <>
            <LeagueScroll />
            {/* Optional: BackTab component */}
        </>
    );
};

export default League;
