import React, { useEffect, useState } from 'react';
import { Collapse_Stock } from "../../../component/collapse/collapse_stock.jsx";
import ball from "../../../assets/icons/icons8-football-50.svg";
import axios from 'axios';
import {useTranslation} from "react-i18next";

const PeredashaToday = ({ activeDate ,leagueList}) => {
    const [todayGames, setTodayGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageCache, setImageCache] = useState({});
    const {t} = useTranslation();
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {
            date: new Date(new Date(activeDate).setHours(24, 0, 0, 0)).toISOString().split('T')[0],
        },

        headers: {
            'x-rapidapi-key': '666fb3a3f0mshd6f49ac99388165p10de96jsn4e667b43a669',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };
    console.log( )
    const isSameGameData = (newGames, oldGames) => {
        // Ikkala o'yinlar to'plamining idlarini solishtiramiz
        const newGameIds = newGames.map(game => game.fixture.id).sort();
        const oldGameIds = oldGames.map(game => game.fixture.id).sort();
        return JSON.stringify(newGameIds) === JSON.stringify(oldGameIds);
    };

    const uzbekistanTeamId = 1568; // Use the correct ID for Uzbekistan national team

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.request(options);
            const filteredGames = Array.isArray(leagueList)
                ? response?.data?.response.filter(game =>
                    leagueList.map(Number).includes(Number(game.league.id)) ||
                    game.teams.home.id === uzbekistanTeamId ||
                    game.teams.away.id === uzbekistanTeamId
                )
                : response?.data?.response.filter(game =>
                    game.teams.home.id === uzbekistanTeamId ||
                    game.teams.away.id === uzbekistanTeamId
                );

            if (!isSameGameData(filteredGames, todayGames)) {
                setTodayGames(filteredGames);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getData();

        const intervalId = setInterval(() => {
            getData();
        }, 900000); // 15 daqiqa
        return () => clearInterval(intervalId);
    }, [activeDate , leagueList.length]);

    const loadImage = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img.src);
            img.onerror = () => {
                setTimeout(() => {
                    img.src = url;
                }, 2000);
                resolve(ball);
            };
            img.src = url;
        });
    };

    useEffect(() => {
        const fetchImages = async () => {
            for (const game of todayGames) {
                if (game.teams.home.logo) {
                    await loadImage(game.teams.home.logo).then(src => {
                        setImageCache(prevCache => ({ ...prevCache, [game.teams.home.logo]: src }));
                    });
                }
                if (game.teams.away.logo) {
                    await loadImage(game.teams.away.logo).then(src => {
                        setImageCache(prevCache => ({ ...prevCache, [game.teams.away.logo]: src }));
                    });
                }
            }
        };

        fetchImages();
    }, [todayGames]);


    const items = todayGames.map((game, index) => ({
        key: index.toString(),
        label: (
            <div className="table-row" key={index}>
                <div className="team1">
                    <h1>{game.teams.home.name}</h1>
                    <img loading={"lazy"} src={imageCache[game.teams.home.logo] || ball} alt={game.teams.home.name} />
                </div>
                <p>
                    {game.fixture.date >= new Date().toISOString() ? <div style={{
                            width:"50px"
                        }}>
                            {new Intl.DateTimeFormat('en-US', {
                                timeZone: 'Asia/Tashkent',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }).format(new Date(game.fixture.date))} <br/>

                        </div> :
                      <div style={{
                          width:"50px"
                      }}>
                          {game.goals.home} - {game.goals.away}
                      </div>
                    }
                   </p>
                <div className="team2">
                    <img loading={"lazy"} src={imageCache[game.teams.away.logo] || ball} alt={game.teams.away.name} />
                    <h1>{game.teams.away.name}</h1>
                </div>
            </div>
        ),
        children: (
            <div>
                <p style={{
                    display:'flex',
                    alignItems:"center"
                }}>{t('peredacha.liga')} : {game.league.name} <img src={game.league.flag} width={25} style={{marginLeft:"10px"}} alt=""/></p>
                <p>{t('peredacha.hisob')} : {game.goals.home} - {game.goals.away}</p>
                <p>{t('peredacha.oyin_vaqti')} : {new Date(game.fixture.date).toLocaleDateString()}</p>
            </div>
        ),
    }));

    return (
        <div className={"peredacha_list_items"}>
            {loading ? (
                <p style={{textAlign: 'center'}}>{t("loading")}</p>
            ) : (
                todayGames.length > 0 ? (
                    <Collapse_Stock items={items} />
                ) : (
                    <p style={{textAlign:'center'}}>{t("no_data")}</p>
                )
            )}
        </div>
    );
};

export default PeredashaToday;
