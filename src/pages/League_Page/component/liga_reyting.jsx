import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const LigaReyting = () => {
    const { league_id, user_id, language } = useParams();
    const [standings, setStandings] = useState([]);
    const { t } = useTranslation();
    const [loadingStandings, setLoadingStandings] = useState(false);
    const [loadingImages, setLoadingImages] = useState({});
    const fetchStandings = async () => {
        setLoadingStandings(true); // Set loading to true when fetching starts
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
            headers: {
                'x-rapidapi-key': '666fb3a3f0mshd6f49ac99388165p10de96jsn4e667b43a669', // Replace with your actual RapidAPI key
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            },
            params: {
                league: league_id,
                season: new Date().getFullYear(),
            }
        };

        try {
            const response = await axios.request(options);
            setStandings(response.data.response[0].league.standings[0]); // Faqat yangi o'yinlarni qo'shish
        } catch (error) {
            console.error('Error fetching standings:', error);
        } finally {
            setLoadingStandings(false); // Set loading to false after fetching
        }
    };

    const retryImage = (event) => {
        setTimeout(() => {
            event.target.src = event.target.src; // Retry loading the image
        }, 2000);
    };

    const handleImageLoadStart = (key) => {
        setLoadingImages(prev => ({ ...prev, [key]: true }));
    };

    const handleImageLoadEnd = (key) => {
        setLoadingImages(prev => ({ ...prev, [key]: false }));
    };

    useEffect(() => {
        fetchStandings();
    }, [league_id]);
    console.log(standings)
    return (
        <>
            {loadingStandings ? (
                <p style={{textAlign: 'center'}}>{t("loading")}</p>
            ) : standings.length > 0 ? (
                <div className="standings">
                    <div className="container">
                        <table className={"table_standing"}>
                            <thead>
                            <tr>
                                <th></th>
                                <th style={{textAlign: 'left'}}>{t("liga.jamoa")}</th>
                                <th>{t("liga.oyin")}</th>
                                <th>{t("liga.ochko")}</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GF</th>
                            </tr>
                            </thead>
                            <tbody>
                            {standings.map((team, index) => (
                                <tr key={team.team.id}>
                                    <td style={{textAlign: 'center'}}>{index + 1}</td>
                                    <td style={{textAlign: 'left'}}>
                                        <img
                                            src={team.team.logo}
                                            alt={team.team.name}
                                            width="30"
                                            height="30"
                                            onError={retryImage}
                                            onLoadStart={() => handleImageLoadStart(team.team.id)}
                                            onLoad={() => handleImageLoadEnd(team.team.id)}
                                        />
                                        {team.team.name}
                                    </td>
                                    <td style={{textAlign: 'center'}}>{team.all.played}</td>
                                    <td style={{textAlign: 'center'}}>{team.points}</td>
                                    <td style={{textAlign: 'center'}}> {team.all.win}</td>
                                    <td style={{textAlign: 'center'}}> {team.all.draw}</td>
                                    <td style={{textAlign: 'center'}}> {team.all.lose}</td>
                                    <td style={{textAlign: 'center'}}> {team.all.goals.for}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            ) : (
                <p style={{textAlign: 'center'}}>{t("no_data")}</p>
            )}
        </>
    );
};

export default LigaReyting;