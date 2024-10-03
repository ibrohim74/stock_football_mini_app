import React, { useState, useEffect } from 'react';
import './events.css';
import gift from '../../assets/icon/freepik-export-20240923164119B0Nu.webp';
import ball from '../../assets/icons/soccer_ball.png';
import active from '../../assets/icon/spark.webp';
import reload from '../../assets/icon/restart.webp';
import success from '../../assets/icon/success.webp';
import { Link, useParams } from 'react-router-dom';
import Collapse_events from '../../component/collapse_events/collapse_events.jsx';
import { message } from "antd";
import { useTranslation } from "react-i18next";

const Events = () => {
    const { user_id, language } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();
    const [quizAvailable, setQuizAvailable] = useState(false);

    const initialEventsData = [
        { id: 1, event: 'YouTube’dagi Stock football sahifamizga obuna bo‘ling', event_bonus: '+5M', event_link: 'https://www.youtube.com/@stockfootballuz', status: 'active', timer: 15 },
        { id: 2, event: 'Instagram’dagi Stock football sahifamizga obuna bo‘ling', event_bonus: '+5M', event_link: 'https://www.instagram.com/stockfootball_uz/', status: 'active', timer: 15 },
        { id: 3, event: 'Telegram’dagi Stock football sahifamizga obuna bo‘ling', event_bonus: '+5M', event_link: 'https://t.me/+dU0VUUqbfWI0ZWIy', status: 'active', timer: 15 },
    ];

    const [eventsData, setEventsData] = useState(initialEventsData);

    // Load timer data from localStorage
    useEffect(() => {
        const savedTimers = JSON.parse(localStorage.getItem(`event_timers_${user_id}`)) || {};
        const updatedEvents = eventsData.map(event => {
            if (savedTimers[event.id]) {
                return { ...event, timer: savedTimers[event.id], status: savedTimers[event.id] > 0 ? 'ongoing' : 'completed' };
            }
            return event;
        });
        setEventsData(updatedEvents);
    }, [user_id]);

    // Check if quiz is available
    useEffect(() => {
        const lastPlayedTime = localStorage.getItem(`quiz_last_played_${user_id}`);
        const now = new Date().getTime(); // Hozirgi vaqtni olish
        const quizCooldown = 24 * 60 * 60 * 1000; // 24 soatlik vaqt

        // Agar quiz last played vaqt mavjud bo'lsa, va vaqt o'tgan bo'lsa, quizAvailable false bo'ladi
        if (lastPlayedTime) {
            const timePassed = now - lastPlayedTime;
            setQuizAvailable(timePassed >= quizCooldown); // 24 soat o'tganligini tekshirish
        } else {
            setQuizAvailable(true); // Agar vaqt bo'lmasa, quizAvailable true
        }
    }, [user_id]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    };

    // Timer effect
    useEffect(() => {
        const intervals = eventsData.map((event, index) => {
            if (event.status === 'ongoing' && event.timer > 0) {
                return setInterval(() => {
                    setEventsData(prevEvents => {
                        const newEvents = [...prevEvents];
                        newEvents[index].timer -= 1;

                        // Check if the timer has reached zero
                        if (newEvents[index].timer === 0) {
                            newEvents[index].status = 'completed';
                        }

                        // Save timer in localStorage
                        const savedTimers = JSON.parse(localStorage.getItem(`event_timers_${user_id}`)) || {};
                        savedTimers[event.id] = newEvents[index].timer;
                        localStorage.setItem(`event_timers_${user_id}`, JSON.stringify(savedTimers));
                        return newEvents;
                    });
                }, 1000);
            }
            return null;
        });

        return () => {
            intervals.forEach(interval => {
                if (interval) clearInterval(interval);
            });
        };
    }, [eventsData, user_id]);

    const handleButtonClick = (id) => {
        setEventsData(prevEvents =>
            prevEvents.map(event =>
                event.id === id ? { ...event, status: 'ongoing' } : event
            )
        );
        const selectedEvent = eventsData.find(event => event.id === id);
        if (selectedEvent) {
            window.open(selectedEvent.event_link, '_blank');
        }
    };

    const CollapseItem = eventsData.map(item => ({
        key: item.id.toString(),
        label: (
            <div className="events_item" key={item.id}>
                <img src={gift} loading="lazy" alt="logo" className="events_item_logo" />
                <div className="events_item_text">
                    <p>{item.event}</p>
                    <span>
                        <img loading="lazy" src={ball} alt="ball" />
                        <p>{item.event_bonus}</p>
                    </span>
                </div>
                <span className="events_item_status">
                     {item.status === 'active' && (
                         <img loading="lazy" src={active} alt="active"/>
                     )}
                    {item.status === 'ongoing' && (
                        <img loading="lazy" src={reload} alt="active"/>
                    )}
                    {item.status === 'completed' && (
                        <img loading="lazy" src={success} alt="active"/>
                    )}
                </span>
            </div>
        ),
        children: (
            <div className="event_collapse_box">
                <div className="img_event_collapse">
                    <img src={gift} alt="gift" />
                </div>
                <div className="text_event_collapse">
                    <h1>{item.event}</h1>
                    <span>
                        <img loading="lazy" src={ball} alt="ball" />
                        <p>{item.event_bonus}</p>
                    </span>
                    {item.status === 'active' && (
                        <button onClick={() => handleButtonClick(item.id)}>Bajarish</button>
                    )}
                    {item.status === 'ongoing' && (
                        <div className="timer">
                            <p>{formatTime(item.timer * 1000)}</p>
                        </div>
                    )}
                    {item.status === 'completed' && (
                        <p>{t("events.completed")}</p> // Message for completed task
                    )}
                </div>
            </div>
        )
    }));

    return (
        <div className="events">
            {contextHolder}
            <div className="content_events">
                <div className="events_box">
                    <div className="events_title">
                        <h1>{t("events.title")}</h1>
                        <p>{t("events.sub_title")}</p>
                    </div>
                    <div className="events_box_content">
                        <div className="events_box_content_title">
                            <h1>{t("events.day_event")}</h1>
                        </div>

                        {quizAvailable ? (
                            <Link className="events_item" to={`/${user_id}/${language}/quiz`}>
                                <img src={gift} loading="lazy" alt="logo" className="events_item_logo" />
                                <div className="events_item_text">
                                    <p>{t("events.hero_event")}</p>
                                    <span>
                                        <img loading="lazy" src={ball} alt="ball" />
                                        <p>5k</p>
                                    </span>
                                </div>
                                <span className="events_item_status">
                                    <img loading="lazy" src={active} alt="active" />
                                </span>
                            </Link>
                        ) : (
                            <div className="events_item">
                                <img src={gift} loading="lazy" alt="logo" className="events_item_logo" />
                                <div className="events_item_text">
                                    <p>{t("events.hero_event")}</p>
                                    <span>
                                        <img loading="lazy" src={ball} alt="ball" />
                                        <p>5k</p>
                                    </span>
                                </div>
                                <span className="events_item_status">
                                    <img loading="lazy" src={reload} alt="active" />
                                </span>
                            </div>
                        )}

                        <div className="events_box_content_title">
                            <h1>{t("events.event_list")}</h1>
                        </div>
                        <Collapse_events items={CollapseItem} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
