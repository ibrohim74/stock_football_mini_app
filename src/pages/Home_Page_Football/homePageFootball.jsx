import React, { useEffect, useState } from 'react';
import ball from "../../assets/icons/icons8-football-50.svg";
import { Collapse_Stock } from "../../component/collapse/collapse_stock.jsx";
import axios from 'axios';

const HomePageFootball = () => {
    const [liveGames, setLiveGames] = useState([]);

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { live: 'all' },
        headers: {
            'x-rapidapi-key': '666fb3a3f0mshd6f49ac99388165p10de96jsn4e667b43a669',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const getData = async () => {
        try {
            const response = await axios.request(options);
            setLiveGames(response.data.response); // Set the live games from the API response
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();

        // 5 daqiqada bir marta malumotni yangilash uchun interval o'rnatamiz
        const intervalId = setInterval(() => {
            getData();
        }, 300000); // 300000 millisekund = 5 daqiqa

        // Komponent demontaj bo'lganda intervalni tozalaymiz
        return () => clearInterval(intervalId);
    }, []);

    // Function to format date to Tashkent time
    const formatToTashkentTime = (dateString) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Tashkent',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date(dateString));
    };

    // Mapping over the liveGames to create items for Collapse_Stock
    const items = liveGames.map((game, index) => ({
        key: index.toString(),
        label: (
            <div className="table-row">
                <div className="team1">
                    <h1>{game.teams.home.name}</h1>
                    <img src={game.teams.home.logo || ball} alt={game.teams.home.name} />
                </div>
                <p><span>Soat</span> {formatToTashkentTime(game.fixture.date)}</p>
                <div className="team2">
                    <img src={game?.teams?.away?.logo ? game?.teams?.away?.logo : ball} alt={game.teams.away.name} />
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
        <div style={{margin:"15px 0 100px 0" , display:'flex' , justifyContent:"center" , alignItems:"center"}}>
            <Collapse_Stock items={items} />
        </div>
    );
};

export default HomePageFootball;
