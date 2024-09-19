import React, { useEffect, useState } from 'react';
import { Collapse_Stock } from "../../../component/collapse/collapse_stock.jsx";
import ball from "../../../assets/icons/icons8-football-50.svg";
import axios from 'axios';

const PeredashaToday = ({ leagueList }) => {
    const [todayGames, setTodayGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageCache, setImageCache] = useState({});

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { date: new Date().toISOString().split('T')[0] },
        headers: {
            'x-rapidapi-key': '666fb3a3f0mshd6f49ac99388165p10de96jsn4e667b43a669',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const isSameGameData = (newGames, oldGames) => {
        // Ikkala o'yinlar to'plamining idlarini solishtiramiz
        const newGameIds = newGames.map(game => game.fixture.id).sort();
        const oldGameIds = oldGames.map(game => game.fixture.id).sort();
        return JSON.stringify(newGameIds) === JSON.stringify(oldGameIds);
    };

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.request(options);
            console.log(response)
            const filteredGames = Array.isArray(leagueList)
                ? response?.data?.response.filter(game =>
                    leagueList.map(Number).includes(Number(game.league.id))
                )
                : response?.data?.response;

            // Agar o'yinlar o'zgarmagan bo'lsa, yangi ma'lumotlarni yangilamaymiz
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
    }, [leagueList.length]);

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
                    <img src={imageCache[game.teams.home.logo] || ball} alt={game.teams.home.name} />
                </div>
                <p><span>Soat</span> {new Intl.DateTimeFormat('en-US', {
                    timeZone: 'Asia/Tashkent',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }).format(new Date(game.fixture.date))}</p>
                <div className="team2">
                    <img src={imageCache[game.teams.away.logo] || ball} alt={game.teams.away.name} />
                    <h1>{game.teams.away.name}</h1>
                </div>
            </div>
        ),
        children: (
            <div>
                <p>League: {game.league.name}</p>
                <p>Score: {game.goals.home} - {game.goals.away}</p>
                <p>Match Date: {new Date(game.fixture.date).toLocaleDateString()}</p>
            </div>
        ),
    }));

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                todayGames.length > 0 ? (
                    <Collapse_Stock items={items} />
                ) : (
                    <p>Bugun mavjud o'yinlar yo'q</p>
                )
            )}
        </div>
    );
};

export default PeredashaToday;
