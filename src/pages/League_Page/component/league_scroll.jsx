import React, {useState, useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination, Navigation} from 'swiper/modules';
import './league_component.css';
import axios from 'axios';
import ball from "../../../assets/icons/icons8-football-50.svg";
import {Collapse_Stock} from "../../../component/collapse/collapse_stock.jsx";
import {Collapse_stock_leg} from "./collapse/collapse_stock_leg.jsx";

const LeagueScroll = () => {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [fixtures, setFixtures] = useState([]);
    const [openKeyItem, setOpenKeyItem] = useState(null);
    useEffect(() => {
        const fetchLeagues = async () => {
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
                headers: {
                    'x-rapidapi-key': '666fb3a3f0mshd6f49ac99388165p10de96jsn4e667b43a669', // Replace with your actual RapidAPI key
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                },
                params: {season: new Date().getFullYear(), current: true, type: "league"}
            };

            try {
                const response = await axios.request(options);
                setLeagues(response.data.response); // Adjust based on the actual API response structure
            } catch (error) {
                console.error('Error fetching leagues:', error);
            }
        };

        fetchLeagues();
    }, []);

    const handleSelect = async (league) => {
        setSelectedLeague(league.league.id);
        await fetchFixtures(league.league.id);
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
            setFixtures(response.data.response); // Adjust this based on the actual API response structure
            console.log(response)
        } catch (error) {
            console.error('Error fetching fixtures:', error);
        }
    };

    const monthNames = [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
        'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
    ];

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

        const start = new Date(startTime * 1000);
        const end = new Date(periods.second * 1000); // Periods sekundlarni millisekundlarga aylantirish

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
            return 'Sanalar noto\'g\'ri';
        }

        const duration = (end - start) / (1000 * 60); // Millisekundlarni minutlarga aylantirish

        // 45 daqiqadan kam o'yinlar uchun aniq vaqtni qaytarish
        if (duration <= 45) {
            return `${Math.round(duration)} minut`;
        }

        // Agar vaqt 90 daqiqadan kam bo'lsa, tugatilganini hisoblash
        if (duration <= 90) {
            return `${Math.round(duration)} minut (tanaffus)`;
        }

        // Agar 90 minutdan ko'p bo'lsa, extra time deb hisoblash
        return `${Math.round(duration)} minut (extra time)`;
    };


    const collapseItem = fixtures.map((game, index) => ({
        key: index,
        label: (
            <div className="table-row">
                <div className="team1">
                    <h1>{game.teams.home.name}</h1>
                    <img src={game.teams.home.logo || ball} alt={game.teams.home.name} />
                </div>
                <p style={game.goals.home !== null && game.goals.away !== null ? { marginTop: "25px" } : {}}>
                <span>
                    {game.goals.home !== null && game.goals.away !== null &&
                        <> {game.goals.home} : {game.goals.away} </>
                    }
                </span>
                   <span style={{fontSize:"12px"}}>{formatDate(game.fixture.date)}</span>
                </p>
                <div className="team2">
                    <img src={game.teams.away.logo || ball} alt={game.teams.away.name} />
                    <h1>{game.teams.away.name}</h1>
                </div>
            </div>
        ),
        children: (
            <div className="league_collapseChildren">
                {game.fixture.status.short === "NS" && <p style={{textAlign:'center', margin:0 , padding:0}}>OYIN boshlanmadi</p>}
                <div className="league_collapseChildren_box">
                    <div className="league_collapseChildren_item">
                        <div className="league_collapseChildren_item_logo">
                            <h1>HOME</h1>
                            <img src={game.teams.home.logo || ball} alt={game.teams.home.name} />
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
                            <img src={game.teams.away.logo || ball} alt={game.teams.away.name} />
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
    console.log(openKeyItem)

    return (
        <div className="swiper_league_scroll">
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                pagination={{clickable: true}}
                navigation
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {leagues.map((league) => (
                    <SwiperSlide
                        key={league.league.id}
                        onClick={() => handleSelect(league)}
                        className={selectedLeague === league.league.id ? 'active' : ''}
                    >
                        <img src={league.league.logo} alt={`${league.league.name} Logo`}/>
                        <p>{league.league.name}</p>
                    </SwiperSlide>
                ))}
            </Swiper>

            {fixtures.length > 0 && (
                <div className="fixtures">
                    <Collapse_stock_leg items={collapseItem} setOpenKeyItem={setOpenKeyItem}/>
                </div>
            )}
        </div>
    );
};

export default LeagueScroll;
