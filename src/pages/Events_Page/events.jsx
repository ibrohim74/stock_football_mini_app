import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import "./events.css"
import gift from "../../assets/imgs/perspective_matte-87-128x128.png";
import ball from "../../assets/icons/soccer_ball.png";

import ready from "../../assets/imgs/perspective_matte-95-128x128.png"
import ongoing from "../../assets/imgs/reload.png"
import active from "../../assets/imgs/perspective_matte-136-128x128.png"
import AppBar from "../../component/App_bar/app_bar.jsx";

const Events = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventsData, setEventsData] = useState([{
        id: 1,
        event: "event task obuna boling1 sad asdas dsa d sadasdasd ",
        event_bonus: "+5M",
        event_link: "https://test.uz",
        status: "active"
    }, {
        id: 2, event: "event task obuna boling2", event_bonus: "+5M", event_link: "https://test.uz", status: "ongoing"
    }, {id: 3, event: "event task obuna boling3", event_bonus: "+5M", event_link: "https://test.uz", status: "ready"}, {
        id: 4,
        event: "stock football ga obuna boling4",
        event_bonus: "+5M",
        event_link: "https://test.uz",
        status: "ready"
    }, // Qolgan eventlar...
    ]);

    const showModal = (item) => {
        // "ready" statusida modal ochilmasin
        if (item.status !== "ready") {
            setSelectedEvent(item);
            setIsModalVisible(true);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const startTask = () => {
        // Statusni "ongoing" ga o'zgartirish
        setEventsData(eventsData.map(event => event.id === selectedEvent.id ? {...event, status: "ongoing"} : event));
        setIsModalVisible(false);
    };

    const cancelTask = () => {
        // Statusni "active" ga qaytarish (bekor qilish)
        setEventsData(eventsData.map(event => event.id === selectedEvent.id ? {...event, status: "active"} : event));
        setIsModalVisible(false);
    };

    return (<div className="events">

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
                    <div className="events_item">
                        <img src={gift} alt="logo" className="events_item_logo"/>
                        <div className="events_item_text">
                            <p>asdsad</p>
                            <span>
                                <img src={ball} alt="ball"/>
                                <p>5k</p>
                            </span>
                        </div>
                        <span className="events_item_status">
                                            <img src={active} alt=""/>

                                        </span>
                    </div>
                    <div className="events_box_content_title">
                        <h1>Vazifalar ro'yxati</h1>
                    </div>
                    {eventsData.map((item, i) => {
                        return (<div className="events_item" key={i} onClick={() => showModal(item)}>
                            <img src={gift} alt="logo" className="events_item_logo"/>
                            <div className="events_item_text">
                                <p>{item.event}</p>
                                <span>
                                                <img src={ball} alt="ball"/>
                                                <p>{item.event_bonus}</p>
                                            </span>
                            </div>
                            <span className="events_item_status">
                                            {item.status === "active" && <img src={active} alt=""/>}
                                {item.status === "ready" && <img src={ready} alt=""/>}
                                {item.status === "ongoing" && <img src={ongoing} alt=""/>}
                                        </span>
                        </div>)
                    })}
                </div>
            </div>
        </div>

        {/* Modal for task details */}
        <Modal title="Vazifa tafsilotlari" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            {selectedEvent && (<>
                <p><strong>Vazifa:</strong> {selectedEvent.event}</p>
                <p><strong>Bonus:</strong> {selectedEvent.event_bonus}</p>
                <p><strong>Status:</strong> {selectedEvent.status}</p>

                {/* Tugmalarni statusga qarab ko'rsatamiz */}
                {selectedEvent.status === "active" && (<Button type="primary" onClick={startTask}>
                    Vazifani boshlash
                </Button>)}
                {selectedEvent.status === "ongoing" && (<Button type="primary" onClick={cancelTask}>
                    Vazifani bekor qilish
                </Button>)}
            </>)}
        </Modal>
    </div>);
};

export default Events;
