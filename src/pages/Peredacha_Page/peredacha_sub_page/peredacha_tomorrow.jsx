import React, { useEffect, useState } from 'react';
import { Collapse_Stock } from "../../../component/collapse/collapse_stock.jsx";
import ball from "../../../assets/icons/icons8-football-50.svg";
import axios from 'axios';

const PeredachaTomorrow = ({ leagueList }) => {
    const [tomorrowGames, setTomorrowGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { date: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
        headers: {
            'x-rapidapi-key': '666fb3a3f0mshd6f49ac99388165p10de96jsn4e667b43a669',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.request(options);
            const filteredGames = response.data.response.filter(game =>
                leagueList.includes(game.league.id)
            );
            setTomorrowGames(filteredGames);
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
        }, 900000);
        return () => clearInterval(intervalId);
    }, []);

    const retryImage = (event) => {
        setTimeout(() => {
            event.target.src = event.target.src; // Retry loading the image
        }, 2000);
    };

    const items = tomorrowGames.map((game, index) => ({
        key: index.toString(),
        label: (
            <div className="table-row" key={index}>
                <div className="team1">
                    <h1>{game.teams.home.name}</h1>
                    <img
                        loading={"lazy"}
                        src={game.teams.home.logo || ball}
                        alt={game.teams.home.name}
                        onError={retryImage}
                    />
                </div>
                <p><span>Soat</span> {new Intl.DateTimeFormat('en-US', {
                    timeZone: 'Asia/Tashkent',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }).format(new Date(game.fixture.date))}</p>
                <div className="team2">
                    <img
                        loading={"lazy"}
                        src={game.teams.away.logo || ball}
                        alt={game.teams.away.name}
                        onError={retryImage}
                    />
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
        <div className={'peredacha_list_items'}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                tomorrowGames.length > 0 ? (
                    <Collapse_Stock items={items} />
                ) : (
                    <p>Erta kunda mavjud o'yinlar yo'q</p>
                )
            )}
        </div>
    );
};

export default PeredachaTomorrow;
