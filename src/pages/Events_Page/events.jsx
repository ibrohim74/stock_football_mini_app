import React, {useState, useEffect} from 'react';
import './events.css';
import gift from '../../assets/icon/freepik-export-20240923164119B0Nu.webp';
import ball from '../../assets/icons/soccer_ball.png';
import active from '../../assets/icon/spark.webp';
import reload from '../../assets/icon/restart.webp';
import success from '../../assets/icon/success.webp';
import {Link, useParams} from 'react-router-dom';
import Collapse_events from '../../component/collapse_events/collapse_events.jsx';
import {message} from "antd";
import {useTranslation} from "react-i18next";
import $API from "../../utils/https.jsx";

const Events = () => {
    const {user_id, language} = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const {t} = useTranslation();
    const [quizAvailable, setQuizAvailable] = useState(false);


    const [eventsData, setEventsData] = useState([]);


    const getEvents = async () => {
        try {
            const res = await $API.get(`/events/${user_id}`);
            setEventsData(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    // Load timer data from localStorage
    useEffect(() => {
        getEvents()
        const savedTimers = JSON.parse(localStorage.getItem(`event_timers_${user_id}`)) || {};
        const updatedEvents = eventsData.map(event => {
            if (savedTimers[event.id]) {
                return {
                    ...event,
                    timer: savedTimers[event.id],
                    status: savedTimers[event.id] > 0 ? 'ongoing' : 'completed'
                };
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




    const handleButtonClick = async (item) => {
        try {
            const res = await $API.post(`/events/${user_id}`, null, {
                params: {
                    event_id: item.event_id
                }
            })
            window.open(item.url, '_blank');
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    };

    const CollapseItem = eventsData.map(item => ({
        key: item.event_id,
        label: (
            <div className="events_item" key={item.event_id}>
                <img src={gift} loading="lazy" alt="logo" className="events_item_logo"/>
                <div className="events_item_text">
                    <p>{item.name}</p>
                    <span>
                    <img loading="lazy" src={ball} alt="ball"/>
                    <p>{item.coin}</p>
                </span>
                </div>
                <span className="events_item_status">
                {item.status === false && (
                    <img loading="lazy" src={active} alt="active"/>
                )}
                    {item.status === true && (
                        <img loading="lazy" src={success} alt="success"/>
                    )}
            </span>
            </div>
        ),
        children: (
            <div className="event_collapse_box">
                <div className="img_event_collapse">
                    <img src={gift} alt="gift"/>
                </div>
                <div className="text_event_collapse">
                    <h1>{item.event}</h1>
                    <span>
                    <img loading="lazy" src={ball} alt="ball"/>
                    <p>{item.event_bonus}</p>
                </span>
                    {item.status === false && (
                        <button onClick={() => handleButtonClick(item)}>Bajarish</button>
                    )}
                    {item.status === true && item.timer > 0 && (
                        <div className="timer">
                            <p>{formatTime(item.timer)}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }));
// Timer effect
    useEffect(() => {
        const intervals = eventsData.map((event, index) => {
            if (event.status === false && event.timer > 0) { // faqat status false bo'lsa va timer ishlayotgan bo'lsa
                return setInterval(() => {
                    setEventsData(prevEvents => {
                        const newEvents = prevEvents.map((e, i) => {
                            if (i === index && e.timer > 0) {
                                const updatedTimer = e.timer - 1;

                                // Timerni yangilab borish
                                return {
                                    ...e,
                                    timer: updatedTimer
                                };
                            }
                            return e;
                        });

                        // Save timer in localStorage
                        const savedTimers = newEvents.reduce((acc, curr) => {
                            acc[curr.id] = curr.timer;
                            return acc;
                        }, {});

                        localStorage.setItem(`event_timers_${user_id}`, JSON.stringify(savedTimers));
                        return newEvents;
                    });
                }, 1000);
            }
            return null;
        });

        // Clear intervals on component unmount
        return () => {
            intervals.forEach(interval => {
                if (interval) clearInterval(interval);
            });
        };
    }, [eventsData, user_id]);



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
                                <img src={gift} loading="lazy" alt="logo" className="events_item_logo"/>
                                <div className="events_item_text">
                                    <p>{t("events.hero_event")}</p>
                                    <span>
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
                                    <img loading="lazy" src={reload} alt="active"/>
                                </span>
                            </div>
                        )}

                        <div className="events_box_content_title">
                            <h1>{t("events.event")}</h1>
                        </div>
                        <Collapse_events items={CollapseItem}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
