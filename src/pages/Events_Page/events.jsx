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
import $API from "../../utils/https.jsx";

const Events = () => {
    const { user_id, language } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();
    const [quizAvailable, setQuizAvailable] = useState(false);
    const [eventsData, setEventsData] = useState([]);

    // Timer data-ni localStorage-dan yuklash
    useEffect(() => {
        getEvents();
        const savedTimers = JSON.parse(localStorage.getItem(`event_timers_${user_id}`)) || {};
        const updatedEvents = eventsData.map(event => {
            if (savedTimers[event.event_id]) {
                return {
                    ...event,
                    timer: savedTimers[event.event_id],
                    status: savedTimers[event.event_id] > 0 ? 'ongoing' : 'completed'
                };
            }
            return event;
        });
        setEventsData(updatedEvents);
    }, [user_id]);

    // Eventlarni serverdan olish
    const getEvents = async () => {
        try {
            const res = await $API.get(`/events/${user_id}`);
            const updatedData = res.data.map(event => {
                let eventStatus = 'ready';  // Default holat
                if (event.status === true && event.timer > 0) {
                    eventStatus = 'ongoing';
                } else if (event.status === true && event.timer === 0) {
                    eventStatus = 'active';
                }

                return {
                    ...event,
                    status: eventStatus,  // Serverdan kelgan true/false holatini o'zgartiramiz
                    timer: event.timer || 0  // Timer mavjud bo'lsa, o'rnatamiz
                };
            });
            setEventsData(updatedData);
        } catch (e) {
            console.log(e);
        }
    };

    // Quiz mavjudligini tekshirish
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

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    };

    // Event tugmasini bosganda
    const handleButtonClick = async (item) => {
        console.log(item)
        window.open(item.url, '_blank');
        setEventsData((prevEvents) =>
            prevEvents.map((event) => {
                if (event.event_id === item.event_id) {
                    return {
                        ...event,
                        status: 'ongoing', // Statusni yangilash
                        timer: item.timer // Masalan, 1 daqiqa (60,000 ms) timerni o'rnatish
                    };
                }
                return event;
            })
        );

        // Timerni boshlash
        const interval = setInterval(() => {
            setEventsData((prevEvents) =>
                prevEvents.map((event) => {
                    if (event.event_id === item.event_id && event.timer > 0) {

                        const newTimer = event.timer - 1000;

                        // Timer 0 ga yetganda post so'rovini jo'natish
                        if (newTimer <= 0) {
                            clearInterval(interval);
                            postEventCompletion(item.event_id);
                            return {
                                ...event,
                                timer: 0, // Timerni 0 ga o'rnatamiz
                                status: 'active' // Tugallangan statusini yangilash
                            };
                        }

                        return {
                            ...event,
                            timer: newTimer // Timerni yangilash
                        };
                    }
                    return event;
                })
            );
        }, 1000);
    };


    // Event tugallangandan so'ng serverga yuborish
    const postEventCompletion = async (event_id) => {
        try {
            const res = await $API.post(`/events/${user_id}`, null, {
                params: {
                    event_id: parseInt(event_id)
                }
            });
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    const CollapseItem = eventsData.map(item => ({
        key: item.event_id,
        label: (
            <div className="events_item" key={item.event_id}>
                <img src={gift} loading="lazy" alt="logo" className="events_item_logo" />
                <div className="events_item_text">
                    <p>{item.name}</p>
                    <span>
                        <img loading="lazy" src={ball} alt="ball" />
                        <p>{item.coin}</p>
                    </span>
                </div>
                <span className="events_item_status">
                    {/* Serverdan kelgan true/false statusga asoslanib yangi status ko'rsatamiz */}
                    {item.status === 'active' && (
                        <img loading="lazy" src={active} alt="active" />
                    )}
                    {item.status === 'ongoing' && (
                        <img loading="lazy" src={success} alt="ongoing" />
                    )}
                    {item.status === 'ready' && (
                        <img loading="lazy" src={reload} alt="ready" />
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
                    <h1>{item.name}</h1>
                    <span>
                        <img loading="lazy" src={ball} alt="ball" />
                        <p>{item.coin}</p>
                    </span>
                    {/* Agar status 'ready' bo'lsa, bajarish tugmasini ko'rsatamiz */}
                    {item.status === 'ready' && (
                        <button onClick={() => handleButtonClick(item)}>Bajarish</button>
                    )}
                    {/* Timer bor bo'lsa, ko'rsatamiz */}
                    {item.timer > 0 && (
                        <div className="timer">
                            <p>{formatTime(item.timer)}</p>
                        </div>
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
                                <div className="events_item_text" style={{marginTop:"18px" , marginLeft:0}}>
                                    <p>{t("events.hero_event")}</p>
                                    <span style={{marginTop:0}}>
                                        <img loading="lazy" src={ball} alt="ball" />
                                        <p>5k</p>
                                    </span>
                                </div>
                                <span className="events_item_status" >
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
                            <h1>{t("events.event")}</h1>
                        </div>
                        <Collapse_events items={CollapseItem} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
