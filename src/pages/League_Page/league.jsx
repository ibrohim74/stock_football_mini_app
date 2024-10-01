import React, { useEffect } from 'react';
import LeagueScroll from './component/league_scroll.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const League = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // BackButton ni ko'rsatish
        window.Telegram.WebApp.BackButton.show();

        // "backButtonClicked" hodisasiga qo'shish
        window.Telegram.WebApp.onEvent("backButtonClicked", () => {
            navigate(`/${user_id}`);
        });

        // Komponent unmount bo'lganida voqeani tozalash
        return () => {
            window.Telegram.WebApp.offEvent("backButtonClicked");
        };
    }, [navigate, user_id]);

    return (
        <>
            <LeagueScroll />
        </>
    );
};

export default League;
