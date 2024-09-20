import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import './league_component.css';
import axios from 'axios';
import ball from "../../../assets/icons/icons8-football-50.svg";
import { Collapse_stock_leg } from "./collapse/collapse_stock_leg.jsx";
import {
    uzbekistan_league,
    england_league,
    spain_league,
    portugal_league,
    france_league,
    germany_league,
    italy_league
} from "./leagueList.jsx";

const monthNames = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
];

const LeagueScroll = () => {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeagues, setSelectedLeagues] = useState([]); // Tanlangan ligalar uchun
    const [fixtures, setFixtures] = useState([]);
    const [openKeyItem, setOpenKeyItem] = useState(null);
    const [loadingFixtures, setLoadingFixtures] = useState(false); // Track loading state for fixtures
    const [loadingImages, setLoadingImages] = useState({}); // Track loading state for images

    useEffect(() => {
        setLeagues([...uzbekistan_league, ...england_league, ...spain_league, ...portugal_league, ...france_league, ...germany_league, ...italy_league]);
    }, []);

    const handleSelect = async (league) => {
        const leagueId = league.id;
        const isSelected = selectedLeagues.includes(leagueId);

        if (isSelected) {
            // Liga o'chirilsa
            const updatedSelectedLeagues = selectedLeagues.filter(id => id !== leagueId);
            setSelectedLeagues(updatedSelectedLeagues);
            // O'chirilgan liga o'yinlarini filtrlab olib tashlash
            setFixtures(prevFixtures => prevFixtures.filter(fixture => fixture.league.id !== leagueId));
        } else {
            // Liga tanlansa
            setSelectedLeagues([...selectedLeagues, leagueId]);
            setLoadingFixtures(true); // Set loading to true
            await fetchFixtures(leagueId); // Ma'lumotlarni darhol olish
        }
    };

    const fetchFixtures = async (leagueId) => {
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
            headers: {
                'x-rapidapi-key': '666fb3a3f0mshd6f49ac99388165p10de96jsn4e667b43a669', // Replace with your actual RapidAPI key
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            },
            params: {
                league: leagueId,
                season: new Date().getFullYear(),
            }
        };

        try {
            const response = await axios.request(options);
            setFixtures(prevFixtures => [...prevFixtures, ...response.data.response]); // Yangi o'yinlarni qo'shish
        } catch (error) {
            console.error('Error fetching fixtures:', error);
        } finally {
            setLoadingFixtures(false); // Set loading to false after fetching
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const formatDuration = (startTime, periods) => {
        if (!startTime || !periods || !periods.second) {
            return 'Ma\'lumot yo\'q';
        }

        const start = new Date(startTime * 1000); // Boshlanish vaqti (sekundda, UTC)
        const end = new Date(periods.second * 1000); // Tugash vaqti (sekundda, UTC)

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
            return 'Sanalar noto\'g\'ri';
        }

        const duration = (end - start) / (1000 * 60); // Millisekundlarni minutlarga aylantirish

        // 45 daqiqadan kam bo'lgan o'yinlar uchun aniq vaqtni qaytarish
        if (duration <= 45) {
            return `${Math.round(duration)} minut`;
        }

        // 90 daqiqagacha bo'lgan o'yinlar uchun tanaffus (half time) qo'shiladi
        if (duration <= 90) {
            return `${Math.round(duration)} minut (tanaffus)`;
        }

        // 90 minutdan ko'p bo'lsa, extra time deb qaytariladi
        return `${Math.round(duration)} minut (extra time)`;
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

    const collapseItem = fixtures.map((game, index) => ({
        key: index,
        label: (
            <div className="table-row">
                <div className="team1">
                    <h1>{game.teams.home.name}</h1>
                    {loadingImages[`${game.teams.home.logo}-${index}`] && <div className="image-loader">Loading...</div>}
                    <img
                        src={game.teams.home.logo || ball}
                        alt={game.teams.home.name}
                        onError={retryImage}
                        onLoad={() => handleImageLoadEnd(`${game.teams.home.logo}-${index}`)}
                        onLoadStart={() => handleImageLoadStart(`${game.teams.home.logo}-${index}`)}
                    />
                </div>
                <p style={game.goals.home !== null && game.goals.away !== null ? { marginTop: "25px" } : {}}>
                    <span>
                        {game.goals.home !== null && game.goals.away !== null &&
                            <> {game.goals.home} : {game.goals.away} </>
                        }
                    </span>
                    <span style={{ fontSize: "12px" }}>{formatDate(game.fixture.date)}</span>
                </p>
                <div className="team2">
                    {loadingImages[`${game.teams.away.logo}-${index}`] && <div className="image-loader">Loading...</div>}
                    <img
                        src={game.teams.away.logo || ball}
                        alt={game.teams.away.name}
                        onError={retryImage}
                        onLoad={() => handleImageLoadEnd(`${game.teams.away.logo}-${index}`)}
                        onLoadStart={() => handleImageLoadStart(`${game.teams.away.logo}-${index}`)}
                    />
                    <h1>{game.teams.away.name}</h1>
                </div>
            </div>
        ),
        children: (
            <div className="league_collapseChildren">
                {game.fixture.status.short === "NS" &&
                    <p style={{ textAlign: 'center', margin: 0, padding: 0 }}>O'yin boshlanmadi</p>}
                <div className="league_collapseChildren_box">
                    <div className="league_collapseChildren_item">
                        <div className="league_collapseChildren_item_logo">
                            <h1>HOME</h1>
                            {loadingImages[`${game.teams.home.logo}-${index}`] && <div className="image-loader">Loading...</div>}
                            <img
                                src={game.teams.home.logo || ball}
                                alt={game.teams.home.name}
                                onError={retryImage}
                                onLoad={() => handleImageLoadEnd(`${game.teams.home.logo}-${index}`)}
                                onLoadStart={() => handleImageLoadStart(`${game.teams.home.logo}-${index}`)}
                            />
                        </div>
                        <div className="league_collapseChildren_item_score">
                            <p>ExtraTime: {game.score.extratime.home !== null ? game.score.extratime.home : "null"}</p>
                            <p>FullTime: {game.score.fulltime.home !== null ? game.score.fulltime.home : "null"}</p>
                            <p>HalfTime: {game.score.halftime.home !== null ? game.score.halftime.home : "null"}</p>
                            <p>Penalty: {game.score.penalty.home !== null ? game.score.penalty.home : "null"}</p>
                        </div>
                    </div>
                    <div className="league_collapseChildren_item">
                        <div className="league_collapseChildren_item_logo">
                            {loadingImages[`${game.teams.away.logo}-${index}`] && <div className="image-loader">Loading...</div>}
                            <img
                                src={game.teams.away.logo || ball}
                                alt={game.teams.away.name}
                                onError={retryImage}
                                onLoad={() => handleImageLoadEnd(`${game.teams.away.logo}-${index}`)}
                                onLoadStart={() => handleImageLoadStart(`${game.teams.away.logo}-${index}`)}
                            />
                            <h1>AWAY</h1>
                        </div>
                        <div className="league_collapseChildren_item_score">
                            <p>ExtraTime: {game.score.extratime.away !== null ? game.score.extratime.away : "null"}</p>
                            <p>FullTime: {game.score.fulltime.away !== null ? game.score.fulltime.away : "null"}</p>
                            <p>HalfTime: {game.score.halftime.away !== null ? game.score.halftime.away : "null"}</p>
                            <p>Penalty: {game.score.penalty.away !== null ? game.score.penalty.away : "null"}</p>
                        </div>
                    </div>
                </div>

                <div className="league_collapseChildren_item_stadion">
                    Shahar: <img src={game.league.flag} alt="" /> {game.league.country}, {game.fixture.venue.city}
                    <br />
                    Stadion: {game.fixture.venue.name}
                    <br />
                    O'yin vaqti: {openKeyItem === index && formatDuration(game.fixture.timestamp, game.fixture.periods)}
                </div>
            </div>
        ),
    }));

    return (
        <div className="swiper_league_scroll">
            <Swiper
                slidesPerView={3.5}
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: true }}
                navigation
                className="mySwiper"
            >
                {leagues.map((league) => (
                    <SwiperSlide
                        key={league.id}
                        onClick={() => handleSelect(league)}
                        className={selectedLeagues.includes(league.id) ? 'active' : ''}
                    >
                        {loadingImages[league.logo] && <div className="image-loader">Loading...</div>}
                        <img
                            src={league.logo}
                            alt={`${league.name} Logo`}
                            onError={retryImage}
                            onLoad={() => handleImageLoadEnd(league.logo)}
                            onLoadStart={() => handleImageLoadStart(league.logo)}
                        />
                        <p>{league.name}</p>
                    </SwiperSlide>
                ))}
            </Swiper>

            {loadingFixtures ? (
                <div className="loading-indicator">Loading...</div>
            ) : fixtures.length > 0 ? (
                <div className="fixtures">
                    <Collapse_stock_leg items={collapseItem} setOpenKeyItem={setOpenKeyItem} />
                </div>
            ) : (
                <p>Ma'lumot yo'q</p>
            )}
        </div>
    );
};

export default LeagueScroll;
