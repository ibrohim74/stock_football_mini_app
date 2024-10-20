import React, { useState, useEffect } from 'react';
import './events.css';
import gift from '../../assets/icon/freepik-export-20240923164119B0Nu.webp';
import ball from '../../assets/icons/soccer_ball.png';
import active from '../../assets/icon/spark.webp';
import reload from '../../assets/icon/restart.webp';
import { Link, useParams } from 'react-router-dom';
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { $API } from "../../utils/https.jsx";
import calendar from "../../assets/icon/clandar.webp";
import eventSuccess from "../../assets/icon/success.webp"


const Events = () => {
    const { user_id, language } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();
    const [quizAvailable, setQuizAvailable] = useState(false);
    const [eventsData, setEventsData] = useState([]);
    const [loadingEventId, setLoadingEventId] = useState(null);
    const [remainingTime, setRemainingTime] = useState({});

    const getEvents = async () => {
        try {
            const res = await $API.get(`/events/${user_id}`);
            setEventsData(res.data);
            console.log(res)
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        const lastPlayedTime = localStorage.getItem(`quiz_last_played_${user_id}`);
        const now = new Date().getTime();
        const quizCooldown = 24 * 60 * 60 * 1000; // 24 soat

        if (lastPlayedTime) {
            const lastPlayedDate = new Date(lastPlayedTime).getTime(); // ISO 8601 formatidagi sanani o'zgartirish
            const timePassed = now - lastPlayedDate;
            setQuizAvailable(timePassed >= quizCooldown);
        } else {
            setQuizAvailable(true);
        }
    }, [user_id]);



    useEffect(() => {
        getEvents();
    }, [user_id]);

    useEffect(() => {
        const ongoingTimers = eventsData.reduce((acc, item) => {
            const timerData = localStorage.getItem(`event_timer_${item.event_id}`);
            if (timerData) {
                const { startTime, duration } = JSON.parse(timerData);
                const now = new Date().getTime();
                const timePassed = now - startTime;
                const remainingTime = duration - timePassed;
                if (remainingTime > 0) {
                    acc[item.event_id] = remainingTime;
                }
            }
            return acc;
        }, {});

        setRemainingTime(ongoingTimers);
    }, [eventsData]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevTimes) => {
                const updatedTimes = { ...prevTimes };
                for (const eventId in updatedTimes) {
                    updatedTimes[eventId] -= 1000;
                    if (updatedTimes[eventId] <= 0) {
                        completeEvent(eventId);
                        delete updatedTimes[eventId];
                        localStorage.removeItem(`event_timer_${eventId}`);
                    }
                }
                return updatedTimes;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
            setLoadingEventId(null);
        };
    }, []);

    const handleButtonClick = async (item) => {
        setLoadingEventId(item.event_id);
        window.open(item.url)

        const now = new Date().getTime();
        const timerDuration = 20 * 1000; // 20 soniya
        localStorage.setItem(`event_timer_${item.event_id}`, JSON.stringify({ startTime: now, duration: timerDuration }));

        // Timer uchun qolgan vaqtni yangilash
        setRemainingTime((prev) => ({
            ...prev,
            [item.event_id]: timerDuration,
        }));
    };


    // Vazifani bajarish funksiyasi
    const completeEvent = async (eventId) => {
        try {
            const res = await $API.post(`/events/${user_id}`, null, {
                params: { event_id: eventId }
            });
            getEvents();
            console.log('Event completed:', res);
        } catch (error) {
            console.error('Error completing event:', error);
        }
    };



    // Sonlarni format qilish funksiyasi
    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
        return num.toString();
    };

    return (
        <div className="events">
            {contextHolder}
            <div className="content_events">
                <div className="events_box">
                    <div className="events_title">
                        <img src={calendar} alt="calendar"/>
                        <h1>{t("events.title")}</h1>
                    </div>
                    <div className="events_box_content">
                        <div className="events_box_content_title">
                            <h1>{t("events.day_event")}</h1>

                        </div>

                        {quizAvailable ? (
                            <Link className="events_item" to={`/${user_id}/${language}/quiz`}>
                                <img src={gift} loading="lazy" alt="logo" className="events_item_logo"/>
                                <div className="events_item_text" style={{  marginLeft: 0 }}>
                                    <p>{t("events.hero_event")}</p>
                                    <span style={{marginTop: 0}}>
                                       <p>{t("events.events_daly_text")}</p>
                                    </span>
                                </div>
                                <span className="events_item_status">
                                    <img loading="lazy" src={active} alt="active"/>
                                </span>
                            </Link>
                        ) : (
                            <div className="events_item">
                                <img src={gift} loading="lazy" alt="logo" className="events_item_logo"/>
                                <div className="events_item_text">
                                    <p>{t("events.hero_event")}</p>
                                    <span style={{marginTop: 0}}>
                                       <p>{t("events.events_daly_text")}</p>
                                    </span>
                                </div>
                                <span className="events_item_status">
                                    <img loading="lazy" src={reload} alt="reload"/>
                                </span>
                            </div>
                        )}

                        <div className="events_box_content_title">
                            <h1>{t("events.event")}</h1>
                        </div>

                        <div className="events_events_box">
                            {eventsData.map((item, index) => (
                                <div key={index} className="events_events_item">
                                    <div className="events_events_item_left">
                                        <div className="events_events_item_left_icon">
                                            <img src={item.photo || ball} alt="event"/>
                                        </div>
                                        <div className="events_events_item_left_text">
                                            <h3>{item.name || "Event"}</h3>

                                        </div>
                                        <span>
                                                <img loading="lazy" src={ball} alt="ball"/>
                                                <p>{formatNumber(item.coin) || "5k"}</p>
                                            </span>
                                    </div>
                                    <div className="events_events_item_right">
                                        {item.status ? (
                                            <button disabled style={{
                                                border: "1px #f9f9f9 solid",
                                                display: 'flex',
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}>

                                                {t("events.completed")}
                                                <img src={eventSuccess} style={{
                                                width: "22px",
                                                height: "22px",
                                            }} alt=""/>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleButtonClick(item)}
                                                disabled={loadingEventId === item.event_id}
                                                style={remainingTime[item.event_id] > 0 ? {
                                                    padding: 0,
                                                    border: "none",
                                                    background: "transparent",
                                                    backdropFilter: "none",
                                                    boxShadow:"none"
                                                } : {}}
                                            >
                                                {remainingTime[item.event_id] > 0
                                                    ? <img src={reload} style={{width: "50px", height: "50px"}}/>
                                                    : t("events.active")}
                                            </button>
                                        )}

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
