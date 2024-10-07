import React, {useEffect, useRef, useState} from 'react';
import ball from "../../assets/icons/icons8-football-50.svg";
import {Collapse_Stock} from "../../component/collapse/collapse_stock.jsx";
import axios from 'axios';
import {
    uzbekistan_league,
    england_league,
    france_league,
    germany_league,
    italy_league,
    spain_league,
    portugal_league
} from "../League_Page/component/leagueList.jsx";

import "./footballHomePage.css"
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import BackTab from "../../component/backTab/BackTab.jsx";
import {Tour} from "antd";

const HomePageFootball = () => {
    const [liveGames, setLiveGames] = useState([]);
    const [loading, setLoading] = useState(true); // Loading holatini qo'shish
    const [openTour, setOpenTour] = useState(false);
    const {user_id, language} = useParams();
    const {t} = useTranslation()
    // Barcha ligalarni bir joyda to'plab olish
    const allLeagues = [
        ...uzbekistan_league,
        ...england_league,
        ...france_league,
        ...germany_league,
        ...italy_league,
        ...spain_league,
        ...portugal_league,

    ];

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {live: 'all'},
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
            console.log(filteredLiveGames)
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
    useEffect(() => {
        const isTourShown = localStorage.getItem('tourShownLive');
        const tourShownFootball = localStorage.getItem('tourShownFootball');

        if (tourShownFootball && !isTourShown ) {
            setOpenTour( true);
            localStorage.setItem('tourShownLive', 'true');
        }
    }, []);


    const items = liveGames.map((game, index) => {
        const goals = game.events?.filter(event => event.type === 'Goal') || [];
        return {
            key: index.toString(),
            label: (
                <div className="table-row">
                    <div className="team1">
                        <h1>{game.teams.home.name}</h1>
                        <img loading={"lazy"} src={game.teams.home.logo || ball} alt={game.teams.home.name}/>
                    </div>
                    <p>
                        {formatToTashkentTime(game.fixture.date) === formatToTashkentTime(game.fixture.date) ?
                            <>{game.goals.home} - {game.goals.away}</>
                            : <><span>Soat</span> {formatToTashkentTime(game.fixture.date)}</>
                        }</p>
                    <div className="team2">
                        <img loading={"lazy"} src={game?.teams?.away?.logo ? game?.teams?.away?.logo : ball}
                             alt={game.teams.away.name}/>
                        <h1>{game.teams.away.name}</h1>
                    </div>
                </div>
            ),
            children: (
                <div>
                    <p>League: {game.league.name}</p>
                    <p>Score: {game.goals.home} - {game.goals.away}</p>
                    <p>Match
                        Date: {new Date(game.fixture.date).toLocaleDateString()} {formatToTashkentTime(game.fixture.date)}</p>
                    <p><strong>Goals:</strong></p>
                    <ul>
                        {goals.length > 0 ? (
                            goals.map((goal, idx) => (
                                <li key={idx}>
                                    {goal.player.name} ({goal.team.name}) - {goal.time.elapsed}'
                                </li>
                            ))
                        ) : (
                            <li>Hozircha gollar yo'q</li>
                        )}
                    </ul>
                </div>
            ),
        };
    });

    const liveRef = useRef(null);
    const liveButtonRef = useRef(null);
    const stepsTour = [
        {
            title: t("tour_fotballLive.live_button.title"),
            description: t("tour_fotballLive.live_button.description"),
            target: () => liveButtonRef.current,
        },
        {
            title: t("tour_fotballLive.live.title"),
            description: t("tour_fotballLive.live.description"),
            target: () => liveRef.current,
        },
    ]
    return (
        <div className={"homePageFootball"}>
            <h1 className={"footballTitle"}>
                <BackTab back_url={`/${user_id}/${language}`} />

                <div className={"jonliEfir"} ref={liveButtonRef}>Jonli Efir <div className="livenow">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                </div>
            </h1>

            <div className={"footballContent"} ref={liveRef}>
                {loading ? <p style={{textAlign: 'center'}}>{t("loading")}</p> : (liveGames.length > 0 ?
                    <Collapse_Stock items={items}/> : <p style={{textAlign: 'center'}}>{t("no_data")}</p>)}
            </div>
            <Tour
                open={openTour}
                steps={stepsTour}
                closeIcon={false}
                onClose={() => setOpenTour(false)}
            />
        </div>
    );
};

export default HomePageFootball;
