import React, { useEffect, useState } from 'react';
import { Collapse_Stock } from "../../../component/collapse/collapse_stock.jsx";
import ball from "../../../assets/icons/icons8-football-50.svg";
import axios from 'axios';

const PeredachaYesterday = ({ leagueList }) => {
    const [yesterdayGames, setYesterdayGames] = useState([]);

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
        headers: {
            'x-rapidapi-key': '666fb3a3f0mshd6f49ac99388165p10de96jsn4e667b43a669',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };


    const getData = async () => {
        try {
            const response = await axios.request(options);
            const filteredGames = response.data.response.filter(game =>
                leagueList.includes(game.league.id)
            );
            setYesterdayGames(filteredGames);
            console.log(response)
            console.log(filteredGames)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();

        const intervalId = setInterval(() => {
            getData();
        }, 900000);

        return () => clearInterval(intervalId);
    }, [leagueList]);

    const items = yesterdayGames.map((game, index) => ({
        key: index.toString(),
        label: (
            <div className="table-row" key={index}>
                <div className="team1">
                    <h1>{game.teams.home.name}</h1>
                    <img src={game.teams.home.logo || ball} alt={game.teams.home.name} />
                </div>
                <p><span>Score</span>
                    {game.goals.home} - {game.goals.away}
                </p>
                <div className="team2">
                    <img src={game.teams.away.logo || ball} alt={game.teams.away.name} />
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
            <Collapse_Stock items={items} />
        </div>
    );
};

export default PeredachaYesterday;
