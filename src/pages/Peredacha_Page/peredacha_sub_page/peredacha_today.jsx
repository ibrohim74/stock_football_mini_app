import React, { useEffect, useState } from 'react';
import { Collapse_Stock } from "../../../component/collapse/collapse_stock.jsx";
import ball from "../../../assets/icons/icons8-football-50.svg";
import axios from 'axios';

const PeredachaToday = () => {
    const [todayGames, setTodayGames] = useState([]);

    // Bugungi kunni olish uchun parametrlar
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { date: new Date().toISOString().split('T')[0] }, // Bugungi sana
        headers: {
            'x-rapidapi-key': '666fb3a3f0mshd6f49ac99388165p10de96jsn4e667b43a669',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    // Ma'lumotlarni olish funksiyasi
    const getData = async () => {
        try {
            const response = await axios.request(options);
            console.log(response)
            setTodayGames(response.data.response); // Bugungi o‘yinlarni saqlash
        } catch (error) {
            console.error(error);
        }
    };
    // Komponent yuklanganida ma'lumotlarni olish
    useEffect(() => {
getData()
        const intervalId = setInterval(() => {
            getData(); // Har 15 daqiqada chaqiruv
        }, 900000); // 900000 millisekund = 15 daqiqa

        // Komponent unmount bo'lganda intervalni tozalash
        return () => clearInterval(intervalId);
    }, []);

    // Bugungi o‘yinlar uchun Collapse_stock_leg elementlarini yaratish
    const items = todayGames.map((game, index) => ({
        key: index.toString(),
        label: (
            <div className="table-row">
                <div className="team1">
                    <h1>{game.teams.home.name}</h1>
                    <img src={game.teams.home.logo || ball} alt={game.teams.home.name} />
                </div>
                <p><span>Soat</span> {new Intl.DateTimeFormat('en-US', {
                    timeZone: 'Asia/Tashkent',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }).format(new Date(game.fixture.date))}</p>
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

export default PeredachaToday;
