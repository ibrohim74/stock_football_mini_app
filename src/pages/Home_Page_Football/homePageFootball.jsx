import React, { useEffect, useState } from 'react';
import ball from "../../assets/icons/icons8-football-50.svg";
import { Collapse_Stock } from "../../component/collapse/collapse_stock.jsx";
import axios from 'axios';
import {
    uzbekistan_league,
    england_league,
    france_league,
    germany_league,
    italy_league,
    spain_league,
    portugal_league, russian_league
} from "../League_Page/component/leagueList.jsx";
import BackTab from "../../component/backTab/BackTab.jsx";
import "./footballHomePage.css"
import {useParams} from "react-router-dom";

const HomePageFootball = () => {
    const [liveGames, setLiveGames] = useState([]);
    const [loading, setLoading] = useState(true); // Loading holatini qo'shish
    const {user_id} = useParams();

    // Barcha ligalarni bir joyda to'plab olish
    const allLeagues = [
        ...uzbekistan_league,
        ...england_league,
        ...france_league,
        ...germany_league,
        ...italy_league,
        ...spain_league,
        ...portugal_league,
        ...russian_league
    ];

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
            setLoading(true); // Ma'lumotlarni olishdan oldin loading holatini `true` ga o'zgartirish
            const response = await axios.request(options);
            const liveGamesData = response.data.response;

            // Faqat bizning ligalarimizni tekshirish
            const filteredLiveGames = liveGamesData.filter(game =>
                allLeagues.some(league => league.id === game.league.id)
            );

            setLiveGames(filteredLiveGames); // Filtrlangan jonli o'yinlarni set qilamiz
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Ma'lumotlar yuklanganidan so'ng loading holatini `false` ga o'zgartirish
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

    // Mapping over the filtered liveGames to create items for Collapse_stock_leg
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
        <>
            <h1 className={"footballTitle"}>
                <BackTab back_url={`/${user_id}`} />
                <span>
                   LIVE

             <div className="livenow">
                 <div></div>
                 <div></div>
                 <div></div>
             </div>
            </span>
            </h1>

            <div className={"footballContent"}>
                {loading ? <p>Loading...</p> : (liveGames.length > 0 ? <Collapse_Stock items={items} /> : "Hozirda mavjud o'yinlar yo'q")}
            </div>
        </>
    );
};

export default HomePageFootball;
