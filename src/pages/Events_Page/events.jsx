import React, { useState } from 'react';

import './events.css';
import gift from '../../assets/icon/freepik-export-20240923164119B0Nu.webp';
import ball from '../../assets/icons/soccer_ball.png';
import ready from '../../assets/icon/success.webp';
import ongoing from '../../assets/icon/restart.webp';
import active from '../../assets/icon/spark.webp';
import { Link, useParams } from 'react-router-dom';
import Collapse_events from '../../component/collapse_events/collapse_events.jsx';
import {message} from "antd";

const Events = () => {
    const { user_id } = useParams();
    const [messageApi, contextHolder] = message.useMessage();

    const [eventsData, setEventsData] = useState([
        { id: 1, event: 'event task obuna boling1', event_bonus: '+5M', event_link: 'https://test.uz', status: 'active' },
        { id: 2, event: 'event task obuna boling2', event_bonus: '+5M', event_link: 'https://test.uz', status: 'ongoing' },
        { id: 3, event: 'event task obuna boling3', event_bonus: '+5M', event_link: 'https://test.uz', status: 'ready' },
        { id: 4, event: 'stock football ga obuna boling4', event_bonus: '+5M', event_link: 'https://test.uz', status: 'ready' }
        // Add more events as necessary...
    ]);

    const startTask = (eventId) => {
        setEventsData(eventsData.map(event => event.id === eventId ? { ...event, status: 'ongoing' } : event));
        messageApi.success("vazifani bajarish boshlandi")
    };

    const cancelTask = (eventId) => {
        setEventsData(eventsData.map(event => event.id === eventId ? { ...event, status: 'active' } : event));
        messageApi.error("vazifani bekor qilindi")
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
          {item.status === 'active' && <img src={active} loading="lazy" alt="active" />}
                    {item.status === 'ready' && <img src={ready} loading="lazy" alt="ready" />}
                    {item.status === 'ongoing' && <img src={ongoing} loading="lazy" alt="ongoing" />}
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
                </div>
                {item.status === 'active' && (
                    <button type="primary" onClick={() => startTask(item.id)}>
                        Vazifani boshlash
                    </button>
                )}
                {item.status === 'ongoing' && (
                    <button type="primary" onClick={() => cancelTask(item.id)}>
                        Vazifani bekor qilish
                    </button>
                )}
            </div>
        )
    }));

    return (
        <div className="events">
            {contextHolder}
            <div className="content_events">
                <div className="events_box">
                    <div className="events_title">
                        <h1>Vazifalarni bajaring</h1>
                        <p>va yanada ko'proq Hurmat tangalarini qo'lga kiriting</p>
                    </div>
                    <div className="events_box_content">
                        <div className="events_box_content_title">
                            <h1>Kundalik vazifalar</h1>
                        </div>
                        <Link className="events_item" to={`/${user_id}/quiz`}>
                            <img src={gift} loading="lazy" alt="logo" className="events_item_logo" />
                            <div className="events_item_text">
                                <p>Asosiy vazifa</p>
                                <span>
                  <img loading="lazy" src={ball} alt="ball" />
                  <p>5k</p>
                </span>
                            </div>
                            <span className="events_item_status">
                <img loading="lazy" src={active} alt="active" />
              </span>
                        </Link>
                        <div className="events_box_content_title">
                            <h1>Vazifalar ro'yxati</h1>
                        </div>
                        <Collapse_events items={CollapseItem} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
