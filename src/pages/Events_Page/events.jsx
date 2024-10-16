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
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        const lastPlayedTime = localStorage.getItem(`quiz_last_played_${user_id}`);
        const now = new Date().getTime();
        const quizCooldown = 24 * 60 * 60 * 1000;

        if (lastPlayedTime) {
            const timePassed = now - lastPlayedTime;
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
            setLoadingEventId(null); // Reset loadingEventId when component unmounts
        };
    }, []);

    const handleButtonClick = async (item) => {
        setLoadingEventId(item.event_id);
        window.open(item.url, '_blank');

        const now = new Date().getTime();
        const timerDuration = 30 * 1000; // 30 seconds timer
        localStorage.setItem(`event_timer_${item.event_id}`, JSON.stringify({ startTime: now, duration: timerDuration }));

        // Set remaining time for the timer
        setRemainingTime((prev) => ({
            ...prev,
            [item.event_id]: timerDuration,
        }));

        // Send event completion to the server
        await completeEvent(item.event_id); // Call to complete the event on server

        // Set a timeout to complete the event locally after the timer
        setTimeout(() => {
            completeEvent(item.event_id);
            setLoadingEventId(null);
        }, timerDuration);
    };


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
                                <div className="events_item_text" style={{ marginTop: "18px", marginLeft: 0 }}>
                                    <p>{t("events.hero_event")}</p>
                                    <span style={{ marginTop: 0 }}>
                                        <img loading="lazy" src={ball} alt="ball"/>
                                        <p>5k</p>
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
                                    <span>
                                        <img loading="lazy" src={ball} alt="ball"/>
                                        <p>5k</p>
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
                            {eventsData.map(item => (
                                <div key={item.event_id} className="events_events_item">
                                    <div className="events_events_item_left">
                                        <div className="events_events_item_left_icon">
                                            <img src={item.photo || ball} alt="event"/>
                                        </div>
                                        <div className="events_events_item_left_text">
                                            <h3>{item.name || "Event"}</h3>
                                            <span>
                                                <img loading="lazy" src={ball} alt="ball"/>
                                                <p>{item.coin || "5k"}</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="events_events_item_right">
                                        {item.status ? (
                                            <button disabled>{t("events.completed")}</button>
                                        ) : (
                                            <button onClick={() => handleButtonClick(item)} disabled={loadingEventId === item.event_id}>
                                                {loadingEventId === item.event_id ? remainingTime[item.event_id] && (
                                                    <span>{Math.ceil(remainingTime[item.event_id] / 1000)}s</span>
                                                ) : t("events.active")}
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
